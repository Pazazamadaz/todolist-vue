<template>
  <div>
    <button class="admin-button" @click="() => $router.push('/todos')">Todos</button>
    <button class="logout-button" @click="logout">Logout</button>

    <h1>User List</h1>
    <button class="create-user-button" @click="showCreateUserModal = true">Create User</button>
    <div class="table-container" v-if="users.length > 0">
      <table >
        <thead>
        <tr>
          <th>Name</th>
          <th>Actions</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="user in users" :key="user.id">
          <td>{{ user }}</td>
          <td>
            <button @click="deleteUser(user.id)">Delete</button>
          </td>
        </tr>
        </tbody>
      </table>
    </div>

    <p v-else>No users available to display.</p>

    <ShowLoadingModal />
    <ShowErrorModal />
    <ShowCreateUserModal />

  </div>
</template>

<script setup>
import useAdminStore from '@/stores/useAdminStore';
import { onMounted } from 'vue';
import ShowErrorModal from '@/components/Helpers/ShowErrorModal.vue';
import ShowLoadingModal from "@/components/Helpers/ShowLoadingModal.vue";
import ShowCreateUserModal from "@/components/Helpers/ShowCreateUserModal.vue"

const { fetchUsers, users, deleteUser } = useAdminStore();

onMounted(() => {
  fetchUsers();
});
</script>