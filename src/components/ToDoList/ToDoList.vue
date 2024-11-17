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
/* Style the checkbox to match the input field */
.priority-checkbox {
  appearance: none;  /* Remove the default checkbox styling */
  background-color: #e0f7fa; /* Match the input field background color */
  border: 1px solid #b2ebf2; /* Match the input border color */
  padding: 9px; /* Padding to give it some space */
  border-radius: 4px; /* Rounded corners */
  width: 15px; /* Adjust size of checkbox */
  height: 15px; /* Adjust size of checkbox */
  position: relative; /* To allow positioning of check mark */
  display: inline-block;
  cursor: pointer; /* Cursor changes to pointer on hover */
  font-family: 'Arial', sans-serif;
}

/* Checkbox checked state */
.priority-checkbox:checked {
  background-color: #00796b; /* Change background when checked */
  border-color: #00796b; /* Border color when checked */
}

/* Custom checkmark */
.priority-checkbox:checked::after {
  content: '';
  position: absolute;
  top: 2px;
  left: 6px;
  width: 6px;
  height: 10px;
  border: solid white;
  border-width: 0 3px 3px 0;
  transform: rotate(45deg); /* Create a checkmark */
}

.checkbox-label {
  font-size: 0.8rem; /* Smaller text size */
  color: #00796b; /* Match your app's color scheme */
  margin-left: 8px; /* Spacing between checkbox and label */
  font-family: Arial, sans-serif; /* Match input text styling */
  vertical-align: middle; /* Align text with the checkbox */
}

</style>
