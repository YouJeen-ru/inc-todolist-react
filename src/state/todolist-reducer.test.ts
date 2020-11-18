import {
    AddTodoListAC,
    ChangeTodoListFilterAC,
    ChangeTodoListTitleAC,
    RemoveTodoListAC,
    todolistReducer
} from './todolist-reducer';
import {v1} from 'uuid';
import {FilterValuesType, TodolistType} from '../App';
import { tasksReducer} from "./tasks-reducer";

let todolistId1: string;
let todolistId2: string;
let startState: Array<TodolistType>

beforeEach(() => {
    todolistId1 = v1();
    todolistId2 = v1();
    startState = [
        {id: todolistId1, title: "What to learn", filter: "all"},
        {id: todolistId2, title: "What to buy", filter: "all"}
    ]
})

test('correct todolist should be removed', () => {

    const startStateTasks = {
    [todolistId1]: [],
    [todolistId2]: []
    }

    const action = RemoveTodoListAC(todolistId1)
    const endStateTodolists = todolistReducer(startState, action)
    const endStateTasks = tasksReducer(startStateTasks, action)
    const tasksId = Object.keys(endStateTasks)

    expect(endStateTodolists.length).toBe(1);
    expect(endStateTodolists[0].id).toBe(todolistId2);
    expect(tasksId.length).toBe(1);
});



test('correct todolist should be added', () => {
    let newTodolistTitle = "New Todolist";

    const startStateTasks = {
        [todolistId1]: [],
        [todolistId2]: []
    }
    const action = AddTodoListAC(newTodolistTitle)

    const endStateTodoList = todolistReducer(startState, action)
    const endStateTasks = tasksReducer(startStateTasks, action)

    const todolistId =  endStateTodoList[2].id
    const tasksId = Object.keys(endStateTasks)

    expect(endStateTodoList.length).toBe(3);
    expect(endStateTodoList[2].title).toBe(newTodolistTitle);
    expect(todolistId).toBe(tasksId[2])
});

test('correct todolist should change its name', () => {

    let newTodolistTitle = "New Todolist";

    const endState = todolistReducer(startState, ChangeTodoListTitleAC(todolistId2, newTodolistTitle));

    expect(endState[0].title).toBe("What to learn");
    expect(endState[1].title).toBe(newTodolistTitle);
});

test('correct filter of todolist should be changed', () => {


    let newFilter: FilterValuesType = "completed";

    const endState = todolistReducer(startState, ChangeTodoListFilterAC(todolistId2, newFilter));

    expect(endState[0].filter).toBe("all");
    expect(endState[1].filter).toBe(newFilter);
});





