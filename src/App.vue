<template>
  <div id="app">
    <h1>Todo List</h1>

    <!-- Form for adding a new task -->
    <form @submit.prevent="addTodoItem">
      <input v-model="newTodoTitle" class="custom-input" placeholder="New task" />
      <button type="submit">Add Task</button>
    </form>

    <!-- New div container for centering the table -->
    <div class="table-container">
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Complete</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <!-- Loop through the todo items -->
          <tr v-for="item in todoItems" :key="item.id">
            <td>
              <span :class="{ completed: item.isCompleted }">{{ item.title }}</span>
            </td>
            <td>
              <label class="custom-checkbox">
                <input 
                  type="checkbox" 
                  :checked="item.isCompleted" 
                  @change="toggleComplete(item)"
                />
                <span></span> <!-- Custom square checkbox -->
              </label>
            </td>
            <td>
              <button @click="toggleComplete(item)">Complete</button>
              <button @click="deleteTodoItem(item.id)">Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
	
	<!-- Loading modal -->
    <div v-if="loading" class="modal-overlay">
      <div class="modal-content">
        <div class="loading-spinner"></div>
        <p>Loading...</p>
      </div>
    </div>

    <!-- Modal -->
    <div v-if="showModal" class="modal">
      <div class="modal-content">
        <span class="modal-close" @click="showModal = false">&times;</span>
        <h2 class="modal-title">Validation Error</h2>
        <p class="modal-message">Please enter a task title.</p>
        <button class="modal-btn" @click="showModal = false">OK</button>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import './App.css';

export default {
  setup() {
    const todoItems = ref([]);
    const newTodoTitle = ref('');
    const showModal = ref(false);
    const loading = ref(true); // Loading state

    const fetchTodoItems = async () => {
      loading.value = true; // Show loading modal
      try {
        const response = await axios.get('http://localhost:5000/api/TodoItems');
        todoItems.value = response.data;
      } catch (error) {
        console.error('Error fetching todo items:', error);
      } finally {
        loading.value = false; // Hide loading modal
      }
    };

    const addTodoItem = async () => {
      if (!newTodoTitle.value.toString().trim()) {
        showModal.value = true;
        return;
      }

      try {
        const newTodo = { title: newTodoTitle.value, isCompleted: false };
        await axios.post('http://localhost:5000/api/TodoItems', newTodo);
        newTodoTitle.value = ''; // Clear input
        await fetchTodoItems(); // Reload todo items
      } catch (error) {
        console.error('Error adding todo item:', error);
      }
    };

    const toggleComplete = async (item) => {
      const updatedItem = { ...item, isCompleted: !item.isCompleted };
      try {
        await axios.put(`http://localhost:5000/api/TodoItems/${item.id}`, updatedItem);
        await fetchTodoItems(); // Reload the list
      } catch (error) {
        console.error('Error updating todo item:', error);
      }
    };

    const deleteTodoItem = async (id) => {
      try {
        await axios.delete(`http://localhost:5000/api/TodoItems/${id}`);
        await fetchTodoItems(); // Reload the list
      } catch (error) {
        console.error('Error deleting todo item:', error);
      }
    };

    onMounted(fetchTodoItems);

    return {
      todoItems,
      newTodoTitle,
      addTodoItem,
      toggleComplete,
      deleteTodoItem,
      showModal,
      loading,
    };
  },
};
</script>
