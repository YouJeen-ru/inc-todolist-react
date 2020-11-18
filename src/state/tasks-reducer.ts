import {FilterValuesType, TasksStateType, TodolistType} from "../App";
import {v1} from "uuid";
import {AddTodoListActionType, RemoveTodoListActionType} from "./todolist-reducer";


type ActionType =
    RemoveTaskActionType
    | AddTaskActionType
    | ChangeTaskStatusActionType
    | ChangeTaskTitleActionType
    | AddTasksActionType
    | AddTodoListActionType
    | RemoveTodoListActionType

type RemoveTaskActionType = {
    type: 'REMOVE-TASK'
    todolistID: string
    taskId: string
}

type AddTaskActionType = {
    type: 'ADD-TASK'
    title: string
    todolistID: string
}
type ChangeTaskStatusActionType = {
    type: 'CHANGE-TASK-STATUS'
    todolistID: string
    isDone: boolean
    taskId: string
}
type ChangeTaskTitleActionType = {
    type: 'CHANGE-TASK-TITLE'
    todolistID: string
    taskId: string
    title: string
}
type AddTasksActionType = {
    type: 'ADD-TASKS'

}


export const tasksReducer = (state: TasksStateType, action: ActionType) => {
    switch (action.type) {
        case 'REMOVE-TASK': {
            let copyState = state
            let todolistTasks = copyState[action.todolistID];
            copyState[action.todolistID] = todolistTasks.filter(t => t.id != action.taskId);
            return {...copyState}
        }

        case 'ADD-TASK': {
            let copyState = state
            let todolistTasks = copyState[action.todolistID];
            let task = {id: v1(), title: action.title, isDone: false}
            todolistTasks = [task, ...todolistTasks]


            return {...copyState, [action.todolistID]: todolistTasks}


        }
        case "CHANGE-TASK-STATUS": {
            // let copyState = state
            // let todolistTasks = copyState[action.todolistID]
            //     .map(t => {
            //         if (t.id !== action.taskId) {
            //             return t
            //         } else {
            //             return {...t, isDone: action.isDone}
            //         }
            //     })
            return {
                ...state, [action.todolistID]: state[action.todolistID]
                    .map(t => {
                        if (t.id !== action.taskId) {
                            return t
                        } else {
                            return {...t, isDone: action.isDone}
                        }
                    })
            }
        }

        case "CHANGE-TASK-TITLE":
            return {
                ...state, [action.todolistID]: state[action.todolistID]
                    .map(t => {
                        if (t.id !== action.taskId) {
                            return t
                        } else {
                            return {...t, title: action.title}
                        }
                    })
            }
        case "ADD-TODOLIST": {
            return {
                ...state, [action.todolistId]: []
            }
        }
        case 'REMOVE-TODOLIST':
            let copyState = {...state}
            delete copyState[action.id]
            return copyState


        default:
            throw new Error("I don't understand this type")
    }
}


export const removeTaskAC = (taskId: string, todolistID: string): RemoveTaskActionType => {
    return {type: 'REMOVE-TASK', taskId: taskId, todolistID: todolistID}
}
export const addTaskAC = (title: string, todolistID: string): AddTaskActionType => {
    return {type: 'ADD-TASK', title: title, todolistID}
}

export const changeTaskStatusAC = (taskId: string, isDone: boolean, todolistID: string): ChangeTaskStatusActionType => {
    return {type: 'CHANGE-TASK-STATUS', taskId, isDone, todolistID}
}

export const changeTaskTitleAC = (taskId: string, title: string, todolistID: string): ChangeTaskTitleActionType => {
    return {type: 'CHANGE-TASK-TITLE', taskId, title, todolistID}
}
export const addTasksAC = (): AddTasksActionType => {
    return {type: 'ADD-TASKS'}
}
