import { Button, Modal } from 'antd';
import { Form, Input, Select} from 'antd';
import React, { Component } from 'react';
import * as ItemLayout from '../../../InformationManage/Form/components/ItemLayout';
import * as ResetData from '../util/ResetDatacus';
const { Option } = Select;

/**
 * 模态框
 */
export default class ModalBoxUI extends Component {

    render() {
        // 模态框属性
        const { visible, confirmLoading} = this.props.store;
        const {datachange} = this.props.store;
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
                    onFinish={ResetData.onFinish}
                    key={datachange.contactName}
                    initialValues={{
                        customerId:datachange.customerId,
                        contactName:datachange.contactName,
                        easyName:datachange.easyName,
                        address:datachange.address,
                        postCode:datachange.postCode,
                        phone:datachange.phone,
                        fax:datachange.fax,
                        email:datachange.email,
                        contactPhone:datachange.contactPhone,
                        bankName:datachange.bankName,
                        bankNumber:datachange.bankNumber,
                        customerName:datachange.customerName,
                    }}
                    scrollToFirstError
                >
                    <Form.Item
                        name="customerId"
                        label="ID"
                    >
                        <Input allowClear  disabled />
                    </Form.Item>

                    <Form.Item
                        name="customerName"
                        label="客户全称"
                        rules={[
                            {
                                required: true,
                                message: '请输入客户全称',
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
                        label="简称&nbsp;"
                        rules={[
                            {
                                required: true,
                                message: '请输入简称',
                                whitespace: true,
                            },
                        ]}
                    >
                        <Input allowClear />
                    </Form.Item>

                    <Form.Item
                        name="contactName"
                        label="联系人"
                        rules={[
                            {
                                required: true,
                                message: '请输入联系人',
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
                    <Form.Item
                        name="bankNumber"
                        label="银行账号"
                        rules={[
                            {
                                required: true,
                                message: '请输入银行账号',
                            },
                            { 
                                pattern: /^[^\s]*$/,
                                message: '输入不合法，禁止输入空格',
                            },
                        ]}
                    >
                        <Input
                            allowClear
                        />
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
