<template>
    <v-dialog v-model="dialog" width="auto" persistent>
        <v-card min-width="480" max-width="980">
            <v-card-title class="d-flex">
                <div class="">ATTACHMENTS</div>
                <v-spacer></v-spacer>
                <v-btn color="red" variant="text" @click="closeDialog">
                    <v-icon size="x-large">mdi-close-circle-outline</v-icon>
                </v-btn>
            </v-card-title>
            <v-divider></v-divider>
            <v-card-text style="overflow: hidden auto; max-height : 830px;">
                <v-row>
                    <v-col v-for="(item,index) in props.attachments" :key="index">
                        <v-img :src="`/${item.file_name.replace('public/','')}`" min-width="450px"></v-img>
                    </v-col>
                </v-row>
            </v-card-text>
            <v-divider></v-divider>
            <v-card-actions>
                <v-btn class="ms-auto" text="Close" @click="closeDialog"></v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script setup lang="ts">
const props = defineProps([ 'attachments' ])
const emit = defineEmits([ 'update' ])
// const dialog = ref(false)
const dialog = ref(true)
const closeDialog = async () => {
    emit('update', 'nice')
    dialog.value = false
}
</script>