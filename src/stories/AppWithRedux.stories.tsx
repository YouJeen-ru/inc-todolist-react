import React from 'react';
import AppWithRedux from "../AppWithRedux";
import {ReduxStoreProviderDecorator} from "./decorators/ReduxStoreProviderDecorator";



export default {
    title: 'Todolists/AppWithRedux',
    component: AppWithRedux,
    decorators: [ReduxStoreProviderDecorator],
}

export const AppWithReduxFormExample = (props: any) => {
    return(
            <AppWithRedux />
        )
}