import React, {useEffect, useState} from 'react'

import {todolistApi} from "../api/todolist-api";
export default {
    title: 'API'
}


export const GetTodolists = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        todolistApi.getTodo().then((res) => {
            setState(res.data);
        } )
    }, [])

    return <div> {JSON.stringify(state)}</div>
}
export const CreateTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const title = "Redux"
        todolistApi.createTodo(title).then((res) => {
            setState(res.data.data.item)
        })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}
export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = '32e57b75-cbc6-483e-bcb5-83a04014845d'
       todolistApi.deleteTodo(todolistId).then((res) => {
            setState(res.data)
        })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}
export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = '33574dea-4102-400a-b01a-06513655f8dd'
        const title = 'CSS'
        todolistApi.updateTodo(todolistId, title).then((res) => {
            setState(res.data)
        })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}

export const GetTasks = () => {
    const [state, setState] = useState<any>(null)
    const [todolistId, setTodolistId] = useState<string>('')

    const getTasks = () => {
        todolistApi.getTasks(todolistId).then((res) => {
            setState(res.data);
        } )
    }
    return <div> {JSON.stringify(state)}
        <div>
            <input placeholder={'todolistId'} value={todolistId}
                   onChange={(e) => setTodolistId( e.currentTarget.value)}/>
            <button onClick={getTasks}>get tasks</button>
        </div>
    </div>
}
export const CreateTask = () => {
    const [state, setState] = useState<any>(null)
    const [taskTitle, setTaskTitle] = useState<string>('')
    const [todolistId, setTodolistId] = useState<string>('')
    const createTask = () => {
        todolistApi.createTask(todolistId, taskTitle).then((res) => {
            setState(res.data);
        } )
    }


    return <div> {JSON.stringify(state)}
        <div>
            <input placeholder={'todolistId'} value={todolistId}
                   onChange={(e) => setTodolistId( e.currentTarget.value)}/>
            <input placeholder={'Task Title'} value={taskTitle}
                   onChange={(e) => setTaskTitle( e.currentTarget.value)}/>
            <button onClick={createTask}>create task</button>
        </div>
    </div>
}
export const DeleteTask = () => {
    const [state, setState] = useState<any>(null)
    const [taskId, setTaskId] = useState<string>('')
    const [todolistId, setTodolistId] = useState<any>('')
    const deleteTask = () => {
        todolistApi.deleteTask(todolistId, taskId).then((res) => {
            setState(res.data);
        } )
    }



    return <div> {JSON.stringify(state)}
    <div>
        <input placeholder={'todolistId'}
               value={todolistId} onChange={(e) => setTodolistId( e.currentTarget.value)}/>
        <input placeholder={'taskId'}
               value={taskId} onChange={(e) => setTaskId( e.currentTarget.value)}/>
        <button onClick={deleteTask}>delete task</button>
    </div>
    </div>
}
export const UpdateTask = () => {
    const [state, setState] = useState<any>(null)
    const [title, setTitle] = useState<string>('title 1')
    const [description, setDescription] = useState<string>('description 1')
    const [status, setStatus] = useState<number>(0)
    const [priority, setPriority] = useState<number>(0)
    const [startDate, setStartDate] = useState<string>('')
    const [deadline, setDeadline] = useState<string>('')

    const [todolistId, setTodolistId] = useState<string>('')
    const [taskId, setTaskId] = useState<string>('')
    const updateTask = () => {
        todolistApi.updateTask(todolistId, taskId, {
            deadline: '',
            description: description,
            priority: priority,
            startDate: '',
            status: status,
            title: title
        }).then((res) => {
            setState(res.data);
        } )
    }

    return <div> {JSON.stringify(state)}
        <div>
            <input placeholder={'taskId'} value={taskId} onChange={(e) => setTaskId( e.currentTarget.value)}/>
            <input placeholder={'todolistId'} value={todolistId} onChange={(e) => setTodolistId( e.currentTarget.value)}/>
            <input placeholder={'Task Title'} value={title} onChange={(e) => setTitle( e.currentTarget.value)}/>
            <input placeholder={'Description'} value={description} onChange={(e) => setDescription( e.currentTarget.value)}/>
            <input placeholder={'status'} value={status} type='number' onChange={(e) => setStatus(+e.currentTarget.value)}/>
            <input placeholder={'priority'} value={priority} type='number' onChange={(e) => setPriority(+e.currentTarget.value)}/>
            <button onClick={updateTask}>update task</button>
        </div>
    </div>
}


