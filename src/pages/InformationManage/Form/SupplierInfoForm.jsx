import { QuestionCircleOutlined } from '@ant-design/icons';
import { Button, Form, Input, Select, Tooltip } from 'antd';
import React, { Component } from 'react';
import store from './store';
import ModalBoxUI from './components/ModalBoxUI.jsx';
import * as ResetData from './util/ResetData.js';
import * as ItemLayout from './components/ItemLayout.jsx';

const { Option } = Select;


/**
 * 供应商信息登记表单
 */
export default class RegistrationForm extends Component {

    constructor(props) {
        super(props);
        this.state = store.getState();
        //订阅,如果redux的store发生改变，就更新视图
        store.subscribe(this.storeChange);
    }

    //订阅方法
    storeChange = () => {
        this.setState(store.getState())
    }


   
    render() {

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
                        prefix: '86',
                    }}
                    scrollToFirstError
                    onValuesChange={ResetData.cleanFormStatus}
                >

                    <Form.Item
                        name="supplierName"
                        label="供应商全称"
                        rules={[
                            {
                                required: true,
                                message: '请输入供应商全称',
                            },
                            { 
                                pattern: /^[^\s]*$/,
                                message: '输入不合法，禁止输入空格',
                            },
                        ]}
                    >
                        <Input allowClear placeholder="XXX公司" id="success" />
                    </Form.Item>

                    <Form.Item
                        name="easyName"
                        label={
                            <span>
                                简称&nbsp;
                                <Tooltip title="公司的简称是什么?">
                                    <QuestionCircleOutlined />
                                </Tooltip>
                            </span>
                        }
                        rules={[
                            {
                                required: true,
                                message: '请输入公司简称',
                                whitespace: true,
                            },
                        ]}
                    >
                        <Input allowClear />
                    </Form.Item>

                    <Form.Item
                        name="address"
                        label="公司地址"
                        rules={[
                            {
                                required: true,
                                message: '请输入公司地址',
                            },
                            { 
                                pattern: /^[^\s]*$/,
                                message: '输入不合法，禁止输入空格',
                            },
                        ]}
                    >
                        <Input allowClear placeholder="XXX市XXX路XX号" />
                    </Form.Item>

                    <Form.Item
                        name="postCode"
                        label="邮政编码"
                        rules={[
                            {
                                required: true,
                                message: '请输入邮政编码',
                            },
                            { 
                                pattern: /^[^\s]*$/,
                                message: '输入不合法，禁止输入空格',
                            },
                        ]}
                    >
                        <Input allowClear placeholder="例：130000" />
                    </Form.Item>

                    <Form.Item
                        name="phone"
                        label="电话"
                        rules={[
                            { 
                                pattern: /^[^\s]*$/,
                                message: '输入不合法，禁止输入空格',
                            },
                            {
                                required: true,
                                message: '请输入电话',
                            },
                            
                        ]}
                    >
                        <Input allowClear placeholder="例：0431-4976300" />
                    </Form.Item>

                    <Form.Item
                        name="fax"
                        label="传真"
                        rules={[
                            {
                                required: true,
                                message: '请输入传真号码',
                            },
                            { 
                                pattern: /^[^\s]*$/,
                                message: '输入不合法，禁止输入空格',
                            },
                        ]}
                    >
                        <Input allowClear placeholder="例：0431-4976301" />
                    </Form.Item>

                    <Form.Item
                        name="email"
                        label="E-mail"
                        rules={[
                            {
                                type: 'email',
                                message: '这不是一个有效的E-mail',
                            },
                            {
                                required: true,
                                message: '请输入你的E-mail',
                            },
                        ]}
                    >
                        <Input allowClear placeholder="XXX@XX.com" />
                    </Form.Item>

                    <Form.Item
                        name="contactName"
                        label="联系人"
                        rules={[
                            {
                                required: true,
                                message: '联系人为必填项'
                            },
                            { 
                                pattern: /^[^\s]*$/,
                                message: '输入不合法，禁止输入空格',
                            },
                        ]}
                    >
                        <Input allowClear style={{ width: 160 }} placeholder="Please input" />
                    </Form.Item>

                    <Form.Item
                        name="contactPhone"
                        label="联系人电话"
                        rules={[
                            {
                                required: true,
                                message: '请输入手机号',
                            },
                            { 
                                pattern: /^[^\s]*$/,
                                message: '输入不合法，禁止输入空格',
                            },
                        ]}
                    >
                        <Input
                            addonBefore={ItemLayout.prefixSelector}
                            style={{
                                width: '100%',
                            }}
                            allowClear
                        />
                    </Form.Item>

                    <Form.Item
                        name="bankName"
                        label="开户银行"
                        rules={[
                            {
                                required: true,
                                message: '开户银行不能为空'
                            },
                            { 
                                pattern: /^[^\s]*$/,
                                message: '输入不合法，禁止输入空格',
                            },
                        ]} >
                        <Select
                            placeholder="选择开户银行"
                            allowClear
                        >
                            <Option value="中国工商银行" key='gong'>中国工商银行</Option>
                            <Option value="中国农业银行" key='nong'>中国农业银行</Option>
                            <Option value="中国银行" key='guo'>中国银行</Option>
                            <Option value="中国银行" key='jian'>中国建设银行</Option>
                            <Option value="中国银行" key='jiao'>交通银行</Option>
                        </Select>
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
                            style={{ marginLeft: '15%' }}
                        >
                            重置表单
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        )
    }
}
