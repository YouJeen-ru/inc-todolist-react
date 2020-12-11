import {TasksStateType} from "../App";
import {v1} from "uuid";
import {AddTodoListActionType, GetTodosActionType, RemoveTodoListActionType} from "./todolist-reducer";
import {TaskPriorities, TaskStatuses, TaskType, todolistApi} from "../api/todolist-api";
import {Dispatch} from "redux";
import {AppRootStateType} from "./store";


type ActionType =
    RemoveTaskActionType
    | AddTaskActionType
    | ChangeTaskStatusActionType
    | ChangeTaskTitleActionType
    | AddTasksActionType
    | AddTodoListActionType
    | RemoveTodoListActionType
    | GetTodosActionType
|SetTasksActionType

type RemoveTaskActionType = {
    type: 'REMOVE-TASK'
    todolistID: string
    taskId: string
}

type AddTaskActionType = {
    type: 'ADD-TASK'
    task: TaskType
}
type ChangeTaskStatusActionType = {
    type: 'CHANGE-TASK-STATUS'
    todolistID: string
    status: TaskStatuses
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

let initialState: TasksStateType = {}


export const tasksReducer = (state = initialState, action: ActionType) => {
    switch (action.type) {
        case "SET-TASKS": {
            const stateCopy = {...state}
            stateCopy[action.todolistId] = action.tasks
            return stateCopy
            }


        case "SET-TODOLISTS": {
            const stateCopy = {...state}
            action.todos.forEach((tl) => {
                stateCopy[tl.id] = []
            })
            return stateCopy
        }

        case 'REMOVE-TASK': {
            let copyState = state
            let todolistTasks = copyState[action.todolistID];
            copyState[action.todolistID] = todolistTasks.filter(t => t.id != action.taskId);
            return {...copyState}
        }

        case 'ADD-TASK': {
            // let copyState = state
            // let todolistTasks = copyState[action.todolistID];
            // let task: TaskType = {
            //     id: v1(), title: action.title, status: TaskStatuses.New, todoListId: action.todolistID,
            //     startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low, description: ''
            // }
            // todolistTasks = [task, ...todolistTasks]
            //
            //
            const copyState = {...state}
            const tasks = copyState[action.task.todoListId]
            const newTasks = [action.task, ...tasks]
            copyState[action.task.todoListId] = newTasks
            return copyState




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
            return ({
                ...state, [action.todolistID]: state[action.todolistID]
                    .map(t => {
                        if (t.id !== action.taskId) {
                            return t
                        } else {
                            return {...t, status: action.status}
                        }
                    })
            })
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
            return state
    }
}


export const removeTaskAC = (taskId: string, todolistID: string): RemoveTaskActionType => {
    return {type: 'REMOVE-TASK', taskId: taskId, todolistID: todolistID}
}
export const addTaskAC = (task: TaskType): AddTaskActionType => {
    return {type: 'ADD-TASK', task}
}

export const changeTaskStatusAC = (taskId: string, status: TaskStatuses, todolistID: string): ChangeTaskStatusActionType => {
    return {type: 'CHANGE-TASK-STATUS', taskId, status, todolistID}
}

export const changeTaskTitleAC = (taskId: string, title: string, todolistID: string): ChangeTaskTitleActionType => {
    return {type: 'CHANGE-TASK-TITLE', taskId, title, todolistID}
}
export const addTasksAC = (): AddTasksActionType => {
    return {type: 'ADD-TASKS'}
}


export type SetTasksActionType = ReturnType<typeof setTasksAC>
export const setTasksAC = (tasks: Array<TaskType>, todolistId: string) => {
    return {type: 'SET-TASKS', tasks, todolistId} as const
}

//Thunk
export const fetchTasksTC = (todolistId: string) => (dispatch: Dispatch) => {
    todolistApi.getTasks(todolistId)
        .then((res) => {
            let tasks = res.data.items
            dispatch(setTasksAC(tasks, todolistId))
        })
}

export const removeTaskTC = (todolistId: string, id: string) => (dispatch: Dispatch) => {
    todolistApi.deleteTask(todolistId, id)
        .then((res) => {
            dispatch(removeTaskAC(id, todolistId))
        })
}
export const addTaskTC = (todolistId: string, taskTitle: string) => (dispatch: Dispatch) => {
    todolistApi.createTask(todolistId, taskTitle)
        .then((res) => {
            debugger
            // @ts-ignore
            let task = res.data.data.item
            dispatch(addTaskAC(task))
        })
}

export const updateTaskStatusTC = (taskId: string, todolistId: string, status: TaskStatuses) => {
    return (dispatch: Dispatch, getState: () => AppRootStateType) => {


        const tasks = getState().tasks[todolistId]
        const task = tasks.find(t => t.id === taskId)

        if (task) {
            todolistApi.updateTask(todolistId, taskId, {
                title: task.title,
                startDate: task.startDate,
                priority: task.priority,
                description: task.description,
                deadline: task.deadline,
                status: status
            }).then(() => {
                const action = changeTaskStatusAC(taskId, status, todolistId)
                dispatch(action)


            })
        }
    }
}


