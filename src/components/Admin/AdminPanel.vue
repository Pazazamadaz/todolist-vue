<template>
  <div>
    <button class="admin-button" @click="() => $router.push('/todos')">Todos</button>
    <button class="logout-button" @click="logout">Logout</button>
    <h1>User List</h1>
  </div>
</template>

<script setup>
// No need for additional logic here yet, but we can use setup for Composition API
</script>

<style scoped>
/* Add any admin panel-specific styles here */
</style>
