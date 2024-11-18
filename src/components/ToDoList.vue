<template>
  <div id="app">
    <button v-if="authStore.isAdmin" class="portal-switch-button" @click="() => $router.push('/admin')">Admin</button>
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
import ShowErrorModal from '@/components/ShowErrorModal.vue';
import ShowLoadingModal from "@/components/ShowLoadingModal.vue";

const authStore = useAuthStore();
const todoStore = useToDoStore();

onMounted(() => {
  todoStore.fetchTodoItems();
});
</script>

<style scoped>

.priority-checkbox {
  appearance: none;
  width: 18px;
  height: 18px;
  background-color: #e0f7fa;
  border: 1px solid #b2ebf2;
  border-radius: 4px;
  cursor: pointer;
  display: inline-block;
  vertical-align: middle;
}

.priority-checkbox:checked {
  background-color: #00796b;
  border-color: #00796b;
  background-image: url('data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="white"%3E%3Cpath d="M6.173 13.707l-3.828-3.828 1.414-1.414L6.173 10.88l6.364-6.364 1.414 1.414z"/%3E%3C/svg%3E');
  background-repeat: no-repeat;
  background-position: center;
  background-size: 70%;
}

.checkbox-label {
  font-size: 0.8rem;
  color: #00796b;
  margin-left: 8px;
  font-family: Arial, sans-serif;
  line-height: 18px;
  vertical-align: middle;
}

.switch {
  position: relative;
  display: inline-block;
  width: 60px;
  height: 34px;
  margin-right: 10px;
}

.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  transition: 0.4s;
}

.slider:before {
  position: absolute;
  content: "";
  height: 26px;
  width: 26px;
  left: 4px;
  bottom: 4px;
  background-color: white;
  transition: 0.4s;
}

input:checked + .slider {
  background-color: #00796b;
}

input:checked + .slider:before {
  transform: translateX(26px);
}

.slider.round {
  border-radius: 34px;
}

.slider.round:before {
  border-radius: 50%;
}

.completed {
  text-decoration: line-through;
}
</style>
