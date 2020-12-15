import {v1} from "uuid";
import {todolistApi, TodolistType} from "../api/todolist-api";
import {Dispatch} from "redux";
import {AppRootStateType} from "./store";


type ActionType = RemoveTodoListActionType | AddTodoListActionType | ChangeTitleActionType | ChangeFilterActionType | GetTodosActionType

export type RemoveTodoListActionType = {
    type: 'REMOVE-TODOLIST'
    id: string
}

export type AddTodoListActionType = {
    type: 'ADD-TODOLIST'
    todolist: TodolistType
}

type ChangeTitleActionType = {
    type: 'CHANGE-TODOLIST-TITLE'
    id: string
    title: string
}

type ChangeFilterActionType = {
    type: 'CHANGE-TODOLIST-FILTER'
    id: string
    filter: FilterValuesType
}
export type FilterValuesType = "all" | "active" | "completed";

export type TodolistDomainType = TodolistType & {
    filter: FilterValuesType
}
let initialState: Array<TodolistDomainType> = []


export const todolistReducer = (state: Array<TodolistDomainType> = initialState, action: ActionType): Array<TodolistDomainType> => {
    switch (action.type) {
        case 'SET-TODOLISTS':
            return action.todos.map((tl) => {
                return {...tl, filter: 'all'}
            })

        case 'REMOVE-TODOLIST':
            return state.filter(tl => tl.id !== action.id);
        case 'ADD-TODOLIST':
            const newTodolist: TodolistDomainType = {...action.todolist, filter: "all"}
            return [newTodolist, ...state]
        case 'CHANGE-TODOLIST-TITLE':
            const todoList = state.find(tl => tl.id === action.id)
            if (todoList) {
                todoList.title = action.title
                return [...state]
            }
            return state

        case 'CHANGE-TODOLIST-FILTER':
            return state.map(tl => {
                if (tl.id === action.id) {
                    return {...tl, filter: action.filter}
                }
                return tl
            })


        default:
            return state
    }
}


export const RemoveTodoListAC = (todolistID: string): RemoveTodoListActionType => {
    return {type: 'REMOVE-TODOLIST', id: todolistID }
}
export const AddTodoListAC = (todolist: TodolistType): AddTodoListActionType => {
    return {type: 'ADD-TODOLIST', todolist}
}
export const ChangeTodoListTitleAC = (todolistID: string, title: string): ChangeTitleActionType => {
    return {type: 'CHANGE-TODOLIST-TITLE', id: todolistID, title: title }
}

export const ChangeTodoListFilterAC = (todolistID: string, filter: FilterValuesType): ChangeFilterActionType => {
    return {type: 'CHANGE-TODOLIST-FILTER', id: todolistID, filter: filter }
}

export const setTodosAC = (todos: Array<TodolistType>) => {
    return {type: 'SET-TODOLISTS', todos} as const
}
export type GetTodosActionType = ReturnType<typeof setTodosAC>

//Thunk

export const fetchTodolistThunk = (dispatch: Dispatch, getState: () => AppRootStateType ) => {
    todolistApi.getTodo()
        .then((res) => {
            dispatch(setTodosAC(res.data))
        })
}

export const removeTodolistTC = (todolistId: string) => {
    return (dispatch: Dispatch) => {
        todolistApi.deleteTodo(todolistId)
            .then((res) => {
                dispatch(RemoveTodoListAC(todolistId))
            })
    }

}

export const addTodolistTC = (title: string) => {
    return (dispatch: Dispatch) => {
        todolistApi.createTodo(title)
            .then((res) => {
                dispatch(AddTodoListAC(res.data.data.item))
            })
    }

}

