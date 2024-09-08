import { defineStore } from "pinia";

export const registerStore = defineStore({
    id : 'register-store',
    state: () => {
        return {
            full_name : '',
            email : '',
            password : '',
            password_confirmation : ''
        }
    },
    actions:    {
        async registerAction(params : any) {
            const { $api } = useNuxtApp()
            return await $api.post('/auth/register',params);
        }
    }
})