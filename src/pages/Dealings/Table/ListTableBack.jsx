/*
 * @Author: huqirui 
 * @Date: 2020-06-20 19:43:29 
 * @Last Modified by: huqirui
 * @Last Modified time: 2020-06-20 20:02:28
 */
import React, { Component } from 'react';
import request, { IP } from '../../../utils/request';
import { Table, Input, Button, Space, Popconfirm ,message,Modal,Form, InputNumber} from 'antd';
import Highlighter from 'react-highlight-words';
import { SearchOutlined } from '@ant-design/icons';
import * as ItemLayout from '../../InformationManage/Form/components/ItemLayout';

export default class ListTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataSource:[],
            visible:false,
            onFinishValue:''
        }
    }

    /**
     * 退货信息
     */
    componentWillMount(){
        let mes = '';
        const url = IP + '/rest/stockUpBack/findAllStockUpBack';
        request("POST", url, {
            "cmd": "findAllStockUpBack",
            "type": "request"
        }).then(response => {
            if (response.response.data.res) {
                mes = response.response.data.data;
                mes.map((item)=>{
                    item.key = item.stockUpBackId;
                    item.Flag = item.payFlag ? '已付清' : '未付清';
                    return true;
                })
                this.setState({
                    dataSource:mes
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

    showModal = (value) =>{
        this.setState({
            visible:true,
            onFinishValue:value
        })
    }

    handleCancel = () =>{
        this.setState({
            visible:false
        })
    }

    onFinish = (value) =>{
        const url = IP + '/rest/stockUpBackCloseAccount/addStockUpBackCloseAccount';
        request("POST", url, {
            "cmd": "addStockUpBackCloseAccount",
            "type": "request",
            "request":{
                'stockUpBackId':this.state.onFinishValue.stockUpBackId,
                'closeAccount':value.closeAccount,
                'account':localStorage.account,
                'operator':value.operator
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

    sell = (value) =>{
        if(Object.keys(value)[0] === 'closeAccount' &&
            value[Object.keys(value)]>this.state.onFinishValue.uncollected){
                message.error('收款金额不能大于未收金额')
        }
    }


    render() {

        //定义表头，一般放在render()中
        const columns = [
            {
                title: '商品退货编号',
                dataIndex: 'stockUpBackId',
                key: 'stockUpBackId',
                width: 150,
                fixed: 'left',
                ...this.getColumnSearchProps('stockUpBackId'),
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
                title: '供应商名称',
                dataIndex: 'supplierName',
                key: 'supplierName',
                width: 150,
                ...this.getColumnSearchProps('supplierName'),
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
                title: '退货时间',
                dataIndex: 'backTime',
                key: 'backTime',
                ...this.getColumnSearchProps('backTime'),
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
            }
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
                    scrollToFirstError
                    onValuesChange = {this.sell}
                >

                    <Form.Item
                        name="closeAccount"
                        label="本次结款数额"
                    >
                        <InputNumber min={0} max={this.state.onFinishValue.uncollected}/>
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
                        <Button onClick={this.handleCancel} style={{marginLeft:20}}>
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
