import { createRouter, createWebHistory } from 'vue-router';
import ToDoList from './components/ToDoList/ToDoList.vue';
import Login from './components/UserLogin/UserLogin.vue';
import useAuthStore from './stores/useAuthStore';
import UserRegister from './components/UserRegister/UserRegister.vue';
import AdminPanel from './components/Admin/AdminPanel.vue';

// Reusable authentication guard
const requireAuth = (to, from, next) => {
  const authStore = useAuthStore();
  if (!authStore.isAuthenticated()) {
    next('/login');
  } else {
    next();
  }
};

const routes = [
  {
    path: '/',
    redirect: '/login', // Redirect root URL to the login page
  },
  { path: '/login', component: Login },
  { path: '/register', component: UserRegister },
  {
    path: '/todos',
    component: ToDoList,
    beforeEnter: requireAuth, // Use the reusable auth guard
  },
  {
    path: '/admin',
    component: AdminPanel,
    beforeEnter: requireAuth, // Use the reusable auth guard
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
