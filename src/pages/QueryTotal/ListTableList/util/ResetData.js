/*
 * @Author: huqirui 
 * @Date: 2020-06-20 19:45:51 
 * @Last Modified by: huqirui
 * @Last Modified time: 2020-06-20 19:59:05
 */
import store from '../store/index';
import { message } from 'antd';
import request, { IP } from '../../../../utils/request';

/**
  * 提交的方法,接收表单内容，打开模态框并传递内容
  * @param values 所有的键值对
  */
export const onFinish = (values) => {
    const url = IP + '/rest/supplier/modifySupplier';
        request("POST", url, {
            "cmd": "modifySupplier",
            "type": "request",
            "request":values
        }).then(response => {
            if (response.response.data.res) {
                message.success(response.response.data.message);
            } else {
                message.info(response.response.data.exception);
            }
        }).catch(err => {
            alert(err + '网络异常')
        })


    const action = {
        type: 'confirmLoadingOpen',
        value: true,
    };
    store.dispatch(action);

    setTimeout(() => {
        message.success('提交成功');
        const action = {
            type: 'confirmLoadingClose',
            value: false
        };
        store.dispatch(action);
        window.location.href='/query/supplier'
    }, 1000);
};


/**
  * 打开模态框
  * @param values  表单提交的所有键值对
  */
export const showModal = (values) => {
    const action = {
        type: 'visibleChange',
        value: true,
        tabledata:values
    };
    store.dispatch(action);
};

//关闭模态框
export const handleCancel = () => {
    const action = {
        type: 'visibleChange',
        value: false,
        tabledata:''
    };
    store.dispatch(action);
};


