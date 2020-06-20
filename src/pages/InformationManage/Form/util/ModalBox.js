import store from '../store/index';
import * as ResetData from './ResetData';
import { message } from 'antd';

/**
  * 打开模态框
  * @param values  表单提交的所有键值对
  */
export const showModal = (values) => {
    console.log('Received values of form: ', values);
    const action = {
        type: 'visibleChange',
        value: true
    };
    store.dispatch(action);
};
//关闭模态框
export const handleCancel = () => {
    const action = {
        type: 'visibleChange',
        value: false
    };
    store.dispatch(action);
};
export const handleOk = () => {

    const action = {
        type: 'confirmLoadingOpen',
        value: true,
        message: '正在提交，请稍后...'
    };
    store.dispatch(action);

    setTimeout(() => {
        message.success('提交成功');
        ResetData.onReset();
        const action = {
            type: 'confirmLoadingClose',
            value: false
        };
        store.dispatch(action);
    }, 2000);
};