import { QuestionCircleOutlined } from '@ant-design/icons';
import { Button, Form, Input, Select, Tooltip } from 'antd';
import React, { Component } from 'react';
import store from './store';
import ModalBoxUI from './components/ModalBoxUIbra';
import * as ResetData from './util/ResetData.js';
import * as ItemLayout from './components/ItemLayout';
import request, { IP } from '../../../utils/request';

const { Option } = Select;


export default class RegistrationForm extends Component {

    constructor(props) {
        super(props);
        this.state = store.getState();
        //订阅,如果redux的store发生改变，就更新视图
        store.subscribe(this.storeChange);
        this.state = {
            allSupplierName:[]
        }
    }
    //订阅方法
    storeChange = () => {
        this.setState(store.getState())
    }

    componentWillMount(){
        const url = IP + '/rest/supplier/getAllSupplierName';
        request("POST", url, {
            "cmd": "getAllSupplierName",
            "type": "request"
        }).then(response => {
            if (response.response.data.res) {
                this.setState({
                    allSupplierName:response.response.data.data
                })
            } else {
                alert(response.response.data.exception);
            }
        }).catch(err => {
            alert(err + '网络异常')
        })    
    }   
    
    render() {
        const {allSupplierName} = this.state

        return (
            <div>
                <ModalBoxUI store={this.state}/>
                {/* 表单 */}
                <Form
                    {...ItemLayout.formItemLayout}
                    // form={form}
                    ref={ResetData.formRef}
                    name="register"
                    onFinish={ResetData.onFinish}
                    initialValues={{
                        unit: '个',
                        spec: '1个/盒',
                        pack:'无'
                    }}
                    scrollToFirstError
                    onValuesChange={ResetData.cleanFormStatus}
                >

                    <Form.Item
                        name="commodityName"
                        label="商品名称"
                        rules={[
                            {
                                required: true,
                                message: '请输入商品全称',
                            },
                            { 
                                pattern: /^[^\s]*$/,
                                message: '输入不合法，禁止输入空格',
                            },
                        ]}
                    >
                        <Input allowClear />
                    </Form.Item>

                    <Form.Item
                        name="easyName"
                        label={
                            <span>
                                简称&nbsp;
                                <Tooltip title="商品的简称是什么?">
                                    <QuestionCircleOutlined />
                                </Tooltip>
                            </span>
                        }
                        rules={[
                            {
                                required: true,
                                message: '请输入商品简称',
                                whitespace: true,
                            },
                        ]}
                    >
                        <Input allowClear />
                    </Form.Item>

                    <Form.Item
                        name="place"
                        label="产地"
                        rules={[
                            {
                                required: true,
                                message: '请输入商品产地',
                            },
                            { 
                                pattern: /^[^\s]*$/,
                                message: '输入不合法，禁止输入空格',
                            },
                        ]}
                    >
                        <Input allowClear placeholder="XXX市" />
                    </Form.Item>

                    <Form.Item
                        name="unit"
                        label="单位"
                        rules={[
                            {
                                required: true,
                                message: '请输入计量单位',
                            },
                            { 
                                pattern: /^[^\s]*$/,
                                message: '输入不合法，禁止输入空格',
                            },
                        ]}
                    >
                        <Input allowClear placeholder="个" style={{ width: 160 }}/>
                    </Form.Item>

                   <Form.Item
                        name="spec"
                        label="规格"
                        rules={[
                            {
                                required: true,
                                message: '请输入商品规格',
                            },
                            { 
                                pattern: /^[^\s]*$/,
                                message: '输入不合法，禁止输入空格',
                            },
                        ]}
                    >
                        <Input allowClear placeholder="1个/盒" style={{ width: 160 }}/>
                    </Form.Item>

                    <Form.Item
                        name="pack"
                        label="包装"
                        rules={[
                            {
                                required: true,
                                message: '请输入商品包装',
                            },
                            { 
                                pattern: /^[^\s]*$/,
                                message: '输入不合法，禁止输入空格',
                            },
                        ]}
                    >
                        <Input allowClear placeholder="无" style={{ width: 160 }}/>
                    </Form.Item>

                    <Form.Item
                        name="lotNumber"
                        label="批号"
                        rules={[
                            {
                                required: true,
                                message: '请输入批号',
                            },
                            { 
                                pattern: /^[^\s]*$/,
                                message: '输入不合法，禁止输入空格',
                            },
                        ]}
                    >
                        <Input allowClear placeholder="101" />
                    </Form.Item>

                    <Form.Item
                        name="approvalNumber"
                        label="批准文号"
                        rules={[
                            {
                                required: true,
                                message: '请输入商品规格',
                            },
                            { 
                                pattern: /^[^\s]*$/,
                                message: '输入不合法，禁止输入空格',
                            },
                        ]}
                    >
                        <Input allowClear placeholder="220100" />
                    </Form.Item>
                    


                    <Form.Item
                        name="supplierName"
                        label="供应商全称"
                        rules={[
                            {
                                required: true,
                                message: '供应商全称不能为空'
                            }
                        ]} >
                        <Select
                            placeholder="选择供应商"
                            allowClear
                        >
                            {
                                allSupplierName.map((item,index)=>{
                                return(
                                <Option value={item} key={index}>{item}</Option>
                                )})
                            }
                        </Select>
                    </Form.Item>


                    <Form.Item
                        name="remark"
                        label="备注"
                        rules={[
                            {
                                required: true,
                                message: '请输入备注',
                            },
                            { 
                                pattern: /^[^\s]*$/,
                                message: '输入不合法，禁止输入空格',
                            },
                        ]}
                    >
                        <Input allowClear placeholder="水货" />
                    </Form.Item>
                    
                    <Form.Item {...ItemLayout.tailFormItemLayout}>
                        <Button type="primary" htmlType="submit">
                            提交信息
                        </Button>
                        <Button 
                            htmlType="button" 
                            onClick={ResetData.onReset}
                            disabled={this.state.formstatus}
                            danger
                            style={{marginLeft:45}}
                        >
                            重置表单
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        )
    }
}
