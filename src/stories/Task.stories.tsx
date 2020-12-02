import React from 'react';
import {action} from "@storybook/addon-actions";
import {Task} from "../Task";


export default {
    title: 'Task Stories',
    component: Task,
}
let onChangeHandler = action('Status changed inside Task')
let changeTaskTitle = action('Title changed inside Task')
let onClickHandler = action('Remove Button inside Task clicked')

export const TaskBaseExample = (props: any) => {
    return (
        <>
        <Task task={{id: "1", isDone: false, title: 'CSS' }}
              onChangeHandler={onChangeHandler}
              changeTaskTitle={changeTaskTitle}
              onClickHandler={onClickHandler}

              />

    <Task task={{id: "2", isDone: true, title: 'JS' }}
          onChangeHandler={onChangeHandler}
          changeTaskTitle={changeTaskTitle}
          onClickHandler={onClickHandler}

    />
    </>
    )
}