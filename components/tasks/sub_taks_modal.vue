<template>
    <v-dialog v-model="dialog" width="auto" persistent>
        <v-card min-width="640" max-width="980">
            <v-card-title class="d-flex">
                <div class="">SUB-TASK(s)</div>
                <v-spacer></v-spacer>
                <v-btn color="red" variant="text" @click="closeDialog">
                    <v-icon size="x-large">mdi-close-circle-outline</v-icon>
                </v-btn>
            </v-card-title>
            <v-divider></v-divider>
            <v-card-text style="overflow: hidden auto; max-height : 830px;">
            <v-row>
                <v-col cols="12" v-for="(item, index) in props.data" :key="index">
                    <v-card class="elevation-0" rounded="0" color="grey-lighten-3">
                        <v-card-title class="text-primary d-flex">
                            {{
                                // @ts-ignore
                                item.title
                            }}
                            <!-- @vue-expect-error -->
                            <v-chip :color="priority_label[item.priority].color" rounded="0" size="x-small"
                                class="ml-1 pa-1 text-overline"
                                style="margin-top : 6px; letter-spacing : 0px !important; font-weight : bold !important">{{
                                    // @ts-ignore
                                    priority_label[item.priority].label }}</v-chip>
                            <!-- @vue-expect-error -->
                            <v-chip :color="status_label[item.status].color" rounded="0" size="x-small"
                                class="ml-1 pa-1 text-overline"
                                style="margin-top : 6px; letter-spacing : 0px !important; font-weight : bold !important">{{
                                    // @ts-ignore
                                    status_label[item.status].label }}</v-chip>
                            <v-spacer></v-spacer>
                        </v-card-title>
                        <v-divider></v-divider>
                        <v-card-text class="position-relative">
                            {{
                                // @ts-ignore
                                item.description
                            }}
                            <div class="pa-2 bg-grey-lighten-2 mt-2 d-flex text-grey font-weight-bold"
                                style="font-size : 11px">

                                <div class="text">Attachments : <span
                                        class="text-red-lighten-2 clickable" style="cursor : pointer"
                                        v-if="item.attachments.length <= 0">No image attached</span>
                                    <span class="text-warning clickable" style="cursor : pointer" v-else
                                        @click="openAttachmentModal(item.attachments)">{{
                                            // @ts-ignore
                                            item.attachments.length
                                        }} image(s)</span>
                                </div>
                                <v-spacer></v-spacer>
                                <div class="time">Date Created : {{
                                    // @ts-ignore
                                    moment(item.created_at).format('MMMM D YYYY, h:mm:ss a')
                                }}</div>
                            </div>
                        </v-card-text>
                        <v-divider></v-divider>
                        <v-card-actions class="justify-space-between">
                            <v-btn color="green" size="small" variant="outlined" rounded=0 :disabled="item.status == 3"
                                @click="processUpdate(3, item.id, props.index)" :loading="mark_as_loading">Mark as
                                Done</v-btn>
                            <v-btn color="primary" size="small" variant="outlined" rounded=0
                                :disabled="item.status == 2 || item.status == 3" @click="processUpdate(2, item.id, props.index)"
                                :loading="mark_as_loading">Mark
                                as
                                In-Progress</v-btn>
                            <v-btn color="orange" size="small" variant="outlined" rounded=0
                                :disabled="item.status == 1 || item.status == 3" @click="processUpdate(1, item.id, props.index)"
                                :loading="mark_as_loading">Mark
                                as
                                To-Do</v-btn>
                        </v-card-actions>
                    </v-card>
                    <v-divider class="my-3"></v-divider>
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
import { priority_label, status_label, openAttachmentModal, markAsFunction, mark_as_loading, openSubTasksModal } from '~/services/dashboard/tasks/list'
import moment from 'moment'
import { listTaskStore } from '~/store/tasks/list';
import { storeToRefs } from 'pinia'
const props = defineProps([ 'data', 'index' ])
const emit = defineEmits([ 'update', 'newUpdate' ])
// const dialog = ref(false)
const dialog = ref(true)
const closeDialog = async () => {
    emit('update', 'nice')
    dialog.value = false
}
const processUpdate = async (status : any, id : any, index : any) => {
    const { list } = storeToRefs(listTaskStore())
    await markAsFunction(status, id)
    nextTick(() => {
        console.log(index)
        console.log(list.value[index])
    })
    emit('newUpdate', {
        // @ts-ignore
        newList : list.value[index].sub_tasks
    })
}
</script>