import axios from "axios";

type TodoType = {
    id: string
    title: string
    addedDate: string
    order: number
}
//Generic
 type CommonResponseType<T = {}> = {
     resultCode: number
     messages: Array<string>
     data: T
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
        return instanse.post<CommonResponseType<{item: TodoType}>>('todo-lists', {title})

    },
    deleteTodo(todolistId: string) {
        return instanse.delete<CommonResponseType>(`todo-lists/${todolistId}`)
    },
    updateTodo(todolistId: string, title: string) {
        return instanse.put<CommonResponseType>(`todo-lists/${todolistId}`, {title})
    }
}