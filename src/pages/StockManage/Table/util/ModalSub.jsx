/*
 * @Author: huqirui 
 * @Date: 2020-06-20 19:46:42 
 * @Last Modified by: huqirui
 * @Last Modified time: 2020-06-20 20:00:21
 */
import React, { Component } from 'react'
import { Button, Form, Input, message, Modal, Select,InputNumber } from 'antd';
import request, { IP } from '../../../../utils/request';
import * as ItemLayout from '../../../InformationManage/Form/components/ItemLayout';
import store from '../store';
import * as ResetData from './ResetData';

const { Option } = Select;

export default class ModalSub extends Component {
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
            type: 'addSell',
            value: false,
        };
        store.dispatch(action);
    }

    onFinish = (value) => {
        const url = IP + '/rest/sell/addSell';
        request("POST", url, {
            "cmd": "addSell",
            "type": "request",
            "request": {
                "commodityId":this.state.addSellValue.commodityId,
                "customerName": value.customerName,
                "sellNumber": value.sellNumber,
                "price": value.price,
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
        if(Object.keys(value)[0] === 'sellNumber' &&
            value[Object.keys(value)]>this.state.addSellValue.stockNumber){
                message.error('销售数量不能大于库存数量');
        }
        if(Object.keys(value)[0] === 'closeAccount' &&
            value[Object.keys(value)]>this.state.addSellValue.stockNumber*this.state.price){
                message.error('结账数额大于数量*单价')
        }
        if(Object.keys(value)[0] === 'price'){
            const action = {
                type: 'price',
                value: value[Object.keys(value)],
            };
            store.dispatch(action);
        }
    }
    

    render(){

        const { getAllCustomerName } = this.state;

        return (
            <div>
                <Modal
                    title="销售商品"
                    visible={this.state.addSell}
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
                            name="customerName"
                            label="客户全称"
                            rules={[
                                {
                                    pattern: /^[^\s]*$/,
                                    message: '输入不合法，禁止输入空格',
                                },
                                {
                                    required: true,
                                    message: '客户全称',
                                },
                            ]}
                        >
                            <Select
                                placeholder="选择客户"
                                allowClear
                            >
                                {
                                    getAllCustomerName.map((item, index) =>
                                        <Option value={item} key={index}>{item}</Option>
                                    )
                                }

                            </Select>
                        </Form.Item>

                        <Form.Item
                            name="sellNumber"
                            label="销售数量"
                        >
                            <InputNumber 
                                min={1}
                                max={this.state.addSellValue.stockNumber}
                            />
                        </Form.Item>

                        <Form.Item
                            name="price"
                            label="销售单价"
                        >
                            <InputNumber min={1}/>
                        </Form.Item>

                        <Form.Item
                            name="closeAccount"
                            label="本次结账数额"
                        >
                            {/* <InputNumber min={0} max={this.state.addSellValue.stockNumber*this.state.price}/> */}
                            <InputNumber min={0}/>
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
