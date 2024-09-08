import { defineStore } from "pinia";

export const loginStore = defineStore({
    id : 'login-store',
    state: () => {
        return {
            email : '',
            password : ''
        }
    },
    actions:    {
        async loginAction(params : any) {
            const { $api } = useNuxtApp()
            return await $api.post('/auth/login',params);
        }
    }
})