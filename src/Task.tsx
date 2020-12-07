import React, {ChangeEvent} from 'react';
import {Checkbox, IconButton} from "@material-ui/core";
import EditTableSpan from "./EditTableSpan";
import {Delete} from "@material-ui/icons";
import {TaskStatuses, TaskType} from "./api/todolist-api";

export type PropsType = {
    task: TaskType
    onChangeHandler: (taskId: string, newIsDoneValue: boolean, status: TaskStatuses) => void
    changeTaskTitle: (taskId: string, value: string) => void
    onClickHandler: (taskId: string) => void

}

export const Task = React.memo((props: PropsType) => {
    const {task, onChangeHandler, changeTaskTitle, onClickHandler} = props

    const onClickHandlerDelete = () => onClickHandler(task.id)

    const onChangeStatus = (e: ChangeEvent<HTMLInputElement>) => {
        // @ts-ignore
        onChangeHandler(task.id, e.currentTarget.checked)
    }

    const onchangeTaskTitle = (value: string) => {
        changeTaskTitle(task.id, value)
    }


    return (<div key={task.id}>
            <Checkbox
                size={"small"}
                color={"primary"}
                onChange={onChangeStatus}
                checked={task.status === TaskStatuses.Completed}
            />
            {/*<input type="checkbox" onChange={onChangeHandler} checked={t.isDone}/>*/}
            <EditTableSpan status={task.status} value={task.title} changeValue={onchangeTaskTitle}/>
            <IconButton onClick={onClickHandlerDelete}>
                <Delete/>
            </IconButton>
            {/*<button onClick={onClickHandler}>x</button>*/}
        </div>
    )
});

