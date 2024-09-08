import { defineStore } from "pinia";

export const authStore = defineStore({
    id : 'auth-store',
    state: () => {
        return {
            user : {},
        }
    },
    actions:    {
        async user_value(user: Object){
            // @ts-ignore
            this.user = Object.assign({},user)
        },
        
        checkAuth : async () => {
            const { $api } = useNuxtApp();
            return await $api.get('/authenticated/user')
        },
        
        callLogout : async () => {
            const { $api } = useNuxtApp()
            return await $api.post('/authenticated/logout')
        }
    }
})