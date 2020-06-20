import { message } from 'antd';
import request, { IP } from '../../../../utils/request';
import store from '../store/index';

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

//获得所有的库存
export const findAllStock = () => {
    let mes = '';
    const url = IP + '/rest/stock/findAllStock';
        request("POST", url, {
            "cmd": "findAllStock",
            "type": "request"
        }).then(response => {
            if (response.response.data.res) {
                mes = response.response.data.data
                mes.map((item)=>{
                    item.key = item.commodityId
                    return true;
                })
                const action = {
                    type: 'findAllStock',
                    value: mes,
                };
                store.dispatch(action);
            } else {
                message.info(response.response.data.exception);
            }
        }).catch(err => {
            alert(err + '网络异常')
        })
}
