import {TasksStateType} from "../trash/App";
import {AddTodoListActionType, GetTodosActionType, RemoveTodoListActionType} from "./todolist-reducer";
import {TaskType, todolistApi, UpdateTaskModelType} from "../../api/todolist-api";
import {Dispatch} from "redux";
import {AppRootStateType} from "../../app/store";

let initialState: TasksStateType = {}

export const tasksReducer = (state = initialState, action: ActionType) => {
    switch (action.type) {
        case "SET-TASKS":
            return {...state, [action.todolistId]: action.tasks}

        case "SET-TODOLISTS": {
            const stateCopy = {...state}
            action.todos.forEach((tl) => {
                stateCopy[tl.id] = []
            })
            return stateCopy
        }

        case 'REMOVE-TASK': {
            return {
                ...state,
                [action.todolistID]: state[action.todolistID].filter(t => t.id != action.taskId)
            }
        }

        case 'ADD-TASK': {
            return {
                ...state,
            [action.task.todoListId]: [action.task, ...state[action.task.todoListId]]
            }
        }

        case "UPDATE-TASK": {
            return {
                ...state,
                [action.todolistID]: state[action.todolistID]
                    .map(t => t.id === action.taskId ? {...t, ...action.model} : t )
            }
        }
        case "ADD-TODOLIST": {
            return {...state, [action.todolist.id]: [] }
        }
        case 'REMOVE-TODOLIST':
            let copyState = {...state}
            delete copyState[action.id]
            return copyState

        default:
            return state
    }
}

// Actions
export const removeTaskAC = (taskId: string, todolistID: string) => {
    return {type: 'REMOVE-TASK', taskId, todolistID} as const
}
export const addTaskAC = (task: TaskType) => {
    return {type: 'ADD-TASK', task} as const
}
export const updateTaskAC = (taskId: string, model: UpdateDomainTaskModelType, todolistID: string) => {
    return {type: 'UPDATE-TASK', taskId, model, todolistID} as const
}
export const changeTaskTitleAC = (taskId: string, title: string, todolistID: string) => {
    return {type: 'CHANGE-TASK-TITLE', taskId, title, todolistID} as const
}
export const setTasksAC = (tasks: Array<TaskType>, todolistId: string) => {
    return {type: 'SET-TASKS', tasks, todolistId} as const
}

// Thunk
export const fetchTasksTC = (todolistId: string) => (dispatch: Dispatch<ActionType>) => {
    todolistApi.getTasks(todolistId)
        .then((res) => {
            let tasks = res.data.items
            dispatch(setTasksAC(tasks, todolistId))
        })
}

export const removeTaskTC = (todolistId: string, id: string) => (dispatch: Dispatch<ActionType>) => {
    todolistApi.deleteTask(todolistId, id)
        .then((res) => {
            dispatch(removeTaskAC(id, todolistId))
        })
}

export const addTaskTC = (todolistId: string, taskTitle: string) => (dispatch: Dispatch<ActionType>) => {
    todolistApi.createTask(todolistId, taskTitle)
        .then((res) => {
            let task = res.data.data.item
            dispatch(addTaskAC(task))
        })
}

export const updateTaskTC = (taskId: string, todolistId: string, domainModel: UpdateDomainTaskModelType) => {
    return (dispatch: Dispatch<ActionType>, getState: () => AppRootStateType) => {


        const tasks = getState().tasks[todolistId]
        const task = tasks.find(t => t.id === taskId)
        if (!task) {
            return
        }

        const apiModel: UpdateTaskModelType = {
            title: task.title,
            startDate: task.startDate,
            priority: task.priority,
            description: task.description,
            deadline: task.deadline,
            status: task.status,
            ...domainModel,
        }

        if (task) {
            todolistApi.updateTask(todolistId, taskId, apiModel ).then(() => {
                const action = updateTaskAC(taskId, domainModel, todolistId)
                dispatch(action)


            })
        }
    }
}


// types
type ActionType =
    | ReturnType<typeof removeTaskAC>
    | ReturnType<typeof addTaskAC>
    | ReturnType<typeof updateTaskAC>
    | AddTodoListActionType
    | RemoveTodoListActionType
    | GetTodosActionType
    | ReturnType<typeof setTasksAC>



export type UpdateDomainTaskModelType = {
    title?: string
    description?: string
    status?: number
    priority?: number
    startDate?: string
    deadline?: string
}
