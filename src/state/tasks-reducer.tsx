import {FilterValuesType, TasksStateType, TodolistType} from "../App";


type ActionType = RemoveTaskActionType | AddTaskActionType

type RemoveTaskActionType = {
    type: 'REMOVE-TASK'
    todolistID: string
    taskId: string
}

type AddTaskActionType = {
    type: 'ADD-TODOLIST'
    title: string
}



export const tasksReducer = (state: TasksStateType, action: ActionType) => {
    switch (action.type) {
        case 'REMOVE-TASK':
            let copyState = state
            let todolistTasks = copyState[action.todolistID];
            copyState[action.todolistID] = todolistTasks.filter(t => t.id != action.taskId);
            return copyState
        case 'ADD-TODOLIST':
            return state

        default:
            throw new Error("I don't understand this type")
    }
}


export const removeTaskAC = (taskId: string ,todolistID: string): RemoveTaskActionType => {
    return {type: 'REMOVE-TASK',taskId: taskId, todolistID: todolistID }
}
export const AddTodoListAC = (title: string): AddTaskActionType => {
    return {type: 'ADD-TODOLIST', title: title }
}

