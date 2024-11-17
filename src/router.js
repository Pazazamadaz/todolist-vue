import { createRouter, createWebHistory } from 'vue-router';
import ToDoList from './components/ToDoList/ToDoList.vue';
import Login from './components/UserLogin/UserLogin.vue';
import { useAuthStore } from './stores/useAuthStore';
import AdminPanel from './components/Admin/AdminPanel.vue';
import ShowErrorModal from "@/components/Helpers/ShowErrorModal.vue";
import {useShowErrorModalStore} from "@/stores/useShowErrorModalStore";

// Reusable authentication guard
const requireAuth = (to, from, next) => {
  const authStore = useAuthStore();
  if (!authStore.isAuthenticated) {
    next('/login');
  } else if (to.path === '/admin' && !authStore.isAdmin) {
    next('/notadmin');
  }
  else {
    next();
  }
};

const routes = [
  {
    path: '/',
    redirect: '/login', // Redirect root URL to the login page
  },
  { path: '/login', component: Login },
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
  {
    path: '/notadmin',
    component: ShowErrorModal,
    beforeEnter: () => {
      const showErrorModalStore = useShowErrorModalStore();
      showErrorModalStore.errorModalTitle = "UNAUTHORISED ACCESS!!!";
      showErrorModalStore.errorModalMessage = "Naughty user!";
      showErrorModalStore.showErrorModal = true;
    },
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
