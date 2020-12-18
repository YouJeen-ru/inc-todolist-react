import {todolistApi, TodolistType} from "../../api/todolist-api";
import {Dispatch} from "redux";
import {AppRootStateType} from "../../app/store";
import {setAppErrorAC, setAppErrorActionType, setAppStatusAC, setAppStatusActionType} from "../../app/app-reducer";
import {addTaskAC} from "./tasks-reducer";


let initialState: Array<TodolistDomainType> = []


export const todolistReducer = (state: Array<TodolistDomainType> = initialState, action: ActionType): Array<TodolistDomainType> => {
    switch (action.type) {
        case 'SET-TODOLISTS':
            return action.todos.map(tl => ({...tl, filter: 'all'}))
        case 'REMOVE-TODOLIST':
            return state.filter(tl => tl.id !== action.id);
        case 'ADD-TODOLIST':
            return [{...action.todolist, filter: "all"}, ...state]
        case 'CHANGE-TODOLIST-TITLE':
            return state.map(tl => tl.id === action.id ? {...tl, title: action.title} : tl)
        case 'CHANGE-TODOLIST-FILTER':
            return state.map(tl => tl.id === action.id ? {...tl, filter: action.filter} : tl)
        default:
            return state
    }
}
// Actions
export const RemoveTodoListAC = (todolistID: string) => {
    return {type: 'REMOVE-TODOLIST', id: todolistID} as const
}
export const AddTodoListAC = (todolist: TodolistType) => {
    return {type: 'ADD-TODOLIST', todolist} as const
}
export const ChangeTodoListTitleAC = (todolistID: string, title: string) => {
    return {type: 'CHANGE-TODOLIST-TITLE', id: todolistID, title: title} as const
}
export const ChangeTodoListFilterAC = (todolistID: string, filter: FilterValuesType) => {
    return {type: 'CHANGE-TODOLIST-FILTER', id: todolistID, filter: filter} as const
}
export const setTodosAC = (todos: Array<TodolistType>) => {
    return {type: 'SET-TODOLISTS', todos} as const
}


//Thunk

export const fetchTodolistThunk = (dispatch: Dispatch<ActionType>) => {
    dispatch(setAppStatusAC('loading'))
    todolistApi.getTodo()
        .then((res) => {
            dispatch(setTodosAC(res.data))
            dispatch(setAppStatusAC('succeeded'))
        })
}

export const removeTodolistTC = (todolistId: string) => (dispatch: Dispatch<ActionType>) => {
    dispatch(setAppStatusAC('loading'))
    todolistApi.deleteTodo(todolistId)
        .then((res) => {
            dispatch(RemoveTodoListAC(todolistId))
            dispatch(setAppStatusAC('succeeded'))
        })
}


export const addTodolistTC = (title: string) => (dispatch: Dispatch<ActionType>) => {
    dispatch(setAppStatusAC('loading'))
    todolistApi.createTodo(title)
        .then((res) => {
            if (res.data.resultCode === 0) {
                dispatch(AddTodoListAC(res.data.data.item))
            } else if (res.data.messages.length) {
                const error = res.data.messages[0]
                dispatch(setAppErrorAC(error))
            } else {
                dispatch(setAppErrorAC("Some Error"))
            }

            dispatch(setAppStatusAC('succeeded'))

        })
}


export const changeTodolistTitleTC = (todolistID: string, title: string) => (dispatch: Dispatch<ActionType>) => {
    dispatch(setAppStatusAC('loading'))
    todolistApi.updateTodo(todolistID, title)
        .then((res) => {
            dispatch(ChangeTodoListTitleAC(todolistID, title))
            dispatch(setAppStatusAC('succeeded'))
        })
}


// types

export type AddTodoListActionType = ReturnType<typeof AddTodoListAC>
export type GetTodosActionType = ReturnType<typeof setTodosAC>
export type RemoveTodoListActionType = ReturnType<typeof RemoveTodoListAC>


type ActionType =
    | RemoveTodoListActionType
    | AddTodoListActionType
    | ReturnType<typeof ChangeTodoListTitleAC>
    | ReturnType<typeof ChangeTodoListFilterAC>
    | GetTodosActionType
    | setAppStatusActionType
    | setAppErrorActionType

export type FilterValuesType = "all" | "active" | "completed";

export type TodolistDomainType = TodolistType & {
    filter: FilterValuesType
}
