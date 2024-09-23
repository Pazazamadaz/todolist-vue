<template>
  <div id="todo-list">
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
            <button v-if="!item.isCompleted" @click="toggleComplete(item)">Complete</button>
            <button v-if="item.isCompleted" @click="toggleComplete(item)">Un-complete</button>
            <button @click="deleteTodoItem(item.id)">Delete</button>
          </td>
        </tr>
        </tbody>
      </table>
    </div>

    <!-- Loading modal -->
    <div v-if="loading" class="modal">
      <div class="modal-content">
        <div class="loading-spinner"></div>
        <p>Loading...</p>
      </div>
    </div>

    <!-- Modal for error messages -->
    <div v-if="showModal" class="modal">
      <div class="modal-content">
        <span class="modal-close" @click="showModal = false">&times;</span>
        <h2 class="modal-title">{{ modalTitle }}</h2>
        <p class="modal-message">{{ modalMessage }}</p>
        <button class="modal-btn" @click="showModal = false">OK</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';

const todoItems = ref([]);
const newTodoTitle = ref('');
const showModal = ref(false);
const loading = ref(true);
const modalTitle = ref('');
const modalMessage = ref('');

const fetchTodoItems = async () => {
  loading.value = true;
  try {
    const response = await axios.get('http://localhost:5000/api/TodoItems');
    todoItems.value = response.data;
  } catch (error) {
    console.error('Error fetching todo items:', error);
    modalTitle.value = 'Fetch Error';
    modalMessage.value = 'Failed to load todo items. Please try again later.';
    showModal.value = true;
  } finally {
    loading.value = false;
  }
};

const addTodoItem = async () => {
  if (!newTodoTitle.value.toString().trim()) {
    modalTitle.value = 'Validation Error';
    modalMessage.value = 'Please enter a task title.';
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
    modalTitle.value = 'Add Error';
    modalMessage.value = 'Failed to add the new task. Please try again later.';
    showModal.value = true;
  }
};

const toggleComplete = async (item) => {
  const updatedItem = { ...item, isCompleted: !item.isCompleted };
  try {
    await axios.put(`http://localhost:5000/api/TodoItems/${item.id}`, updatedItem);
    await fetchTodoItems(); // Reload the list
  } catch (error) {
    console.error('Error updating todo item:', error);
    modalTitle.value = 'Update Error';
    modalMessage.value = 'Failed to update the task. Please try again later.';
    showModal.value = true;
  }
};

const deleteTodoItem = async (id) => {
  try {
    await axios.delete(`http://localhost:5000/api/TodoItems/${id}`);
    await fetchTodoItems(); // Reload the list
  } catch (error) {
    console.error('Error deleting todo item:', error);
    modalTitle.value = 'Delete Error';
    modalMessage.value = 'Failed to delete the task. Please try again later.';
    showModal.value = true;
  }
};

onMounted(fetchTodoItems);
</script>
