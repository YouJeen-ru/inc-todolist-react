import React, {ChangeEvent, useState} from 'react';
import {TextField} from "@material-ui/core";
import {TaskStatuses} from "../../api/todolist-api";

type EditTableSpanPropsType = {
    value: string
    changeValue: (value: string) => void
    status?: TaskStatuses
}

const EditTableSpan = React.memo((props: EditTableSpanPropsType) => {
    console.log('EditTableSpan')
    let [editMode, setEditMode] = useState<boolean>(false)
    let [title, setTitle] = useState<string>(props.value)

    const activatedEditMode = () => {
        setEditMode(true)
    }
    const deActivatedEditMode = () => {
        setEditMode(false)
        props.changeValue(title)
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }


    return (
        editMode
            ? <TextField
                size={"small"}
                variant={"outlined"}
                value={title}
                onBlur={deActivatedEditMode}
                autoFocus={true}
                onChange={onChangeHandler}
            />
            // <input
            //     value={title}
            //     onBlur={deActivatedEditMode}
            //     autoFocus={true}
            //     onChange={onChangeHandler}
            // />
            : <span className={props.status === TaskStatuses.Completed ? "is-done": ''} onDoubleClick={activatedEditMode}>{props.value}</span>
    );
});

export default EditTableSpan;