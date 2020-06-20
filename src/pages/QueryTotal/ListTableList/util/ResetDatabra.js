import store from '../store/index';
import { message } from 'antd';
import request, { IP } from '../../../../utils/request';

/**
  * 提交的方法,接收表单内容，打开模态框并传递内容
  * @param values 所有的键值对
  */
export const onFinish = (values) => {
    console.log('f',values)
    const url = IP + '/rest/brand/modifyBrand';
        request("POST", url, {
            "cmd": "modifyBrand",
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
        const action = {
            type: 'confirmLoadingClose',
            value: false
        };
        store.dispatch(action);
        window.location.href='/query/brand';
    }, 1000);
};


/**
  * 打开模态框
  * @param values  表单提交的所有键值对
  */
export const showModal = (values) => {
    console.log('Received values of form: ', values);

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


