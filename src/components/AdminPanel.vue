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
              <colgroup>
                <col style="width: 50%" />
                <col style="width: 50%" />
              </colgroup>
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
          <div v-if="colourThemeStore.colourTheme.colours.length > 0">
            <table>
              <colgroup>
                <col style="width: 40%;">
                <col style="width: 30%;">
                <col style="width: 30%;">
              </colgroup>
              <thead>
              <tr>
                <th>Option</th>
                <th>Colour</th>
                <th>Action</th>
              </tr>
              </thead>
              <tbody>
              <tr v-for="colour in colourThemeStore.colourTheme.colours" :key="colour.colourProperty">
                <td>{{ colour.colourProperty }}</td>
                <td>
                  <div class="colour-sample">
                    <span
                        :style="{
                        backgroundColor: colour.colourValue,
                        display: 'inline-block',
                        width: '20px',
                        height: '20px',
                        borderRadius: '50%',
                        border: '1px solid black'
                      }"
                        title="Preview"
                    ></span>
                    {{ colour.colourValue }}
                  </div>
                </td>
                <td>
                  <button @click="colourThemeStore.editColourIndex = colour.colourProperty">Edit</button>
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
    <ShowColourThemeModal />
  </div>
</template>

<script setup>
import { onMounted } from 'vue';
import { useAdminStore } from '@/stores/useAdminStore';
import { useAuthStore } from '@/stores/useAuthStore';
import { useCreateUserModalStore } from '@/stores/useCreateUserModalStore';
import { useColourThemeStore } from '@/stores/useColourThemeStore';

import ShowErrorModal from '@/components/ShowErrorModal.vue';
import ShowLoadingModal from '@/components/ShowLoadingModal.vue';
import ShowCreateUserModal from '@/components/ShowCreateUserModal.vue';
import ShowColourThemeModal from "@/components/ShowColourThemeModal.vue";


const adminStore = useAdminStore();
const authStore = useAuthStore();
const createUserModalStore = useCreateUserModalStore();
const colourThemeStore = useColourThemeStore();

onMounted(() => {
  adminStore.fetchUsers();
});
</script>

<style scoped>
.user-list-header {
  display: flex;
  align-items: center;
  justify-content: center;
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

table td {
  text-align: center;
}

th, td {
  padding: 10px;
  text-align: left;
  border-bottom: 1px solid var(--table-border-colour);
}

th {
  background-color: var(--table-header-bgcolour);
  text-align: center;
}

td > button {
  padding: 5px 10px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

td > button:hover {
  background-color: var(--button-hover-bgcolour);
}

.colour-sample {
  display: flex;
  align-items: center;
  gap: 10px;
  justify-content: center;
}
</style>
