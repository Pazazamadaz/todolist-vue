<template>
  <div id="app">
    <h1>Todo List</h1>

    <div class="input-container">
      <label class="switch">
        <input type="checkbox" v-model="orderByCompleted">
        <span class="slider round"></span>
      </label>
      <input v-model="newTodoTitle" class="custom-input" placeholder="New task" />
      <button @click="addTodoItem">Add Task</button>
    </div>

    <div class="table-container" v-if="orderedTodoItems.length > 0">
      <table>
        <thead>
        <tr>
          <th>Title</th>
          <th>Actions</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="item in orderedTodoItems" :key="item.id">
          <td>
            <span :class="{ completed: item.isCompleted }">{{ item.title }}</span>
          </td>
          <td>
            <button v-if="!item.isCompleted" @click="toggleComplete(item)">Complete</button>
            <button v-if="item.isCompleted" @click="toggleComplete(item)">Uncomplete</button>
            <button @click="deleteTodoItem(item.id)">Delete</button>
          </td>
        </tr>
        </tbody>
      </table>
    </div>
    <div v-else>
      <p>No tasks available.</p>
    </div>

    <div v-if="loading" class="modal">
      <div class="modal-content">
        <div class="loading-spinner"></div>
        <p>Loading...</p>
      </div>
    </div>

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
import useTodoStore from '@/stores/useTodoStore';

const {
  fetchTodoItems,
  addTodoItem,
  toggleComplete,
  deleteTodoItem,
  loading,
  showModal,
  modalTitle,
  modalMessage,
  orderedTodoItems,
} = useTodoStore();

const newTodoTitle = ref('');
const orderByCompleted = ref(false);

onMounted(() => {
  fetchTodoItems();
  orderedTodoItems(orderByCompleted);
});
</script>
