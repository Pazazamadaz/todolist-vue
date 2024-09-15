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

export default {
  setup() {
    const todoItems = ref([]);
    const newTodoTitle = ref('');
    const showModal = ref(false);

    const fetchTodoItems = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/TodoItems');
        todoItems.value = response.data;
      } catch (error) {
        console.error('Error fetching todo items:', error);
      }
    };

    const addTodoItem = async () => {
      if (!newTodoTitle.value.trim()) {
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
    };
  },
};
</script>

<style scoped>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  text-align: center;
  margin-top: 40px;
}

.completed {
  text-decoration: line-through;
}

/* Centering the table */
.table-container {
  width: 600px; /* Set a fixed width for the table container */
  margin: 0 auto; /* Center the table container horizontally */
}

/* Style the table */
table {
  width: 100%; /* Table takes up the full width of its container */
  border-collapse: collapse;
  table-layout: fixed; /* Fix the table layout */
}

th, td {
  border: 1px solid #ddd;
  padding: 10px;
  text-align: center;
  overflow: hidden; /* Hide overflow content */
  word-wrap: break-word; /* Ensure text wraps */
}

th {
  background-color: #f1f1db;
}

/* Fixed column widths */
th:nth-child(1), td:nth-child(1) {
  width: 200px; /* Width for the title column */
}

th:nth-child(2), td:nth-child(2) {
  width: 100px; /* Width for the complete column */
}

th:nth-child(3), td:nth-child(3) {
  width: 300px; /* Width for the actions column */
}

/* Custom checkbox styles */
.custom-checkbox {
  display: flex;
  align-items: center;
  position: relative;
  cursor: pointer;
  user-select: none;
}

.custom-checkbox input {
  opacity: 0; /* Hide the default checkbox */
  position: absolute;
  width: 0;
  height: 0;
}

.custom-checkbox span {
  position: relative;
  width: 24px; /* Size of the custom checkbox */
  height: 24px; /* Size of the custom checkbox */
  background-color: #e0f7fa; /* Background color */
  border: 2px solid #00796b; /* Border color */
  display: inline-block;
  margin-right: 10px;
}

.custom-checkbox input:checked + span {
  background-color: #00796b; /* Checked background color */
}

.custom-checkbox input:checked + span::after {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) scale(1);
  width: 12px;
  height: 12px;
  background-color: #fff; /* Color of the checkmark */
  border-radius: 2px; /* Optional: rounded corners for the checkmark */
}

.custom-checkbox span::after {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) scale(0);
  width: 12px;
  height: 12px;
  background-color: #fff; /* Color of the checkmark */
  border-radius: 2px; /* Optional: rounded corners for the checkmark */
}

/* Style the label text */
.custom-checkbox + span + span {
  font-family: Arial, sans-serif;
  font-size: 16px;
}

.custom-input {
  background-color: #e0f7fa; /* Set your desired color */
  border: 1px solid #b2ebf2; /* Optional: border color */
  padding: 9px; /* Optional: padding inside the input */
  border-radius: 4px; /* Optional: rounded corners */
  font-family: 'Arial', sans-serif; /* Font family */
  font-size: 16px; /* Font size */
}

/* Custom button styles */
button {
  background-color: #00796b; /* Background color */
  color: #ffffff; /* Text color */
  border: none; /* Remove default border */
  border-radius: 4px; /* Rounded corners */
  padding: 10px 20px; /* Padding */
  font-family: Arial, sans-serif; /* Font family */
  font-size: 16px; /* Font size */
  cursor: pointer; /* Pointer cursor on hover */
  transition: background-color 0.3s, transform 0.2s; /* Smooth transitions */
  margin-left: 10px;
  display: inline-block;
}

button:first-of-type {
  margin-right: 15px; /* Add space to the right of the first button (Complete) */
}

/* Remove margin on the last button */
button:last-of-type {
  margin-right: 0;
}

button:hover {
  background-color: #004d40; /* Darker background on hover */
}

button:active {
  transform: scale(0.98); /* Slightly scale down on click */
}

/* Modal styling */
.modal {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000; /* Make sure modal is on top */
}

.modal-content {
  background: white;
  padding: 20px;
  border-radius: 8px;
  width: 300px;
  text-align: center;
  position: relative;
}

.modal-title {
  font-size: 18px;
  margin-bottom: 10px;
}

.modal-message {
  font-size: 16px;
  margin-bottom: 20px;
}

.modal-btn {
  background-color: #00796b;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 10px 20px;
  cursor: pointer;
  font-size: 16px;
}

.modal-btn:hover {
  background-color: #004d40;
}

.modal-close {
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
  font-size: 24px;
}
</style>
