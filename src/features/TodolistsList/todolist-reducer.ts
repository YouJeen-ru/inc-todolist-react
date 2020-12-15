import {todolistApi, TodolistType} from "../../api/todolist-api";
import {Dispatch} from "redux";
import {AppRootStateType} from "../../app/store";



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
    todolistApi.getTodo()
        .then((res) => {
            dispatch(setTodosAC(res.data))
        })
}

export const removeTodolistTC = (todolistId: string) => (dispatch: Dispatch<ActionType>) => {
        todolistApi.deleteTodo(todolistId)
            .then((res) => {
                dispatch(RemoveTodoListAC(todolistId))
            })
    }



export const addTodolistTC = (title: string) => (dispatch: Dispatch<ActionType>) => {
        todolistApi.createTodo(title)
            .then((res) => {
                dispatch(AddTodoListAC(res.data.data.item))
            })
    }



export const changeTodolistTitleTC = (todolistID: string, title: string) => (dispatch: Dispatch<ActionType>) => {
        todolistApi.updateTodo(todolistID, title)
            .then((res) => {
                dispatch(ChangeTodoListTitleAC(todolistID, title))
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

export type FilterValuesType = "all" | "active" | "completed";

export type TodolistDomainType = TodolistType & {
    filter: FilterValuesType
}
