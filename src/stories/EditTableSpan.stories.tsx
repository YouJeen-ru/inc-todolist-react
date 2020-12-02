import React from 'react';
import EditTableSpan from "../EditTableSpan";
import {action} from "@storybook/addon-actions";


export default {
    title: 'EditTableSpan Stories',
    component: EditTableSpan,
}

export const EditableSpanFromBaseExample = (props: any) => {
    return <EditTableSpan value={'Start value'} changeValue={action('value changed')} />
}