<template>
    <NuxtLayout name="logged">
        <div class="">
            <div class="d-flex pa-3 text-h5 text-uppercase">
                Create a new Task
            </div>
            <v-divider class="mb-3"></v-divider>
            <v-form v-model="formValid" ref="formRef" lazy-validation>
                <v-row>
                    <v-col cols="12" xl="7" lg="7">
                        <div class="pa-3 text-overline text-center">
                            Main Task
                        </div>
                        <v-divider></v-divider>
                        <div class="pa-3">
                            <v-row>
                                <v-col cols="12" xl="6" lg="6">
                                    <v-text-field variant="underlined" rounded="0" v-model="title" :rules="rules.title"
                                        :disabled="isLoading">
                                        <template v-slot:label>
                                            TITLE : <span class="text-red">*</span>
                                        </template>
                                    </v-text-field>
                                </v-col>
                                <v-col cols="12" xl="6" lg="6">
                                    <v-select variant="underlined" :items="priority_menu" item-title="label"
                                        item-value="value" return-object :value-comparator="(a, b) => a === b"
                                        v-model="priority" :rules="rules.priority" :disabled="isLoading">
                                        <template v-slot:label>
                                            PRIORITY : <span class="text-red">*</span>
                                        </template>
                                    </v-select>
                                </v-col>
                                <v-col cols="12">
                                    <v-textarea variant="outlined" rounded="0" v-model="description"
                                        :rules="rules.description" :disabled="isLoading">
                                        <template v-slot:label>
                                            DESCRIPTION : <span class="text-red">*</span>
                                        </template>
                                    </v-textarea>
                                </v-col>
                                <v-col cols="12">
                                    <v-file-input v-model="attachments" variant="underlined" :accept="'.png, .jpeg'" label="SELECT AN ATTACHMENT(s)" chips multiple></v-file-input>
                                </v-col>
                            </v-row>
                            <v-divider></v-divider>
                            <div class="d-flex">
                                <v-switch v-model="isDraft" :disabled="isLoading" color="primary"
                                    :label="isDraft ? `Will be saved as draft.` : `Save as Draft?`" hide-details
                                    inset></v-switch>
                                <v-spacer></v-spacer>
                                <v-btn class="mt-3 mr-2" color="red-lighten-2" @click="cancelCreation"
                                    :disabled="isLoading">Cancel</v-btn>
                                <v-btn class="mt-3" color="success" @click="saveProcess" :loading="isLoading">{{ isDraft
                                    ? `Save as Draft` :
                                    `Save` }}</v-btn>
                            </div>
                        </div>
                    </v-col>
                    <v-col cols="12" xl="5" lg="5">
                        <div class="pa-3 text-overline text-center">
                            Sub-Tasks
                        </div>
                        <v-divider></v-divider>
                        <div class="pt-5" v-for="(data, index) in subTasks" :key="index">
                            <div class="text-center text-h6" style="font-size : 11px !important;">
                                SUB-TASK #{{ index + 1 }}
                                <v-btn variant="text" size="x-small" color="red" class="ml-2"
                                    @click="removeSubTask(index)">
                                    <v-icon>mdi-close</v-icon>
                                    REMOVE
                                </v-btn>
                            </div>
                            <v-divider width="50%" class="mx-auto my-2"></v-divider>
                            <div class="pa-3">
                                <v-row>
                                    <v-col cols="12" xl="6" lg="6">
                                        <!-- @vue-expect-error -->
                                        <v-text-field variant="underlined" rounded="0" v-model="data.title"
                                            :rules="rules.title" :disabled="isLoading">
                                            <template v-slot:label>
                                                TITLE : <span class="text-red">*</span>
                                            </template>
                                        </v-text-field>
                                    </v-col>
                                    <v-col cols="12" xl="6" lg="6">
                                        <!-- @vue-expect-error -->
                                        <v-select variant="underlined" :items="priority_menu" item-title="label"
                                            item-value="value" return-object :value-comparator="(a, b) => a === b"
                                            v-model="data.priority" :rules="rules.priority" :disabled="isLoading">
                                            <template v-slot:label>
                                                PRIORITY : <span class="text-red">*</span>
                                            </template>
                                        </v-select>
                                    </v-col>
                                    <v-col cols="12">
                                        <!-- @vue-expect-error -->
                                        <v-textarea variant="outlined" rounded="0" rows="2" auto-grow
                                            v-model="data.description" :rules="rules.description" :disabled="isLoading">
                                            <template v-slot:label>
                                                DESCRIPTION : <span class="text-red">*</span>
                                            </template>
                                        </v-textarea>
                                    </v-col>
                                </v-row>
                            </div>
                        </div>
                        <div class="pa-3">
                            <v-btn block color="primary" @click="addSubTask" :disabled="isLoading">ADD SUB-TASK</v-btn>
                        </div>
                    </v-col>
                </v-row>
            </v-form>
        </div>
    </NuxtLayout>
</template>

<script setup lang="ts">
import {
    priority_menu,
    addSubTask,
    removeSubTask,
    saveProcess,
    formRef,
    formValid,
    rules,
    isLoading,
    cancelCreation
} from '~/services/dashboard/tasks/create'
import { createTaskStore } from '~/store/tasks/create';
import { storeToRefs } from 'pinia'

const {
    isDraft,
    title,
    priority,
    description,
    attachments,
    subTasks
} = storeToRefs(createTaskStore())
useHead({
    title: "Create New Task"
})
</script>