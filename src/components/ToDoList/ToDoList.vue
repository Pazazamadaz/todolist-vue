<template>
  <div id="app">
    <button class="logout-button" @click="logout">Logout</button>
    <h1>Todo List</h1>

    <div class="input-container">
      <label class="switch">
        <input type="checkbox" v-model="orderByCompleted">
        <span class="slider round"></span>
      </label>
      <input v-model="newTodoTitle" class="custom-input" placeholder="New task" @keyup.enter="addTodoItem" />
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

    <ShowLoadingModal />
    <ShowErrorModal />

  </div>
</template>

<script setup>
import { onMounted } from 'vue';
import useTodoStore from '@/stores/useToDoStore';
import useAuthStore from '@/stores/useAuthStore';
import ShowErrorModal from '@/components/Helpers/ShowErrorModal.vue';
import ShowLoadingModal from "@/components/Helpers/ShowLoadingModal.vue";

const {
  fetchTodoItems,
  addTodoItem,
  toggleComplete,
  deleteTodoItem,
  newTodoTitle,
  orderedTodoItems,
  orderByCompleted,
} = useTodoStore();

const { logout } = useAuthStore();

onMounted(() => {
  fetchTodoItems();
});
</script>
