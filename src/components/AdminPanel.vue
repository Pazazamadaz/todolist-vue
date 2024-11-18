<template>
  <div>
    <button class="portal-switch-button" @click="() => $router.push('/todos')">Todos</button>
    <button class="logout-button" @click="authStore.logout()">Logout</button>

    <h1>User List</h1>
    <button class="create-user-button" @click="createUserModalStore.showCreateUserModal = true">Create User</button>

    <div class="table-container" v-if="adminStore.users.length > 0">
      <table>
        <thead>
        <tr>
          <th>Name</th>
          <th>Actions</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="user in adminStore.users" :key="user">
          <td>{{ user }}</td>
          <td>
            <button @click="adminStore.deleteUsername = user">Delete</button>
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
import { useCreateUserModalStore } from "@/stores/useCreateUserModalStore";
import ShowErrorModal from '@/components/ShowErrorModal.vue';
import ShowLoadingModal from "@/components/ShowLoadingModal.vue";
import ShowCreateUserModal from "@/components/ShowCreateUserModal.vue";

// Initialize stores
const adminStore = useAdminStore();
const authStore = useAuthStore();
const createUserModalStore = useCreateUserModalStore();

// Fetch users on mount
onMounted(() => {
  adminStore.fetchUsers();
});
</script>
