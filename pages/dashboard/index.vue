<template>
    <NuxtLayout name="logged">
        <UpdateModal v-if="updateModalData.dialog" :attachments="updateModalData.attachments"
            v-on:update="UpdateModalFunc" />
        <SubTasksModal v-if="subTasksModalData.dialog" :data="subTasksModalData.data" :index="subTasksModalData.index" v-on:newUpdate="UpdateSubTasksModalNew" v-on:update="UpdateSubTasksModal" />
        <div class="pa-3">
            <div class="mt-3 d-flex">
                <div class="d-flex align-center">
                    <v-select variant="underlined" :items="per_page_menu" v-model="perPage" width="120px"
                        @update:modelValue="listProcess">
                        <template v-slot:label>
                            PER PAGE
                        </template>
                    </v-select>
                    <v-menu transition="scale-transition">
                        <template v-slot:activator="{ props }">
                            <v-btn class="ml-2 mb-2" variant="outlined" rounded="0" v-bind="props">
                                SORT BY : <v-icon class="mr-1">mdi-{{
                                    // @ts-ignore
                                    sort_by_label[sort_by].icon
                                }}</v-icon> {{
                                        // @ts-ignore
                                        sort_by_label[sort_by].label
                                    }}
                            </v-btn>
                        </template>

                        <v-list>
                            <v-list-item>
                                <v-list-item-title @click="sort_by_func('priority_asc')" style="cursor : pointer">
                                    <v-icon class="mr-1">mdi-sort-ascending</v-icon>
                                    PRIORITY
                                </v-list-item-title>
                                <v-divider class="my-2"></v-divider>
                                <v-list-item-title @click="sort_by_func('priority_desc')" style="cursor : pointer">
                                    <v-icon class="mr-1">mdi-sort-descending</v-icon>
                                    PRIORITY
                                </v-list-item-title>
                                <v-divider class="my-2"></v-divider>
                                <v-list-item-title @click="sort_by_func('title_asc')" style="cursor : pointer">
                                    <v-icon class="mr-1">mdi-sort-alphabetical-ascending</v-icon>
                                    TITLE
                                </v-list-item-title>
                                <v-divider class="my-2"></v-divider>
                                <v-list-item-title @click="sort_by_func('title_desc')" style="cursor : pointer">
                                    <v-icon class="mr-1">mdi-sort-alphabetical-descending</v-icon>
                                    TITLE
                                </v-list-item-title>
                                <v-divider class="my-2"></v-divider>
                                <v-list-item-title @click="sort_by_func('date_asc')" style="cursor : pointer">
                                    <v-icon class="mr-1">mdi-sort-clock-ascending</v-icon>
                                    DATE
                                </v-list-item-title>
                                <v-divider class="my-2"></v-divider>
                                <v-list-item-title @click="sort_by_func('date_desc')" style="cursor : pointer">
                                    <v-icon class="mr-1">mdi-sort-clock-descending</v-icon>
                                    DATE
                                </v-list-item-title>
                            </v-list-item>
                        </v-list>
                    </v-menu>
                    <v-menu transition="scale-transition">
                        <template v-slot:activator="{ props }">
                            <v-btn class="ml-2 mb-2" color="primary" variant="outlined" rounded="0" v-bind="props">
                                DISPLAY : <v-icon class="mr-1">mdi-{{
                                    // @ts-ignore
                                    display_by_label[display].icon
                                }}</v-icon> {{
                                        // @ts-ignore
                                        display_by_label[display].label
                                    }}
                            </v-btn>
                        </template>

                        <v-list>
                            <v-list-item>
                                <v-list-item-title @click="display_by_func('all')" style="cursor : pointer">
                                    <v-icon class="mr-1">mdi-format-list-bulleted</v-icon>
                                    ALL
                                </v-list-item-title>
                                <v-divider class="my-2"></v-divider>
                                <v-list-item-title @click="display_by_func('todo')" style="cursor : pointer">
                                    <v-icon class="mr-1">mdi-format-list-checks</v-icon>
                                    TO-DO
                                </v-list-item-title>
                                <v-divider class="my-2"></v-divider>
                                <v-list-item-title @click="display_by_func('inprogress')" style="cursor : pointer">
                                    <v-icon class="mr-1">mdi-progress-clock</v-icon>
                                    IN-PROGRESS
                                </v-list-item-title>
                                <v-divider class="my-2"></v-divider>
                                <v-list-item-title @click="display_by_func('done')" style="cursor : pointer">
                                    <v-icon class="mr-1">mdi-check-circle-outline</v-icon>
                                    DONE
                                </v-list-item-title>
                            </v-list-item>
                        </v-list>
                    </v-menu>
                </div>
                <v-spacer></v-spacer>
                <v-btn small color="primary" class="mb-0" :to="{ path: '/dashboard/tasks/create' }">Create New
                    Task</v-btn>
            </div>
            <v-divider class="my-4"></v-divider>
            <div class="">
                <v-text-field v-model="search_title" clearable variant="outlined" rounded="0" hint="Hit enter to initiate search." persistent-hint @keypress.enter="searchByTitle">
                    <template v-slot:label>
                        Search a Task
                    </template>
                    <template v-slot:append-inner>
                        <v-icon color="">mdi-magnify</v-icon>
                    </template>
                </v-text-field>
            </div>
            <v-divider class="my-4"></v-divider>
            <v-row>
                <v-col cols="12" xl="4" lg="4" v-for="(item, index) in list" :key="index">
                    <v-card class="elevation-5" rounded="0" color="grey-lighten-3">
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

                                <div class="text">Attachments : <!-- @vue-expect-error --><span
                                        class="text-red-lighten-2 clickable" style="cursor : pointer"
                                        v-if="item.attachments.length <= 0">No image attached</span>
                                    <!-- @vue-expect-error -->
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
                            <div class="pa-2 d-flex justify-space-between">
                                <!-- @vue-expect-error -->
                                <v-progress-linear v-if="item.sub_tasks.length" height="13"
                                    :model-value="(item.completed_sub_tasks / item.sub_tasks_count) * 100" color="green"
                                    rounded size="small" style="margin-top : 3px">
                                    <strong>{{
                                        // @ts-ignore
                                        `${item.completed_sub_tasks}/${item.sub_tasks_count}`
                                    }}</strong>
                                </v-progress-linear>
                                <!-- @vue-expect-error -->
                                <v-btn v-if="item.sub_tasks.length" @click="openSubTasksModal(item.sub_tasks,index)" class="mb-0" size="x-small" variant="text"
                                    color="primary">Click
                                    here to see
                                    (4)
                                    Sub-Task(s)</v-btn>
                                <v-btn v-else class="mb-0" size="x-small" variant="text" color="primary"></v-btn>
                            </div>
                        </v-card-text>
                        <v-divider></v-divider>
                        <v-card-actions class="justify-space-between">
                            <!-- @vue-expect-error -->
                            <v-btn color="green" size="small" variant="outlined" rounded=0 :disabled="item.status == 3"
                                @click="markAsFunction(3, item.id)" :loading="mark_as_loading">Mark as
                                Done</v-btn>
                            <!-- @vue-expect-error -->
                            <v-btn color="primary" size="small" variant="outlined" rounded=0
                                :disabled="item.status == 2 || item.status == 3" @click="markAsFunction(2, item.id)"
                                :loading="mark_as_loading">Mark
                                as
                                In-Progress</v-btn>
                            <!-- @vue-expect-error -->
                            <v-btn color="orange" size="small" variant="outlined" rounded=0
                                :disabled="item.status == 1 || item.status == 3" @click="markAsFunction(1, item.id)"
                                :loading="mark_as_loading">Mark
                                as
                                To-Do</v-btn>
                        </v-card-actions>
                    </v-card>
                </v-col>
            </v-row>
            <div class="d-flex mt-5">
                <div>
                    {{ perPage }} of {{ total }}
                </div>
                <v-spacer></v-spacer>
                <v-pagination v-model="page" :length="last_page" :total-visible="5" @update:modelValue="listProcess()"
                    rounded="0"></v-pagination>
            </div>
        </div>
    </NuxtLayout>
</template>>

<script setup lang="ts">
import { listProcess, priority_label, status_label, per_page_menu, sort_by_func, sort_by_label, UpdateModalFunc, updateModalData, openAttachmentModal, display_by_func, markAsFunction, mark_as_loading, subTasksModalData, UpdateSubTasksModal, openSubTasksModal, UpdateSubTasksModalNew, searchByTitle, display_by_label } from '~/services/dashboard/tasks/list'
import { listTaskStore } from '~/store/tasks/list';
import moment from 'moment'

import UpdateModal from '~/components/tasks/update_modal.vue'
import SubTasksModal from '~/components/tasks/sub_taks_modal.vue'

useHead({
    title: 'Home'
})
onMounted(async () => {
    await listProcess()
})
const { list,
    page,
    perPage,
    total,
    last_page,
    sort_by,
    search_title,
    display
} = storeToRefs(listTaskStore())
</script>