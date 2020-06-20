import React, { Component } from 'react'
import { Button, Form, Input, message, Modal, Select, InputNumber } from 'antd';
import request, { IP } from '../../../../utils/request';
import * as ItemLayout from '../../../InformationManage/Form/components/ItemLayout';
import store from '../store';
import * as ResetData from './ResetData';

const { Option } = Select;

export default class ModalAdd extends Component {
    constructor(props) {
        super(props);
        this.state = store.getState();
        store.subscribe(this.storeChange);
    }
    // 订阅方法
    storeChange = () => {
        this.setState(store.getState())
    }


    handleCancel = () => {
        const action = {
            type: 'stockUpBack',
            value: false,
        };
        store.dispatch(action);
    }

    onFinish = (value) => {
        const url = IP + '/rest/stockUpBack/addStockUpBack';
        request("POST", url, {
            "cmd": "addStockUpBack",
            "type": "request",
            "request": {
                "commodityId":this.state.stockUpBackValue.commodityId,
                "stockUpBackNumber": value.stockUpBackNumber,
                "closeAccount": value.closeAccount,
                "account": localStorage.account,
                "operator": value.operator,
                "method": value.method
            }
        }).then(response => {
            if (response.response.data.res) {
                message.success(response.response.data.message);
                ResetData.findAllStock();
                this.handleCancel();
            } else {
                message.info(response.response.data.exception);
            }
        }).catch(err => {
            alert(err + '网络异常')
        })

    }

    sell = (value) =>{
        if(Object.keys(value)[0] === 'stockUpBackNumber' &&
            value[Object.keys(value)]>this.state.stockUpBackValue.stockNumber){
                message.error('退货数量不能大于库存数量')
        }
    }

    render() {


        return (
            <div>
                <Modal
                    title="修改信息"
                    visible={this.state.stockUpBack}
                    onCancel={this.handleCancel}
                    footer={null}
                >
                    <Form
                        {...ItemLayout.formItemLayout}
                        name="register"
                        onFinish={this.onFinish}
                        scrollToFirstError
                        onValuesChange = {this.sell}
                    >

                        <Form.Item
                            name="stockUpBackNumber"
                            label="退货数量"
                        >
                            <InputNumber  min={0} max={this.state.stockUpBackValue.stockNumber}/>
                        </Form.Item>

                        <Form.Item
                            name="closeAccount"
                            label="本次结账数额"
                            rules={[
                                {
                                    pattern: /^[^\s]*$/,
                                    message: '输入不合法，禁止输入空格',
                                },
                                {
                                    required: true,
                                    message: '请输入本次结账数额',
                                },
                            ]}
                        >
                            <Input allowClear />
                        </Form.Item>

                        <Form.Item
                            name="operator"
                            label="经手人"
                            rules={[
                                {
                                    pattern: /^[^\s]*$/,
                                    message: '输入不合法，禁止输入空格',
                                },
                                {
                                    required: true,
                                    message: '请输入经手人',
                                },
                            ]}
                        >
                            <Input allowClear />
                        </Form.Item>

                        <Form.Item
                            name="method"
                            label="支付方式"
                            rules={[
                                {
                                    pattern: /^[^\s]*$/,
                                    message: '输入不合法，禁止输入空格',
                                },
                                {
                                    required: true,
                                    message: '请选择支付方式',
                                },
                            ]}
                        >
                            <Select
                                placeholder="选择支付方式"
                                allowClear
                            >
                                <Option value="微信" key='微信'>微信</Option>
                                <Option value="支付宝" key='支付宝'>支付宝</Option>
                                <Option value="现金" key='现金'>现金</Option>
                            </Select>
                        </Form.Item>


                        <Form.Item {...ItemLayout.tailFormItemLayout}>
                            <Button type="primary" htmlType="submit">
                                提交
                        </Button>
                            <Button onClick={this.handleCancel} style={{ marginLeft: 20 }}>
                                关闭
                        </Button>
                        </Form.Item>
                    </Form>
                </Modal>
            </div>
        )
    }
}
