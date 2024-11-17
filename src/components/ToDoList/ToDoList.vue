<template>
  <div id="app">
    <button v-if="authStore.isAdmin" class="admin-button" @click="() => $router.push('/admin')">Admin</button>
    <button class="logout-button" @click="authStore.logout">Logout</button>
    <h1>Todo List</h1>

    <div class="input-container">
      <label class="switch">
        <input type="checkbox" v-model="todoStore.orderByCompleted">
        <span class="slider round"></span>
      </label>
      <input v-model="todoStore.newTodoTitle" class="custom-input" placeholder="New task" @keyup.enter="todoStore.addTodoItem" />
      <label>
        <input type="checkbox" v-model="todoStore.newTodoPriority" class="priority-checkbox">
        <span class="checkbox-label">Priority?</span>
      </label>
      <button @click="todoStore.addTodoItem">Add Task</button>
    </div>

    <div class="table-container" v-if="todoStore.orderedTodoItems.length > 0">
      <table>
        <thead>
        <tr>
          <th>Title</th>
          <th :style="{ width: '100px' }" >Is Priority</th>
          <th>Actions</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="item in todoStore.orderedTodoItems" :key="item.id">
          <td>
            <span :class="{ completed: item.isCompleted }">{{ item.title }}</span>
          </td>
          <td>
            <label class="switch">
              <input type="checkbox" v-model="item.isPriority" @change="todoStore.togglePriority(item)">
              <span class="slider round"></span>
            </label>
          </td>
          <td>
            <button v-if="!item.isCompleted" @click="todoStore.toggleComplete(item)">Complete</button>
            <button v-if="item.isCompleted" @click="todoStore.toggleComplete(item)">Uncomplete</button>
            <button @click="todoStore.deleteTodoItem(item.id)">Delete</button>
          </td>
        </tr>
        </tbody>
      </table>
    </div>
    <div v-else>
      <p>No tasks available.</p>
    </div>

    <ShowLoadingModal />
    <ShowErrorModal />
  </div>
</template>

<script setup>
import { onMounted } from 'vue';
import { useToDoStore } from '@/stores/useToDoStore';
import { useAuthStore } from '@/stores/useAuthStore';
import ShowErrorModal from '@/components/Helpers/ShowErrorModal.vue';
import ShowLoadingModal from "@/components/Helpers/ShowLoadingModal.vue";

const authStore = useAuthStore();
const todoStore = useToDoStore();

onMounted(() => {
  todoStore.fetchTodoItems();
});
</script>

<style scoped>
/* Style for the custom checkbox */
.priority-checkbox {
  appearance: none; /* Remove default styling */
  width: 18px; /* Match the size of your input field */
  height: 18px;
  background-color: #e0f7fa; /* Match the input field's background */
  border: 1px solid #b2ebf2; /* Match the input field's border */
  border-radius: 4px; /* Optional: rounded corners for the checkbox */
  cursor: pointer;
  display: inline-block;
  vertical-align: middle; /* Align with the text */
}

/* Add checked state for the checkbox */
.priority-checkbox:checked {
  background-color: #00796b; /* Fill with your desired color */
  border-color: #00796b;
  background-image: url('data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="white"%3E%3Cpath d="M6.173 13.707l-3.828-3.828 1.414-1.414L6.173 10.88l6.364-6.364 1.414 1.414z"/%3E%3C/svg%3E');
  background-repeat: no-repeat;
  background-position: center;
  background-size: 70%;
}

/* Style the checkbox label */
.checkbox-label {
  font-size: 0.8rem; /* Smaller text size */
  color: #00796b; /* Match your app's color scheme */
  margin-left: 8px; /* Spacing between checkbox and label */
  font-family: Arial, sans-serif; /* Match input text styling */
  line-height: 18px; /* Match the height of the checkbox */
  vertical-align: middle; /* Ensure alignment with the checkbox */
}


</style>
