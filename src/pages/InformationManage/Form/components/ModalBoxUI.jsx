/*
 * @Author: huqirui 
 * @Date: 2020-06-20 19:44:50 
 * @Last Modified by: huqirui
 * @Last Modified time: 2020-06-20 20:01:30
 */
import { Button, Modal } from 'antd';
import React, { Component } from 'react';
import * as ModalBox from '../util/ModalBox';
import { message } from 'antd';
import * as ResetData from '../util/ResetData';
import store from '../store';
import request, { IP } from '../../../../utils/request';

/**
 * 模态框
 */
export default class ModalBoxUI extends Component {

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

    handleOk = () => {
        const url = IP + '/rest/supplier/addSupplier';

        const action = {
            type: 'confirmLoadingOpen',
            value: true,
            message: '正在提交，请稍后...'
        };
        store.dispatch(action);

        setTimeout(() => {
            request("POST", url, {
                "cmd": "addSupplier",
                "type": "request",
                "request": this.state.sformValue
            }).then(response => {
                if (response.response.data.res) {
                    message.success(response.response.data.message)
                } else {
                    message.info(response.response.data.exception)
                }
            }).catch(err => {
                alert(err + '网络异常')
            })

            ResetData.onReset();
            const action = {
                type: 'confirmLoadingClose',
                value: false
            };
            store.dispatch(action);
        }, 2000);
    };

    render() {

        // 模态框属性
        const { visible, confirmLoading, ModalText } = this.props.store;

        return (
            <div>
                <Modal
                    title="提交信息"
                    visible={visible}
                    onOk={this.handleOk}
                    confirmLoading={confirmLoading}
                    onCancel={ModalBox.handleCancel}
                    footer={[
                        <Button key="back" onClick={ModalBox.handleCancel}>
                            关闭
                            </Button>,
                        <Button key="submit" type="primary"
                            loading={confirmLoading}
                            onClick={this.handleOk}
                        >
                            提交
                            </Button>,
                    ]}
                >
                    <p>{ModalText}</p>
                </Modal>
            </div>
        )
    }
}
