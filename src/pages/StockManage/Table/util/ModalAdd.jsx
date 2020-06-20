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
            type: 'addStock',
            value: false,
        };
        store.dispatch(action);
    }

    onFinish = (value) => {
        const url = IP + '/rest/stockUp/addStockUp';
        request("POST", url, {
            "cmd": "addStockUp",
            "type": "request",
            "request": {
                "commodityName": value.commodityName,
                "stockUpNumber": value.stockUpNumber,
                "price": value.price,
                "paid": value.paid,
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

    sell = (value) => {
        if (Object.keys(value)[0] === 'stockUpNumber') {
            const action = {
                type: 'stockUpNumber',
                value: value[Object.keys(value)],
            };
            store.dispatch(action);
        }
        if (Object.keys(value)[0] === 'price') {
            const action = {
                type: 'price',
                value: value[Object.keys(value)],
            };
            store.dispatch(action);
        }
        if (Object.keys(value)[0] === 'paid'&&  value[Object.keys(value)] > this.state.stockUpNumber * this.state.price ) {
            message.error('入库实付数额不能大于应付金额')
        }
    }

    render() {
        const { allCommodityName } = this.state

        return (
            <div>
                <Modal
                    title="修改信息"
                    visible={this.state.addstock}
                    onCancel={this.handleCancel}
                    footer={null}
                >
                    <Form
                        {...ItemLayout.formItemLayout}
                        name="register"
                        onFinish={this.onFinish}
                        scrollToFirstError
                        onValuesChange={this.sell}
                    >

                        <Form.Item
                            name="commodityName"
                            label="商品名称"
                            rules={[
                                {
                                    pattern: /^[^\s]*$/,
                                    message: '输入不合法，禁止输入空格',
                                },
                                {
                                    required: true,
                                    message: '请输入商品名称',
                                },
                            ]}
                        >
                            <Select
                                placeholder="选择商品名称"
                                allowClear
                            >
                                {
                                    allCommodityName.map((item, index) =>
                                        <Option value={item} key={index}>{item}</Option>
                                    )
                                }

                            </Select>
                        </Form.Item>

                        <Form.Item
                            name="stockUpNumber"
                            label="入库数量"
                            rules={[
                                {
                                    pattern: /^[^\s]*$/,
                                    message: '输入不合法，禁止输入空格',
                                },
                                {
                                    required: true,
                                    message: '请输入入库数量',
                                },
                            ]}
                        >
                            <Input allowClear />
                        </Form.Item>

                        <Form.Item
                            name="price"
                            label="入库单价"
                            rules={[
                                {
                                    pattern: /^[^\s]*$/,
                                    message: '输入不合法，禁止输入空格',
                                },
                                {
                                    required: true,
                                    message: '请输入入库单价',
                                },
                            ]}
                        >
                            <Input allowClear />
                        </Form.Item>
                        
                        <div style={{marginLeft:'19%',color:'black'}}>应付金额:&emsp;{this.state.stockUpNumber * this.state.price}</div>
                        <br />

                        <Form.Item
                            name="paid"
                            label="入库时实付数额"
                        >
                            <InputNumber min={0} max={this.state.stockUpNumber * this.state.price}/>
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
