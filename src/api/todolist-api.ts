import axios from "axios";


type TodoType = {
    id: string
    title: string
    addedDate: string
    order: number
}
//Generic
type CommonResponseType<D = {}> = {
    resultCode: number
    messages: Array<string>
    data: D
}

export type TaskType = {
    description: string
    title: string
    status: number
    priority: number
    startDate: string
    deadline: string
    id: string
    todoListId: string
    order: number
    addedDate: string
}

type UpdateTaskModelType = {
    title: string
    description: string
    status: number
    priority: number
    startDate: string
    deadline: string
}

type GetTasksResponse = {
    error: string | null
    totalCount: number
    items: TaskType[]
}



const instanse = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true,
    headers: {
        'API-KEY': '5e5dd360-92d1-4f44-8e94-33caa0f21526'
    }
})

export const todolistApi = {
    getTodo() {
        return instanse.get<Array<TodoType>>('todo-lists')

    },
    createTodo(title: string) {
        return instanse.post<CommonResponseType<{ item: TodoType }>>('todo-lists', {title})

    },
    deleteTodo(todolistId: string) {
        return instanse.delete<CommonResponseType>(`todo-lists/${todolistId}`)
    },
    updateTodo(todolistId: string, title: string) {
        return instanse.put<CommonResponseType>(`todo-lists/${todolistId}`, {title})
    },
    getTasks(todolistId: string) {
        return instanse.get<GetTasksResponse>(`todo-lists/${todolistId}/tasks`)
    },
    createTask(todolistId: string, taskTitle: string) {
        return instanse.post<CommonResponseType<TaskType>>(`todo-lists/${todolistId}/tasks`, {title: taskTitle})
    },
    deleteTask(todolistId: string, taskId: string) {
        return instanse.delete<CommonResponseType>(`todo-lists/${todolistId}/tasks/${taskId}`)
    },
    updateTask(todolistId: string, taskId: string, model: UpdateTaskModelType) {
        return instanse.put<CommonResponseType>(`todo-lists/${todolistId}/tasks/${taskId}`, model)
    }
}