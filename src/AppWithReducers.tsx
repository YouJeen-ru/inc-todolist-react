import React, {useReducer} from 'react';
import './App.css';
import {Todolist} from './Todolist';
import {v1} from 'uuid';
import AddItemForm from "./AddItemForm";
import {Menu} from "@material-ui/icons";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {
    ChangeTodoListFilterAC,
    RemoveTodoListAC,
    todolistReducer,
    ChangeTodoListTitleAC,
    AddTodoListAC,
    FilterValuesType
} from "./state/todolist-reducer";
import {addTaskAC, removeTaskAC, tasksReducer, changeTaskStatusAC, changeTaskTitleAC} from './state/tasks-reducer';
import {TaskPriorities, TaskStatuses, TaskType} from "./api/todolist-api";



export type TasksStateType = {
    [key: string]: Array<TaskType>
}


function AppWithReducers() {

    let todolistId1 = v1();
    let todolistId2 = v1();

    let [todolists, dispatchTodolists] = useReducer(todolistReducer, [
        {id: todolistId1, title: "What to learn", filter: "all", addedDate: '', order: 0},
        {id: todolistId2, title: "What to buy", filter: "all", addedDate: '', order: 0}
    ] )


    let [tasks, dispatchTasks] = useReducer(tasksReducer,{
        [todolistId1]: [
            {id: v1(), title: "HTML&CSS",  status: TaskStatuses.Completed, todoListId: todolistId1,
        startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low, description:''},
            {id: v1(), title: "JS", status: TaskStatuses.Completed, todoListId: todolistId1,
                startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low, description:''},

        ],
        [todolistId2]: [
            {id: v1(), title: "Milk", status: TaskStatuses.Completed, todoListId: todolistId2,
                startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low, description:''},
            {id: v1(), title: "React Book", status: TaskStatuses.Completed, todoListId: todolistId2,
                startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low, description:''},

        ]
    });


    function removeTask(id: string, todolistId: string) {
        let action = removeTaskAC(id, todolistId)
            dispatchTasks(action)
    }

    function addTask(title: string, todolistId: string) {
        dispatchTasks(addTaskAC(
        {id: v1(), title: "HTML&CSS",  status: TaskStatuses.Completed, todoListId: todolistId1,
            startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low, description:''}
        ))
    }

    function changeStatus(id: string, status: TaskStatuses, todolistId: string) {
        dispatchTasks(changeTaskStatusAC(id, status, todolistId))
        }

    function changeTaskTitle(id: string, newTitle: string, todolistId: string) {
        dispatchTasks(changeTaskTitleAC(id, newTitle, todolistId))

    }

    function changeFilter(value: FilterValuesType, todolistId: string) {
        dispatchTodolists(ChangeTodoListFilterAC(todolistId, value))
    }

    function removeTodolist(id: string) {
        let action = RemoveTodoListAC(id)
        dispatchTodolists(action)
        dispatchTasks(action)
    }

    function addTodoList(title: string) {
        let action = AddTodoListAC(title)
        dispatchTodolists(action)
        dispatchTasks(action)

    }



    function changeTodoListTitle(todolistId: string, title: string) {
        dispatchTodolists(ChangeTodoListTitleAC(todolistId, title))


    }

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
                            let tasksForTodolist = allTodolistTasks;

                            if (tl.filter === "active") {
                                tasksForTodolist = allTodolistTasks.filter(t => t.status === TaskStatuses.New);
                            }
                            if (tl.filter === "completed") {
                                tasksForTodolist = allTodolistTasks.filter(t => t.status === TaskStatuses.Completed);
                            }

                            return (
                                <Grid item={true} key={tl.id}>
                                    <Paper elevation={3} style={{padding: "10px"}}>
                                    <Todolist
                                        id={tl.id}
                                        title={tl.title}
                                        tasks={tasksForTodolist}
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

export default AppWithReducers;
