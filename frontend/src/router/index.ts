import { createRouter, createWebHistory } from 'vue-router';
import BlogList from '../components/BlogList.vue';
import BlogCreate from '../components/BlogCreate.vue';
import BlogEdit from '../components/BlogEdit.vue';
import BlogView from '../components/BlogView.vue';

const routes = [
  { path: '/', component: BlogList },
  { path: '/create', component: BlogCreate },
  { path: '/edit/:id', component: BlogEdit, props: true },
  { path: '/blog/:slug', component: BlogView }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;


