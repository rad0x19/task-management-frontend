import { registerStore } from "~/store/auth/register";
import { storeToRefs } from 'pinia'
import { useRouter } from "#app";

export const formRef = ref(null);
export const isFormActive = ref(false)
export const isLoading = ref(false)

export const rules = {
    full_name : [
        (v : any) => !!v || 'Full Name is a required field.'
    ],
    email : [
        (v : any) => !!v || 'E-Mail is a required field'
    ],
    password : [
        (v : any) => !!v || 'Password is a required field.'
    ],
    password_confirmation : [
        (v : any) => !!v || 'Confirmation Password is a required field.',
        (v : any) => {
            const { password } = storeToRefs(registerStore())
            return v == password.value || 'Password confirmation failed.'
        }
    ]
}

export const processRegistration = async () => {
    const { full_name, email, password, password_confirmation } = storeToRefs(registerStore())
    const { registerAction } = registerStore()
    // validate form
    // @ts-ignore
    const {valid,error} = await formRef.value?.validate()
    if(valid){
        isLoading.value = true
        setTimeout(async () => {
            await registerAction({ full_name : full_name.value, email : email.value, password : password.value, password_confirmation : password_confirmation.value }).then((data) => {
                const router = useRouter()
                router.push('/')
            }).catch(() => {}).finally(() => {
                isLoading.value = false
            })
        },800)
    }else{

    }
}

