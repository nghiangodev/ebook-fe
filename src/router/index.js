import {createRouter, createWebHistory} from 'vue-router'
import PageNotFound from '@/components/PageNotFound.vue'


const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{
			path: '/:notFound', component: PageNotFound,
		},
	],
})

export default router
