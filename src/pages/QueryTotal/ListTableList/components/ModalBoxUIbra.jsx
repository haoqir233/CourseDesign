import { Button, Modal } from 'antd';
import { Form, Input } from 'antd';
import React, { Component } from 'react';
import * as ItemLayout from '../../../InformationManage/Form/components/ItemLayout';
import * as ResetData from '../util/ResetDatabra';

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
                    key={datachange.commodityName}
                    initialValues={{
                        brandId:datachange.brandId,
                        commodityName:datachange.commodityName,
                        easyName:datachange.easyName,
                        supplierName:datachange.supplierName,
                        unit:datachange.unit,
                        spec:datachange.spec,
                        pack:datachange.pack,
                        place:datachange.place,
                        lotNumber:datachange.lotNumber,
                        approvalNumber:datachange.approvalNumber,
                        remark:datachange.remark,
                    }}
                    scrollToFirstError
                >
                    <Form.Item
                        name="brandId"
                        label="ID"
                    >
                        <Input allowClear  disabled />
                    </Form.Item>

                    <Form.Item
                        name="commodityName"
                        label="商品名称"
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
                        <Input allowClear />
                    </Form.Item>

                    <Form.Item
                        name="unit"
                        label="计量单位"
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
                        <Input allowClear placeholder="XXX市XXX路XX号" />
                    </Form.Item>

                    <Form.Item
                        name="spec"
                        label="规格"
                        rules={[
                            {
                                required: true,
                                message: '请输入规格',
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
                        name="pack"
                        label="包装"
                        rules={[
                            { 
                                pattern: /^[^\s]*$/,
                                message: '输入不合法，禁止输入空格',
                            },
                            {
                                required: true,
                                message: '请输入包装',
                            },
                            
                        ]}
                    >
                        <Input allowClear placeholder="例：0431-4976300" />
                    </Form.Item>

                    <Form.Item
                        name="place"
                        label="产地"
                        rules={[
                            {
                                required: true,
                                message: '请输入产地',
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
                        name="lotNumber"
                        label="批号"
                        rules={[
                            { 
                                pattern: /^[^\s]*$/,
                                message: '输入不合法，禁止输入空格',
                            },
                            {
                                required: true,
                                message: '请输入批号',
                            },
                        ]}
                    >
                        <Input allowClear placeholder="XXX@XX.com" />
                    </Form.Item>

                    <Form.Item
                        name="approvalNumber"
                        label="批准文号"
                        rules={[
                            {
                                required: true,
                                message: '批准文号为必填项'
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
