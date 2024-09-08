<template>
    <NuxtLayout>
        <div class="d-flex align-center justify-center" style="min-height: 100vh;">
            <div class="">
                <h2 class="text-center mb-2 title text-overline text-grey">Task Management</h2>
                <v-card width="450px" class="elevation-1" color="#F5F7F8">
                    <v-card-title class="text-grey">
                        LOGIN
                    </v-card-title>
                    <v-divider></v-divider>
                    <v-form lazy-validation v-model="isFormActive" ref="formRef" @submit.prevent="processLogin">
                        <v-card-text>
                            <v-row>
                                <v-col cols="12">
                                    <v-text-field variant="outlined" class="rounded-none" rounded="0" density="comfortable" v-model="email" :rules="rules.email" :disabled="isLoading ? true : false">
                                        <template v-slot:label>
                                            E-MAIL : <span class="text-red">*</span>
                                        </template>
                                    </v-text-field>
                                </v-col>
                                <v-col>
                                    <v-text-field variant="outlined" class="rounded-none" rounded="0" density="comfortable" type="password" v-model="password" :rules="rules.password" :disabled="isLoading ? true : false">
                                        <template v-slot:label>
                                            PASSWORD : <span class="text-red">*</span>
                                        </template>
                                    </v-text-field>
                                </v-col>
                            </v-row>
                        </v-card-text>
                        <v-divider></v-divider>
                        <v-card-actions>
                            <v-btn color="primary" variant="text" class="rounded-0" :to="{ path : '/register' }">REGISTER</v-btn>
                            <v-spacer></v-spacer>
                            <v-btn color="success" variant="outlined" class="rounded-0" type="submit" :loading="isLoading">Login</v-btn>
                        </v-card-actions>
                    </v-form>
                </v-card>
            </div>
        </div>
    </NuxtLayout>
</template>

<script setup>
import { processLogin, isFormActive, rules, isLoading, formRef } from '~/services/auth/login'
import { storeToRefs } from 'pinia'
import { loginStore } from '~/store/auth/login'
useHead({
    title : 'Login'
})
// formData
const { email, password } = storeToRefs(loginStore())
</script>

<style lang="scss" scoped>
.title {
    font-size : 2rem !important;
    letter-spacing : 0.5rem !important;
}
</style>