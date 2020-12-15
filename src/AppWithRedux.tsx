import React, {useCallback, useEffect} from "react";
import './App.css';
import {Todolist} from './Todolist';
import AddItemForm from "./AddItemForm";
import {Menu} from "@material-ui/icons";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {
    ChangeTodoListFilterAC,
    RemoveTodoListAC,
    ChangeTodoListTitleAC,
    AddTodoListAC,
    TodolistDomainType, FilterValuesType, fetchTodolistThunk, removeTodolistTC, addTodolistTC
} from "./state/todolist-reducer";
import {
    addTaskAC,
    removeTaskAC,
    changeTaskStatusAC,
    changeTaskTitleAC,
    removeTaskTC,
    addTaskTC, updateTaskStatusTC
} from './state/tasks-reducer';
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./state/store";
import {TaskStatuses, TaskType, todolistApi} from "./api/todolist-api";


export type TasksStateType = {
    [key: string]: Array<TaskType>
}


function AppWithRedux() {

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchTodolistThunk)
    }, [])

    let todolists = useSelector<AppRootStateType, Array<TodolistDomainType>>(state => state.todolists)
    let tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasks)


    const removeTask = useCallback((id: string, todolistId: string) => {
        dispatch(removeTaskTC(todolistId, id))
    }, [dispatch])

    const addTask = useCallback((title: string, todolistId: string) => {
        dispatch(addTaskTC(todolistId, title))
    }, [dispatch])

    const changeStatus = useCallback((id: string, status: TaskStatuses, todolistId: string) => {
        dispatch(updateTaskStatusTC(id, todolistId, status))
    }, [dispatch])

    const changeTaskTitle = useCallback((id: string, newTitle: string, todolistId: string) => {
        dispatch(changeTaskTitleAC(id, newTitle, todolistId))

    }, [dispatch])

    const changeFilter = useCallback((value: FilterValuesType, todolistId: string) => {
        dispatch(ChangeTodoListFilterAC(todolistId, value))
    }, [dispatch])

    const removeTodolist = useCallback((id: string) => {
        dispatch(removeTodolistTC(id))
    }, [dispatch])

    const addTodoList = useCallback((title: string) => {
        dispatch(addTodolistTC(title))

    }, [dispatch])

    const changeTodoListTitle = useCallback((todolistId: string, title: string) => {
        dispatch(ChangeTodoListTitleAC(todolistId, title))


    }, [dispatch])

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
