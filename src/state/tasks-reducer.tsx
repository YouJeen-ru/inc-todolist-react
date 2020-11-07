import {FilterValuesType, TasksStateType, TodolistType} from "../App";
import {v1} from "uuid";


type ActionType = RemoveTaskActionType | AddTaskActionType

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


export const tasksReducer = (state: TasksStateType, action: ActionType) => {
    switch (action.type) {
        case 'REMOVE-TASK': {
            let copyState = state
            let todolistTasks = copyState[action.todolistID];
            copyState[action.todolistID] = todolistTasks.filter(t => t.id != action.taskId);
            return copyState
        }

        case 'ADD-TASK': {
            let copyState = state
            let todolistTasks = copyState[action.todolistID];
            let task = {id: v1(), title: action.title, isDone: false}
            todolistTasks = [task, ...todolistTasks]


            return {...copyState, [action.todolistID]: todolistTasks}


        }


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

