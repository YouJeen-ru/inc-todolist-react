import React, {useCallback, useEffect} from 'react';
import AddItemForm from "../../../components/AddItemForm/AddItemForm";
import EditTableSpan from "../../../components/EditTableSpan/EditTableSpan";
import {Button, IconButton} from '@material-ui/core';
import {Delete} from "@material-ui/icons";
import {Task} from "./Task/Task";
import {TaskStatuses, TaskType} from "../../../api/todolist-api";
import {FilterValuesType} from "../todolist-reducer";
import {useDispatch} from "react-redux";
import {fetchTasksTC} from "../tasks-reducer";
import {RequestStatusType} from "../../../app/app-reducer";


type PropsType = {
    id: string
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: string, todolistId: string) => void
    changeFilter: (value: FilterValuesType, todolistId: string) => void
    addTask: (title: string, todolistId: string) => void
    changeTaskStatus: (id: string, status: TaskStatuses, todolistId: string, ) => void
    removeTodolist: (id: string) => void
    filter: FilterValuesType
    changeTaskTitle: (id: string, title: string, todolistId: string) => void
    changeTodoListTitle: (todolistId: string, title: string) => void
    entityStatus: RequestStatusType
}

export const  Todolist = React.memo((props: PropsType) => {

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchTasksTC(props.id))
    }, [])

    const addTask = useCallback((title: string) => {
        props.addTask(title, props.id)

    }, [props.id, props.id, props])

    const changeTodoListTitle = useCallback((title: string) => {
        props.changeTodoListTitle(props.id, title)
    }, [props.id, props.changeTodoListTitle])

    const removeTodolist = useCallback(() => props.removeTodolist(props.id), [props.id, props.removeTodolist])

    const onAllClickHandler = useCallback(() => props.changeFilter("all", props.id), [props.id, props.changeFilter]);
    const onActiveClickHandler = useCallback(() => props.changeFilter("active", props.id), [props.id, props.changeFilter]);
    const onCompletedClickHandler = useCallback(() => props.changeFilter("completed", props.id), [props.id, props.changeFilter]);


    let tasksForTodolist: Array<TaskType> = props.tasks;

    if (props.filter === "active") {
        tasksForTodolist = tasksForTodolist.filter(t => t.status === TaskStatuses.New);
    }
    if (props.filter === "completed") {
        tasksForTodolist = tasksForTodolist.filter(t => t.status === TaskStatuses.Completed);
    }
    const onClickHandler = useCallback((taskId: string) => props.removeTask(taskId, props.id),[])

    const onChangeHandler = useCallback((taskId: string, newIsDoneValue: boolean) => {
        props.changeTaskStatus(taskId, newIsDoneValue ? TaskStatuses.Completed : TaskStatuses.New, props.id);
    },[])
    const changeTaskTitle = useCallback((taskId: string, value: string) => {
        props.changeTaskTitle(taskId, value, props.id)
    },[])

    return <div>
        <h3>
            <EditTableSpan value={props.title} changeValue={changeTodoListTitle}/>
            <IconButton onClick={removeTodolist} disabled={props.entityStatus === 'loading'}>
                <Delete/>
            </IconButton>
        </h3>
        <AddItemForm addItem={addTask} entityStatus={props.entityStatus}/>

        <ul style={{listStyle: 'none', paddingLeft: '0'}}>
            {
                tasksForTodolist.map(t => {

                    return <Task
                        key={t.id}
                        task={t}
                        onClickHandler={onClickHandler}
                        onChangeHandler={onChangeHandler}
                        changeTaskTitle={changeTaskTitle}

                    />
                })
            }
        </ul>
        <div>
            <Button color={props.filter === 'all' ? "primary" : "default"}
                size={"small"} variant={"contained"}
                    // className={props.filter === 'all' ? "active-filter" : ""}
                    onClick={onAllClickHandler}>All
            </Button>
            <Button color={props.filter === 'active' ? "primary" : "default"}
                size={"small"} variant={"contained"}
                    // className={props.filter === 'active' ? "active-filter" : ""}
                    onClick={onActiveClickHandler}>Active
            </Button>
            <Button color={props.filter === 'completed' ? "primary" : "default"}
                size={"small"} variant={"contained"}
                    // className={props.filter === 'completed' ? "active-filter" : ""}
                    onClick={onCompletedClickHandler}>Completed
            </Button>
        </div>
    </div>
})


