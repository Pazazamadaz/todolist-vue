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
