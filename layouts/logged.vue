<template>
    <div>
        <v-toolbar>
            <v-toolbar-title>Task Management</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn variant="text" @click="logout">
                LOGOUT
                <v-icon class="ml-2">mdi-logout</v-icon>
            </v-btn>
        </v-toolbar>
        <slot />
    </div>
</template>

<script setup lang="ts">
import { authStore } from '~/store/auth';
import { useRouter } from '#app';
useHead({
    titleTemplate: (title: any) => {
        return title ? `${title} - Dashboard | Task Management` : 'Task Management'
    }
})
const logout = async () => {
    const { callLogout } = authStore()
    await callLogout().then(() => {
        localStorage.removeItem("token")
        useRouter().push('/')
    }).catch(() => {})
}
</script>