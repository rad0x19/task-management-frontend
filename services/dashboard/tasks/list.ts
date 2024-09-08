import { ref } from 'vue'
import { useRouter } from '#app';
import { listTaskStore } from '~/store/tasks/list';

export const priority_label = {
    1 : {
        label : 'Urgent',
        color : 'red'
    },
    2 : {
        label : 'High',
        color : 'red-lighten-2'
    },
    3 : {
        label : 'Medium',
        color : 'orange'
    },
    4 : {
        label : 'Low',
        color : 'blue-grey'
    }
}

export const status_label = {
    1 : {
        label : 'To-Do',
        color : 'orange'
    },
    2 : {
        label : 'In-Progress',
        color : 'primary'
    },
    3 : {
        label : 'Done',
        color : 'green'
    }
}

export const sort_by_label = {
    priority_asc : {
        icon : "sort-ascending",
        label : "PRIORITY"
    },
    priority_desc : {
        icon : "sort-descending",
        label : "PRIORITY"
    },
    title_asc : {
        icon : "sort-alphabetical-ascending",
        label : "TITLE"
    },
    title_desc : {
        icon : "sort-alphabetical-descending",
        label : "TITLE"
    },
    date_asc : {
        icon : "sort-clock-ascending",
        label : "DATE"
    },
    date_desc : {
        icon : "sort-clock-descending",
        label : "DATE"
    }
}

export const display_by_label = {
    all : {
        icon : "format-list-bulleted",
        label : "ALL"
    },
    todo : {
        icon : "format-list-checks",
        label : "TO-DO"
    },
    inprogress : {
        icon : "progress-cloc",
        label : "IN-PROGRESS"
    },
    done : {
        icon : "check-circle-outline",
        label : "DONE"
    }
}

export const per_page_menu = [
    6, 9 , 12, 15, 18, 21
]

export const updateModalData = ref({
    dialog : false,
    attachments : []
})

export const subTasksModalData = ref({
    dialog : false,
    data : [],
    index : 0
})

export const mark_as_loading = ref(false)

export const listProcess = async () => {
    const { list, perPage, total, last_page } = storeToRefs(listTaskStore())
    const { listAction } = listTaskStore()
    await listAction().then(({data}) => {
        list.value = data.data
        perPage.value = data.per_page
        total.value = data.total
        last_page.value = data.last_page
    }).catch(() => {})
}

export const sort_by_func = async (sort : any) => {
    const { sort_by } = storeToRefs(listTaskStore())
    sort_by.value = sort
    await listProcess()
}

export const display_by_func = async (display_by : any) => {
    const { display } = storeToRefs(listTaskStore())
    display.value = display_by
    await listProcess()
}

export const UpdateModalFunc = async (callback : any) => {
    console.log("callback", callback)
    updateModalData.value.dialog = false
}

export const openAttachmentModal = async (attachments : any) => {
    updateModalData.value.attachments = attachments
    updateModalData.value.dialog = true
}

export const markAsFunction = async (status : any, id : any) => {
    mark_as_loading.value = true
    const { updateStatusAction } = listTaskStore()
    await updateStatusAction({
        id : id,
        status : status
    }).then(async ({ data }) => {
        console.log('data',data)
        await listProcess()
    }).catch(() => {}).finally(() => {
        mark_as_loading.value = false
    })
}

export const openSubTasksModal = async (subtasks : any, index : any) => {
    subTasksModalData.value.data = subtasks
    subTasksModalData.value.index = index
    subTasksModalData.value.dialog = true
}

export const UpdateSubTasksModal = async (callback : any) => {
    subTasksModalData.value.dialog = false
}

export const UpdateSubTasksModalNew = async ({ newList } : { newList : any }) => {
    subTasksModalData.value.data = newList
    subTasksModalData.value.dialog = false
    nextTick(() => {
        subTasksModalData.value.dialog = true
    })
}

export const searchByTitle = async () => {
    const { search_title } = storeToRefs(listTaskStore())
    console.log("triggered", search_title.value)
    await listProcess()
}

export default async () => {
    await listProcess()
}