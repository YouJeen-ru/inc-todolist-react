import React, {ChangeEvent, useCallback} from 'react';
import {FilterValuesType} from './App';
import AddItemForm from "./AddItemForm";
import EditTableSpan from "./EditTableSpan";
import {Button, Checkbox, IconButton} from '@material-ui/core';
import {CheckBox, Delete} from "@material-ui/icons";
import {Task} from "./Task";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    id: string
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: string, todolistId: string) => void
    changeFilter: (value: FilterValuesType, todolistId: string) => void
    addTask: (title: string, todolistId: string) => void
    changeTaskStatus: (id: string, isDone: boolean, todolistId: string) => void
    removeTodolist: (id: string) => void
    filter: FilterValuesType
    changeTaskTitle: (id: string, title: string, todolistId: string) => void
    changeTodoListTitle: (todolistId: string, title: string) => void
}

export const  Todolist = React.memo((props: PropsType) => {

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
        tasksForTodolist = tasksForTodolist.filter(t => t.isDone === false);
    }
    if (props.filter === "completed") {
        tasksForTodolist = tasksForTodolist.filter(t => t.isDone === true);
    }

    return <div>
        <h3>
            <EditTableSpan value={props.title} changeValue={changeTodoListTitle}/>
            <IconButton onClick={removeTodolist}>
                <Delete/>
            </IconButton>
            {/*<button onClick={removeTodolist}>x</button>*/}
        </h3>
        <AddItemForm addItem={addTask}/>

        <ul style={{listStyle: 'none', paddingLeft: '0'}}>
            {
                tasksForTodolist.map(t => {
                    const onClickHandler = (taskId: string) => props.removeTask(taskId, props.id)

                    const onChangeHandler = (taskId: string, newIsDoneValue: boolean) => {
                        props.changeTaskStatus(taskId, newIsDoneValue, props.id);
                    }
                    const changeTaskTitle =(taskId: string, value: string) => {
                        props.changeTaskTitle(taskId, value, props.id)
                    }

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


