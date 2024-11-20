<template>
  <div>
    <!-- Portal Navigation and Logout -->
    <button class="portal-switch-button" @click="() => $router.push('/todos')">Todos</button>
    <button class="logout-button" @click="authStore.logout()">Logout</button>

    <div class="grid-container">
      <!-- User List Section -->
      <div>
        <div class="user-list-header">
          <h1>User List</h1>
          <button class="create-user-button" @click="createUserModalStore.showCreateUserModal = true">Create User</button>
        </div>
        <div class="admin-table-container">
          <div v-if="adminStore.users.length > 0">
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
        </div>
      </div>

      <!-- Color Options Section -->
      <div>
        <h1>Color Options</h1>
        <div class="admin-table-container">
          <div v-if="colourThemeStore.colours.length > 0">
            <table>
              <thead>
              <tr>
                <th>Option</th>
                <th>Colour</th>
                <th>Action</th>
              </tr>
              </thead>
              <tbody>
              <tr v-for="colour in colourThemeStore.colours" :key="colour.option">
                <td>{{ colour.option }}</td>
                <td>
                    <span
                        :style="{
                        backgroundColor: colour.value,
                        display: 'inline-block',
                        width: '20px',
                        height: '20px',
                        borderRadius: '50%',
                        border: '1px solid black' // Ensure visibility for light colors
                      }"
                        title="Preview"
                    ></span>
                  {{ colour.value }}
                </td>
                <td>
                  <!-- Action Buttons for Colours -->
                  <button>Edit</button>
                </td>
              </tr>
              </tbody>
            </table>
          </div>
          <p v-else>No color options available to display.</p>
        </div>
      </div>
    </div>

    <!-- Modals -->
    <ShowLoadingModal />
    <ShowErrorModal />
    <ShowCreateUserModal />
  </div>
</template>

<script setup>
import { onMounted } from 'vue';
import { useAdminStore } from '@/stores/useAdminStore';
import { useAuthStore } from '@/stores/useAuthStore';
import { useCreateUserModalStore } from '@/stores/useCreateUserModalStore';
import ShowErrorModal from '@/components/ShowErrorModal.vue';
import ShowLoadingModal from '@/components/ShowLoadingModal.vue';
import ShowCreateUserModal from '@/components/ShowCreateUserModal.vue';
import { useColourThemeStore } from '@/stores/useColourThemeStore';

const adminStore = useAdminStore();
const authStore = useAuthStore();
const createUserModalStore = useCreateUserModalStore();
const colourThemeStore = useColourThemeStore();

// Fetch users and colors on mount
onMounted(() => {
  adminStore.fetchUsers();
  colourThemeStore.loadColours();
});
</script>

<style scoped>
.user-list-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
}

.create-user-button {
  position: relative;
}

.grid-container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  padding: 20px;
}

.admin-table-container {
  width: 100%;
  margin: 0 auto;
  overflow-x: auto;
}

table {
  width: 100%;
  border-collapse: collapse;
}

th, td {
  padding: 10px;
  text-align: left;
  border-bottom: 1px solid #ddd;
}

th {
  background-color: #f4f4f4;
}

td > button {
  padding: 5px 10px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

td > button:hover {
  background-color: #ddd;
}
</style>
