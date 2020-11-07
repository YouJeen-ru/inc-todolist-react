import {FilterValuesType, TodolistType} from "../App";
import {v1} from "uuid";


type ActionType = RemoveTodoListActionType | AddTodoListActionType | ChangeTitleActionType | ChangeFilterActionType

export type RemoveTodoListActionType = {
    type: 'REMOVE-TODOLIST'
    id: string
}

export type AddTodoListActionType = {
    type: 'ADD-TODOLIST'
    title: string
    todolistId: string
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


export const todolistReducer = (state: Array<TodolistType>, action: ActionType) => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':
            return state.filter(tl => tl.id !== action.id);
        case 'ADD-TODOLIST':
            const newTodoList: TodolistType = {
                id: action.todolistId,
                title: action.title,
                filter: "all"
            }
            return [...state, newTodoList]
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
            throw new Error("I don't understand this type")
    }
}


export const RemoveTodoListAC = (todolistID: string): RemoveTodoListActionType => {
    return {type: 'REMOVE-TODOLIST', id: todolistID }
}
export const AddTodoListAC = (title: string): AddTodoListActionType => {
    return {type: 'ADD-TODOLIST', title: title, todolistId: v1() }
}
export const ChangeTodoListTitleAC = (todolistID: string, title: string): ChangeTitleActionType => {
    return {type: 'CHANGE-TODOLIST-TITLE', id: todolistID, title: title }
}

export const ChangeTodoListFilterAC = (todolistID: string, filter: FilterValuesType): ChangeFilterActionType => {
    return {type: 'CHANGE-TODOLIST-FILTER', id: todolistID, filter: filter }
}