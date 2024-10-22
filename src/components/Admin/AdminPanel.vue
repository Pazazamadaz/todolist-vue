<template>
  <div>
    <button class="admin-button" @click="() => $router.push('/todos')">Todos</button>
    <button class="logout-button" @click="logout">Logout</button>

    <h1>User List</h1>

    <table v-if="users.length > 0">
      <thead>
      <tr>
        <th>ID</th>
        <th>Name</th>
        <th>Email</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="user in users" :key="user.id">
        <td>{{ user.id }}</td>
        <td>{{ user.name }}</td>
        <td>{{ user.email }}</td>
      </tr>
      </tbody>
    </table>
    <p v-else>No users available to display.</p>

    <ShowLoadingModal />
    <ShowErrorModal />
    
  </div>
</template>

<script setup>
import useAdminStore from '@/stores/useAdminStore';
import { onMounted } from 'vue';
import ShowErrorModal from '@/components/Helpers/ShowErrorModal.vue';
import ShowLoadingModal from "@/components/Helpers/ShowLoadingModal.vue";

const { fetchUsers, users } = useAdminStore();

onMounted(() => {
  fetchUsers();
});
</script>