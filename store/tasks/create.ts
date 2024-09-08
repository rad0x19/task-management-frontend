import { defineStore } from "pinia";

export const createTaskStore = defineStore({
    id : 'create-task-store',
    state: () => {
        return {
            isDraft : false,
            title: '',
            priority: {
                label: 'Select a Priority',
                value: null
            },
            description: '',
            attachments : [],
            subTasks: []
        }
    },
    actions:    {
        
        createAction : async (params : any) => {
            const { $api } = useNuxtApp()
            const head = {
                headers: {
                    'Content-Type' : 'multipart/form-data'
                }
            }
            return await $api.post('/authenticated/tasks/create', params, head);
        }

    }
})