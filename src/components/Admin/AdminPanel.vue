<template>
  <div>
    <button class="admin-button" @click="() => $router.push('/todos')">Todos</button>
    <button class="logout-button" @click="logout">Logout</button>

    <h1>User List</h1>
    <button class="create-user-button" @click="() => showCreateUserModal.value = true">Create User</button>

    <div class="table-container" v-if="users.length > 0">
      <table>
        <thead>
        <tr>
          <th>Name</th>
          <th>Actions</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="user in users" :key="user">
          <td>{{ user }}</td>
          <td>
            <button @click="deleteUser(user)">Delete</button>
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
import { onMounted } from 'vue';
import { useAdminStore } from '@/stores/useAdminStore';
import { useAuthStore } from '@/stores/useAuthStore';
import ShowErrorModal from '@/components/Helpers/ShowErrorModal.vue';
import ShowLoadingModal from "@/components/Helpers/ShowLoadingModal.vue";
import ShowCreateUserModal from "@/components/Helpers/ShowCreateUserModal.vue";

// Initialize stores
const adminStore = useAdminStore();
const authStore = useAuthStore();

// Destructure actions and state
const { fetchUsers, deleteUser } = adminStore;
const { logout } = authStore;

// Fetch users on mount
onMounted(() => {
  fetchUsers();
});
</script>
