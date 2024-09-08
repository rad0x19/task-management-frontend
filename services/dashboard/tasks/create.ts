import { ref } from 'vue'
import { createTaskStore } from '~/store/tasks/create';
import { storeToRefs } from 'pinia';
import { useRouter } from '#app';

// types
type priorityType = {
    label: string;
    value: number | null;
}

type subTasksType = {
    title: string;
    priority: priorityType;
    description: string;
}

type formDataType = {
    isDraft : boolean;
    title: string;
    priority: priorityType;
    description: string;
    subTasks: subTasksType[]
}

// variables
export const formRef = ref(null)
export const formValid = ref(true)
export const priority_menu = [
    {
        label: 'Select a Priority',
        value: null
    },
    {
        label: 'Urgent',
        value: 1
    },
    {
        label: 'High',
        value: 2
    },
    {
        label: 'Medium',
        value: 3
    },
    {
        label: 'Low',
        value: 4
    }
];
export const rules = {
    title : [
        (v : any) => !!v || 'Title is a required field.'
    ],
    priority : [
        (v : any) => !!v || 'Priority is a required field.'
    ],
    description : [
        (v : any) => !!v || 'Description is a required field.'
    ]
};
export const isLoading = ref(false)

// functions
export const addSubTask = () => {
    const { subTasks } = storeToRefs(createTaskStore())
    // @ts-ignore
    subTasks.value.push({
        title: '',
        priority: {
            label: 'Select a Priority',
            value: null
        },
        description: ''
    })
}

export const removeSubTask = (index : number) => {
    const { subTasks } = storeToRefs(createTaskStore())
    subTasks.value.splice(index,1)
}

export const saveProcess = async () => {
    const {
        isDraft,
        title,
        priority,
        description,
        attachments,
        subTasks
    } = storeToRefs(createTaskStore())
    const { createAction }  = createTaskStore()
    // @ts-ignore
    await formRef.value?.validate()
    if(formValid.value){
        isLoading.value = true
        const datas = {
            isDraft:    isDraft.value,
            title:  title.value,
            priority:   priority.value,
            description:    description.value,
            attachments : attachments.value,
            subTasks:   subTasks.value
        }
        const formData = new FormData();
        Object.entries(datas).map((data) => {
            if(data[0] == 'subTasks'){
                Object.entries(data[1]).map((st) => {
                    Object.entries(st[1]).map((std) => {
                        if(std[0] == 'priority'){
                            // @ts-ignore
                            formData.append(`subTasks[${st[0]}][${std[0]}]`, std[1].value)
                        }else{
                            // @ts-ignore
                            formData.append(`subTasks[${st[0]}][${std[0]}]`, std[1])
                        }
                    })  
                })
            }else if (data[0] == 'attachments' && data[1] != null){
                Object.entries(data[1]).map((img) => {
                    // @ts-ignore
                    formData.append(`attachments[${img[0]}]`, img[1])
                })
            }else if(data[0] == 'priority'){
                // @ts-ignore
                formData.append(data[0], data[1].value)
            }else{
                // @ts-ignore
                formData.append(data[0], data[1])
            }
        })
        await createAction(formData).then(async ({ data }) => {
            // console.log(data)
            subTasks.value = []
            // @ts-ignore
            formRef.value?.reset()
            isDraft.value = false
            useRouter().push('/dashboard')
        }).catch(() => {}).finally(() => {
            isLoading.value = false
        })
    }
    
}

export const cancelCreation = async () => {
    const {
        subTasks
    } = storeToRefs(createTaskStore())
    subTasks.value = []
    // @ts-ignore
    formRef.value?.reset()
    useRouter().push('/dashboard')
}