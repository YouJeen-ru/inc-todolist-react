import axios from "axios";

export type LoginParamsType = {
    email: string
    password: string
    rememberMe: boolean
    captcha?: string
}

export type AuthMeType = {
    id: number
    email: string
    login: string
}

const instanse = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true,
    headers: {
        'API-KEY': '5e5dd360-92d1-4f44-8e94-33caa0f21526'
    }
})

export const authAPI = {
    login(data: LoginParamsType) {
        return instanse.post<CommonResponseType<{userId: number}>>('/auth/login', data)
    },
    me() {
        return instanse.get<CommonResponseType<AuthMeType>>('/auth/me')
    },
    logout() {
        return instanse.delete<CommonResponseType>('/auth/login')
    },
}


// api
export const todolistApi = {
    getTodo() {
        return instanse.get<Array<TodolistType>>('todo-lists')

    },
    createTodo(title: string) {
        return instanse.post<CommonResponseType<{ item: TodolistType }>>('todo-lists', {title})

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
        return instanse.post<CommonResponseType<{ item: TaskType}>>(`todo-lists/${todolistId}/tasks`, {title: taskTitle})
    },
    deleteTask(todolistId: string, taskId: string) {
        return instanse.delete<CommonResponseType>(`todo-lists/${todolistId}/tasks/${taskId}`)
    },
    updateTask(todolistId: string, taskId: string, model: UpdateTaskModelType) {
        return instanse.put<CommonResponseType>(`todo-lists/${todolistId}/tasks/${taskId}`, model)
    }
}

// types
export type TodolistType = {
    id: string
    title: string
    addedDate: string
    order: number
}

export enum TaskStatuses {
    New = 0,
    InProgress = 1,
    Completed = 2,
    Draft = 3
}
export enum TaskPriorities {
    Low = 0,
    Middle = 1,
    Hi = 2,
    Urgently = 3,
    Later = 4
}
export type TaskType = {
    description: string
    title: string
    status: TaskStatuses
    priority: TaskPriorities
    startDate: string
    deadline: string
    id: string
    todoListId: string
    order: number
    addedDate: string
}
export type UpdateTaskModelType = {
    title: string
    description: string
    status: number
    priority: number
    startDate: string
    deadline: string
}
export type GetTasksResponse = {
    error: string | null
    totalCount: number
    items: TaskType[]
}
//Generic
export type CommonResponseType<D = {}> = {
    resultCode: number
    messages: Array<string>
    fieldsErrors: Array<string>
    data: D
}