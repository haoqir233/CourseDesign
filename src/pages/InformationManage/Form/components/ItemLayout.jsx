/*
 * @Author: huqirui 
 * @Date: 2020-06-20 19:44:46 
 * @Last Modified by:   huqirui 
 * @Last Modified time: 2020-06-20 19:44:46 
 */
import { Form,Select} from 'antd';
import React from 'react';
const { Option } = Select;
/**
 * 控制表单的位置
 * @constant formItemLayout
 */
export const formItemLayout = {
    labelCol: {
        xs: {
            span: 24,
        },
        sm: {
            span: 8,
        },
    },
    wrapperCol: {
        xs: {
            span: 20,
        },
        sm: {
            span: 10,
        },
    },
};

/**
 * 电话开头
 * @constant prefixSelector
 */
export const prefixSelector = (
    <Form.Item name="prefix" noStyle>
        <Select
            style={{
                width: 70,
            }}
        >
            <Option value="86">+86</Option>
            <Option value="87">+87</Option>
        </Select>
    </Form.Item>
);

/**
 * 提交按钮的位置
 * @constant tailFormItemLayout
 */
export const tailFormItemLayout = {
    wrapperCol: {
        xs: {
            span: 24,
            offset: 0,
        },
        sm: {
            span: 16,
            offset: 10,
        },
    },
};