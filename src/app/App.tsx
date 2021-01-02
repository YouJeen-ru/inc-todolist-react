import React, {useCallback, useEffect} from "react";
import './App.css';
import {Menu} from "@material-ui/icons";
import {
    AppBar,
    Button,
    Container,
    IconButton,
    LinearProgress,
    Toolbar,
    Typography,
    CircularProgress
} from "@material-ui/core";
import {TaskType} from "../api/todolist-api";
import {TodolistsList} from "../features/TodolistsList/TodolistsList";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./store";
import {initializeAppTC, RequestStatusType} from "./app-reducer";
import {ErrorSnackbar} from "../components/ErrorSnackbar/ErrorSnackbar";
import {Login} from "../features/Login/Login";
import {Route, Switch, Redirect} from "react-router-dom";
import {logoutTC} from "../features/Login/auth-reducer";


export type TasksStateType = {
    [key: string]: Array<TaskType>
}


function App() {

    const isLoggedIn = useSelector<AppRootStateType, boolean>((state) => state.auth.isLoggedIn)
    const status = useSelector<AppRootStateType, RequestStatusType>((state) => state.app.status)
    const isInitialized = useSelector<AppRootStateType, boolean>((state) => state.app.isInitialized)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(initializeAppTC())
    }, [])

    const logoutHandler = useCallback(() => {
        dispatch(logoutTC())
    }, [])

    if (!isInitialized) {
        return <div
            style={{position: 'fixed', top: '30%', textAlign: 'center', width: '100%'}}>
            <CircularProgress/>
        </div>
    }


    return (
        <div className="App">
            <ErrorSnackbar/>
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6">
                        News
                    </Typography>
                    {isLoggedIn && <Button color="inherit" onClick={logoutHandler}>Log out</Button>}

                </Toolbar>
            </AppBar>
            {status === 'loading' && <LinearProgress color="secondary"/>}

            <Container fixed>

                <Switch>
                    <Route exact path={'/'} render={() => <TodolistsList/>}/>
                    <Route path={'/login'} render={() => <Login/>}/>
                    <Route path={'/404'} render={() => <h1 style={{textAlign: 'center'}}>404 Error</h1>}/>
                    <Redirect from={'*'} to={'/404'}/>
                </Switch>


            </Container>

        </div>
    );
}

export default App;
