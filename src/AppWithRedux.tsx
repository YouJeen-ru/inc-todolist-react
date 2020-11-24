import React, {useCallback} from "react";
import './App.css';
import {TaskType, Todolist} from './Todolist';
import AddItemForm from "./AddItemForm";
import {Menu} from "@material-ui/icons";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {ChangeTodoListFilterAC, RemoveTodoListAC, ChangeTodoListTitleAC, AddTodoListAC} from "./state/todolist-reducer";
import {addTaskAC, removeTaskAC, changeTaskStatusAC, changeTaskTitleAC} from './state/tasks-reducer';
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./state/store";

export type FilterValuesType = "all" | "active" | "completed";

export type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}

export type TasksStateType = {
    [key: string]: Array<TaskType>
}


function AppWithRedux() {

    let todolists = useSelector<AppRootStateType, Array<TodolistType>>(state => state.todolists)
    let tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasks)
    let dispatch = useDispatch()


    const removeTask = useCallback((id: string, todolistId: string) => {
        let action = removeTaskAC(id, todolistId)
        dispatch(action)
    }, [])

    const addTask = useCallback((title: string, todolistId: string) => {
        dispatch(addTaskAC(title, todolistId))
    }, [])

    const changeStatus = useCallback((id: string, isDone: boolean, todolistId: string) => {
        dispatch(changeTaskStatusAC(id, isDone, todolistId))
    }, [])

    const changeTaskTitle = useCallback((id: string, newTitle: string, todolistId: string) => {
        dispatch(changeTaskTitleAC(id, newTitle, todolistId))

    }, [])

    const changeFilter = useCallback((value: FilterValuesType, todolistId: string) => {
        dispatch(ChangeTodoListFilterAC(todolistId, value))
    }, [])

    const removeTodolist = useCallback((id: string) => {
        let action = RemoveTodoListAC(id)
        dispatch(action)
    }, [])

    const addTodoList = useCallback((title: string) => {
        let action = AddTodoListAC(title)
        dispatch(action)

    }, [])

    const changeTodoListTitle = useCallback((todolistId: string, title: string) => {
        dispatch(ChangeTodoListTitleAC(todolistId, title))


    }, [])

    return (
        <div className="App">
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6">
                        News
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
            <Container fixed>
                <Grid container={true} style={{padding: "10px", marginBottom: "30px"}}>
                    <AddItemForm addItem={addTodoList}/>
                </Grid>

                <Grid container={true} spacing={6}>
                    {
                        todolists.map(tl => {

                            let allTodolistTasks = tasks[tl.id];

                            return (
                                <Grid item={true} key={tl.id}>
                                    <Paper elevation={3} style={{padding: "10px"}}>
                                        <Todolist
                                            id={tl.id}
                                            title={tl.title}
                                            tasks={allTodolistTasks}
                                            removeTask={removeTask}
                                            changeFilter={changeFilter}
                                            addTask={addTask}
                                            changeTaskStatus={changeStatus}
                                            filter={tl.filter}
                                            removeTodolist={removeTodolist}
                                            changeTaskTitle={changeTaskTitle}
                                            changeTodoListTitle={changeTodoListTitle}
                                        />
                                    </Paper>
                                </Grid>
                            )
                        })
                    }
                </Grid>
            </Container>

        </div>
    );
}

export default AppWithRedux;
