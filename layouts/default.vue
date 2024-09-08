<template>
    <div>
        <slot />
    </div>
</template>

<script setup lang="ts">
useHead({
    titleTemplate : (title : any) => {
        return title ? `${title} | Task Management` : 'Task Management'
    }
})
</script>