import { setAppErrorAC, setAppStatusAC,  } from '../app/app-reducer';
import { Dispatch } from 'redux';
import {setAppErrorActionType} from "../app/app-reducer";
import {setAppStatusActionType} from "../app/app-reducer";
import { CommonResponseType } from '../api/todolist-api';

// generic function
export const handleServerAppError = <D>(data: CommonResponseType<D>, dispatch: ErrorUtilsDispatchType) => {
    if (data.messages.length) {
        dispatch(setAppErrorAC(data.messages[0]))
    } else {
        dispatch(setAppErrorAC('Some error occurred'))
    }
    dispatch(setAppStatusAC('failed'))
}

export const handleServerNetworkError = (message: string, dispatch: ErrorUtilsDispatchType) => {
    dispatch(setAppErrorAC(message))
    dispatch(setAppStatusAC('failed'))
}

type ErrorUtilsDispatchType = Dispatch< setAppStatusActionType | setAppErrorActionType>