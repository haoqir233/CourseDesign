import React from 'react';
import store from '../store/index';
import * as ModalBox from './ModalBox';

/**
 * 引入React.createRef()方法
 */
export const formRef = React.createRef();

/**
  * 用于保存表单key
  * @constant formValue
  */
const formValue = [];


/**
  * 提交的方法,接收表单内容，打开模态框并传递内容
  * @param values 所有的键值对
  */
export const onFinish = (values) => {
    ModalBox.showModal(values);
    const action = {
        type:'sformValue',
        value:values
    }
    store.dispatch(action);
};

/**
 * 重置按扭
 */
export const onReset = () => {
    formRef.current.resetFields();
    formValue.length = 0;
    const action = {
        type: 'formStatusChange',
        value: true
    }
    store.dispatch(action)
};

/**
 * 重置按扭的状态
 * @param value 当前选中item的值
 */
export const cleanFormStatus = (value) => {
    if (!formValue.includes(Object.keys(value)[0])) {
        formValue.push(Object.keys(value)[0]);
    }
    if (value[Object.keys(value)] === "") {
        for (var i = 0; i < formValue.length; i++) {
            if (formValue[i] === Object.keys(value)[0]) {
                formValue.splice(i, 1);
            }
        }
    }
    if (formValue.length === 0) {
        const action = {
            type: 'formStatusChange',
            value: true
        }
        store.dispatch(action)
    } else {
        const action = {
            type: 'formStatusChange',
            value: false
        }
        store.dispatch(action)
    }
}


