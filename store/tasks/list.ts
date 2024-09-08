import { defineStore } from "pinia";

export const listTaskStore = defineStore({
    id : 'list-task-store',
    state: () => {
        return {
            list: [],
            page: 1,
            perPage: 9,
            total: 0,
            last_page: 1,
            sort_by : 'priority_asc',
            display : 'all',
            search_title : null
        }
    },
    actions:    {
        
        async listAction () {
            const { $api } = useNuxtApp()
            return await $api.get(`/authenticated/tasks/list?page=${this.page}&sort_by=${this.sort_by}&perPage=${this.perPage}&display=${this.display}&search_title=${this.search_title}`);
        },

        async updateStatusAction (params : any) {
            const { $api } = useNuxtApp()
            return await $api.post(`/authenticated/tasks/status/update`, params);
        }

    }
})