import {addTaskAC, removeTaskAC, tasksReducer, updateTaskAC} from './tasks-reducer';
import {TasksStateType} from '../App';
import {TaskPriorities, TaskStatuses} from "../api/todolist-api";

let startState: TasksStateType


beforeEach(() => {
    startState = {
        "todolistId1": [
            { id: "1", title: "CSS", status: TaskStatuses.New, todoListId: "todolistId1",
        startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low, description:'' },
            { id: "2", title: "JS", status: TaskStatuses.Completed, todoListId: "todolistId1",
                startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low, description:'' },
            { id: "3", title: "React", status: TaskStatuses.New, todoListId: "todolistId1",
                startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low, description:'' }
        ],
        "todolistId2": [
            { id: "1", title: "bread", status: TaskStatuses.New, todoListId: "todolistId1",
                startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low, description:''},
            { id: "2", title: "milk", status: TaskStatuses.Completed, todoListId: "todolistId1",
                startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low, description:'' },
            { id: "3", title: "tea", status: TaskStatuses.New, todoListId: "todolistId1",
                startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low, description:'' }
        ]
    };
})

test('correct task should be deleted from correct array', () => {


    const action = removeTaskAC("2", "todolistId2");

    const endState = tasksReducer(startState, action)

    expect(endState["todolistId1"].length).toBe(3);
    expect(endState["todolistId2"].length).toBe(2);
    expect(endState["todolistId2"].every(t => t.id != "2")).toBeTruthy();
});

test('correct task should be added to correct array', () => {


    const action = addTaskAC({
        todoListId: 'todolistId2',
        title: 'juce',
        status: TaskStatuses.New,
        addedDate: '',
        deadline: '',
        description: '',
        order: 0,
        priority: 0,
        startDate: '',
        id: 'id exists'
    });

    const endState = tasksReducer(startState, action)

    expect(endState["todolistId1"].length).toBe(3);
    expect(endState["todolistId2"].length).toBe(4);
    expect(endState["todolistId2"][0].id).toBeDefined();
    expect(endState["todolistId2"][0].title).toBe("juce");
    expect(endState["todolistId2"][0].status).toBe(TaskStatuses.New);
})

test('title of specified task should be changed', () => {


    const action = updateTaskAC("2", {status: TaskStatuses.New}, "todolistId2");

    const endState = tasksReducer(startState, action)

    expect(endState["todolistId1"][1].status).toBe(TaskStatuses.Completed);
    expect(endState["todolistId2"][1].status).toBe(TaskStatuses.New);
});


test('status of specified task should be changed', () => {

    const action = updateTaskAC("2", {title: 'apple'}, "todolistId2");

    const endState = tasksReducer(startState, action)

    expect(endState["todolistId1"].length).toBe(3);
    expect(endState["todolistId2"].length).toBe(3);
    expect(endState["todolistId2"][1].title).toBe('apple');
    expect(endState["todolistId1"][1].title).toBe('JS');
});


