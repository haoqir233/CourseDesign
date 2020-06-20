/*
 * @Author: huqirui 
 * @Date: 2020-06-20 19:43:46 
 * @Last Modified by: huqirui
 * @Last Modified time: 2020-06-20 20:02:43
 */
import React, { Component } from 'react';
import request, { IP } from '../../../utils/request';
import { Table, Input, Button, Space, Popconfirm, message, Modal, Form, InputNumber } from 'antd';
import Highlighter from 'react-highlight-words';
import { SearchOutlined } from '@ant-design/icons';
import * as ItemLayout from '../../InformationManage/Form/components/ItemLayout';

export default class ListTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataSource: [],
            visible: false,
            onFinishValue: ''
        }
    }

    /**
     * 商品销售信息
     */
    componentWillMount() {
        let mes = '';
        const url = IP + '/rest/sell/findAllSell';
        request("POST", url, {
            "cmd": "findAllSell",
            "type": "request"
        }).then(response => {
            if (response.response.data.res) {
                mes = response.response.data.data;
                mes.map((item) => {
                    item.key = item.commodityId;
                    item.Flag = item.payFlag ? '已付清' : '未付清';
                    return true;
                })
                this.setState({
                    dataSource: mes
                })
            } else {
                message.info(response.response.data.exception);
            }
        }).catch(err => {
            alert(err + '网络异常')
        })
    }


    /**
     * 
     * @param {*} dataIndex 所有的数据
     */
    getColumnSearchProps = dataIndex => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
            <div style={{ padding: 8 }}>
                <Input
                    ref={node => {
                        this.searchInput = node;
                    }}
                    placeholder={`Search ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
                    style={{ width: 188, marginBottom: 8, display: 'block' }}
                />
                <Space>
                    <Button
                        type="primary"
                        onClick={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
                        icon={<SearchOutlined />}
                        size="small"
                        style={{ width: 90 }}
                    >
                        查找
              </Button>
                    <Button onClick={() => this.handleReset(clearFilters)} size="small" style={{ width: 90 }}>
                        重置
              </Button>
                </Space>
            </div>
        ),
        filterIcon: filtered => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
        onFilter: (value, record) =>
            record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
        onFilterDropdownVisibleChange: visible => {
            if (visible) {
                setTimeout(() => this.searchInput.select());
            }
        },
        render: text =>
            this.state.searchedColumn === dataIndex ? (
                <Highlighter
                    highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
                    searchWords={[this.state.searchText]}
                    autoEscape
                    textToHighlight={text.toString()}
                />
            ) : (
                    text
                ),
    });

    handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        this.setState({
            searchText: selectedKeys[0],
            searchedColumn: dataIndex,
        });
    };

    handleReset = clearFilters => {
        clearFilters();
        this.setState({ searchText: '' });
    };

    showModal = (value) => {
        this.setState({
            visible: true,
            onFinishValue: value
        })
    }

    handleCancel = () => {
        this.setState({
            visible: false
        })
    }

    onFinish = (value) => {
        const url = IP + '/rest/sellCloseAccount/addSellCloseAccount';
        request("POST", url, {
            "cmd": "addSellCloseAccount",
            "type": "request",
            "request": {
                'sellId': this.state.onFinishValue.sellId,
                'closeAccount': value.closeAccount,
                'account': localStorage.account,
                'operator': value.operator
            }
        }).then(response => {
            if (response.response.data.res) {
                message.success(response.response.data.message);
                this.componentWillMount();
                this.handleCancel();
            } else {
                message.info(response.response.data.exception);
            }
        }).catch(err => {
            alert(err + '网络异常')
        })
    }

    sell = (value) => {
        if (Object.keys(value)[0] === 'closeAccount' &&
            value[Object.keys(value)] > this.state.onFinishValue.uncollected) {
            message.error('收款金额不能大于未收金额')
        }
    }


    render() {

        //定义表头，一般放在render()中
        const columns = [
            {
                title: '销售编号',
                dataIndex: 'sellId',
                key: 'sellId',
                width: 150,
                fixed: 'left',
                ...this.getColumnSearchProps('sellId'),
            },
            {
                title: '库存商品编号',
                dataIndex: 'commodityId',
                key: 'commodityId',
                width: 150,
                fixed: 'left',
                ...this.getColumnSearchProps('commodityId'),
            },
            {
                title: '商品名称',
                dataIndex: 'commodityName',
                key: 'commodityName',
                ...this.getColumnSearchProps('commodityName'),
            },
            {
                title: '销售单价',
                dataIndex: 'price',
                key: 'price',
                ...this.getColumnSearchProps('price'),
            },
            {
                title: '销售数量',
                dataIndex: 'sellNumber',
                key: 'sellNumber',
                ...this.getColumnSearchProps('sellNumber'),
            },
            {
                title: '客户全称',
                dataIndex: 'customerName',
                key: 'customerName',
                ...this.getColumnSearchProps('customerName'),
            },
            {
                title: '是否付清',
                dataIndex: 'Flag',
                key: 'Flag',
                width: 150,
                ...this.getColumnSearchProps('Flag'),
            },
            {
                title: '应收',
                dataIndex: 'receivable',
                key: 'receivable',
                ...this.getColumnSearchProps('receivable'),
            },
            {
                title: '实收',
                dataIndex: 'receipt',
                key: 'receipt',
                ...this.getColumnSearchProps('receipt'),
            },
            {
                title: '未收',
                dataIndex: 'uncollected',
                key: 'uncollected',
                ...this.getColumnSearchProps('uncollected'),
            },
            {
                title: '销售时间',
                dataIndex: 'sellTime',
                key: 'sellTime',
                ...this.getColumnSearchProps('sellTime'),
            },
            {
                title: '操作员姓名',
                dataIndex: 'userName',
                key: 'userName',
                ...this.getColumnSearchProps('userName'),
            },
            {
                title: '支付方式',
                dataIndex: 'method',
                key: 'method',
                ...this.getColumnSearchProps('method'),
            },
            {
                title: '结清余额',
                dataIndex: 'operation',
                fixed: 'right',
                width: 100,
                render: (text, record) =>
                    this.state.dataSource.length >= 1 ? (
                        <Popconfirm
                            title="确定要结清余额吗?"
                            okText="确定"
                            cancelText="取消"
                            onConfirm={() => this.showModal(record)}
                            disabled={record.payFlag}
                        >
                            <Button
                                type='primary'
                                disabled={record.payFlag}
                            >收款</Button>
                        </Popconfirm>
                    ) : null,
            },
        ];
        return (
            <div>
                <Modal
                    title="结清余额"
                    visible={this.state.visible}
                    onCancel={this.handleCancel}
                    footer={null}
                >
                    <Form
                        {...ItemLayout.formItemLayout}
                        name="register"
                        onFinish={this.onFinish}
                        onValuesChange={this.sell}
                        scrollToFirstError
                    >

                        <Form.Item
                            name="closeAccount"
                            label="本次结款数额"
                        >
                            <InputNumber min={0} max={this.state.onFinishValue.uncollected} />
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


                <Table
                    columns={columns}
                    dataSource={this.state.dataSource}
                    bordered
                    scroll={{ x: 1600 }}
                />
            </div>
        )
    }
}
