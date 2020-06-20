import { Button, Form, Input, message, Modal } from 'antd';
import React, { Component } from 'react';
import request, { IP } from '../../../../utils/request';
import * as ItemLayout from '../../../InformationManage/Form/components/ItemLayout';
import store from '../store';
import * as ResetData from '../util/ResetData';


/**
 * 模态框
 */
export default class ModalBoxUI extends Component {

    constructor(props) {
        super(props);
        this.state = {
            findAllStock : []
        };
        this.state = store.getState();
        store.subscribe(this.storeChange);
    }
    // 订阅方法
    storeChange = () => {
        this.setState(store.getState())
    }


/**
  * 提交的方法,接收表单内容，打开模态框并传递内容
  * @param values 所有的键值对
  */
 onFinish = (values) => {
    console.log('f',values)
    const url = IP + '/rest/stock/modifyStock';
        request("POST", url, {
            "cmd": "modifyStock",
            "type": "request",
            "request":{
                'commodityName':this.state.datachange.commodityName,
                'commodityId':this.state.datachange.commodityId,
                'price':values.price
            }
        }).then(response => {
            if (response.response.data.res) {
                message.success(response.response.data.message);
                ResetData.findAllStock();
                ResetData.handleCancel();
            } else {
                message.info(response.response.data.exception);
            }
        }).catch(err => {
            alert(err + '网络异常')
        })
};


    render() {
        // 模态框属性
        const { visible, confirmLoading} = this.props.store;
        const { datachange} = this.props.store;
        
        return (
            <div>
                <Modal
                    title="修改信息"
                    visible={visible}
                    confirmLoading={confirmLoading}
                    onCancel={ResetData.handleCancel}
                    footer={null}
                >
                    <Form
                    {...ItemLayout.formItemLayout}
                    // form={form}
                    name="register"
                    onFinish={this.onFinish}
                    initialValues={{
                        price:datachange.price,
                    }}
                    scrollToFirstError
                >

                    <Form.Item
                        name="price"
                        label="商品单价"
                        rules={[
                            { 
                                pattern: /^[^\s]*$/,
                                message: '输入不合法，禁止输入空格',
                            },
                            {
                                required: true,
                                message: '请输入商品单价',
                            },
                        ]}
                    >
                        <Input allowClear />
                    </Form.Item>

                    <Form.Item {...ItemLayout.tailFormItemLayout}>
                        <Button type="primary" htmlType="submit">
                            提交
                        </Button>
                        <Button onClick={ResetData.handleCancel} style={{marginLeft:20}}>
                            关闭
                        </Button>
                    </Form.Item>
                </Form>
                </Modal>
            </div>
        )
    }
}
