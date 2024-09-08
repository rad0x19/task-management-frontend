import { loginStore } from "~/store/auth/login";
import { storeToRefs } from 'pinia'
import { useRouter } from "#app";

export const formRef = ref(null)
export const isFormActive = ref(null)
export const isLoading = ref(false)

export const rules = {
    email : [
        (v : any) => !!v || 'E-Mail is a required field'
    ],
    password : [
        (v : any) => !!v || 'Password is a required field.'
    ]
}

export const processLogin = async () => {
    const { email, password } = storeToRefs(loginStore())
    const { loginAction } = loginStore()
    // validate form
    // @ts-ignore
    await formRef.value?.validate()
    if(isFormActive.value){
        isLoading.value = true
        setTimeout(async () => {
            await loginAction({ email : email.value, password : password.value }).then( async ({ data }) => {
                localStorage.setItem('token', data.token)
                // @ts-ignore
                await formRef.value?.reset()
                useRouter().push('/dashboard')
            }).catch(() => {}).finally(() => {
                isLoading.value = false
            })
        },800)
    }
}

