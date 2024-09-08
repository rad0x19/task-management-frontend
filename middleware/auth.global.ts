import { storeToRefs } from 'pinia';
import { authStore } from '../store/auth/index'

export default defineNuxtRouteMiddleware(async (to,from) => {
    const store = authStore()
    const { user } = storeToRefs(store)
    const { checkAuth, user_value } = store
    const redirect = ref('/')
    if(localStorage.getItem('token') != null && Object.keys(user.value).length <= 0){
        await checkAuth().then(async (res : any) => {
            await user_value(res.data)
            if(from.path === '/'){
                redirect.value = '/dashboard'
            }else{
                redirect.value = from.path
            }
        })
        .catch(async (err : any) => {
            redirect.value = '/'
        })
        if(to.path != redirect.value){
            return navigateTo(redirect.value)
        }
    }else if(localStorage.getItem('token') === null){
        if(to.fullPath.includes('dashboard')){
            return navigateTo('/')
        }
    }else if(Object.keys(user.value).length > 0){
        if(!to.fullPath.includes('dashboard')){
            return navigateTo('/dashboard')
        }
    }
})