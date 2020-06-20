/*
 * @Author: huqirui 
 * @Date: 2020-06-20 19:45:43 
 * @Last Modified by: huqirui
 * @Last Modified time: 2020-06-20 19:59:40
 */
import React from 'react'
import { Table, Input, Button, Space, Popconfirm } from 'antd';
import Highlighter from 'react-highlight-words';
import { SearchOutlined } from '@ant-design/icons';
import ModalBoxUI from './components/ModalBoxUIcus.jsx';
import * as ResetData from './util/ResetData.js';
import store from './store';
import { message } from 'antd';
import request, { IP } from '../../../utils/request';


export default class ListTable extends React.Component {

    constructor(props) {
        super(props);

        this.state = store.getState();
        store.subscribe(this.storeChange);
    }
    //订阅方法
    storeChange = () => {
        this.setState(store.getState())
    }


    componentWillMount(){
        let mes = '';
        const url = IP + '/rest/customer/findAllCustomer';
        request("POST", url, {
            "cmd": "findAllCustomer",
            "type": "request",
        }).then(response => {
            
            if (response.response.data.res) {
                mes = response.response.data.data
                mes.map((item)=>{
                    item.key = item.bankNumber
                    return true;
                })
                const action = {
                    type: 'findAllCustomer',
                    value: mes,
                };
                store.dispatch(action);
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


    /**
     * 删除操作
     * filter 过滤器
     * 
     */
    handleDelete = record => {
        const url = IP + '/rest/customer/deleteCustomer';
        request("POST", url, {
            "cmd": "deleteCustomer",
            "type": "request",
            "request":{
               "customerName":record.customerName
            }
        }).then(response => {
            if (response.response.data.res) {
                message.success(response.response.data.message);
            } else {
                message.info(response.response.data.exception);
            }
        }).catch(err => {
            alert(err + '网络异常')
        })
        this.componentWillMount();
    };

    render() {

        //定义表头，一般放在render()中
        const columns = [
            {
                title: 'ID',
                dataIndex: 'customerId',
                key: 'customerId',
                width: 150,
                fixed: 'left',
                ...this.getColumnSearchProps('customerId'),
            },
            {
                title: '客户全称',
                dataIndex: 'customerName',
                key: 'customerName',
                width: 150,
                fixed: 'left',
                ...this.getColumnSearchProps('customerName'),
            },
            {
                title: '简称',
                dataIndex: 'easyName',
                key: 'easyName',
                ...this.getColumnSearchProps('easyName'),
            },
            {
                title: '地址',
                dataIndex: 'address',
                key: 'address',
                width: 200,
                ...this.getColumnSearchProps('address'),
            },
            {
                title: '邮政编码',
                dataIndex: 'postCode',
                key: 'postCode',
                ...this.getColumnSearchProps('postCode'),
            },
            {
                title: '电话',
                dataIndex: 'phone',
                key: 'phone',
                ...this.getColumnSearchProps('phone'),
            },
            {
                title: '传真',
                dataIndex: 'fax',
                key: 'fax',
                ...this.getColumnSearchProps('fax'),
            },
            {
                title: 'E-mail',
                dataIndex: 'email',
                key: 'email',
                ...this.getColumnSearchProps('email'),
            },
            {
                title: '联系人',
                dataIndex: 'contactName',
                key: 'contactName',
                ...this.getColumnSearchProps('contactName'),
            },
            {
                title: '联系人电话',
                dataIndex: 'contactPhone',
                key: 'contactPhone',
                ...this.getColumnSearchProps('contactPhone'),
            },
            {
                title: '开户银行',
                dataIndex: 'bankName',
                key: 'bankName',
                ...this.getColumnSearchProps('bankName'),
            },
            {
                title: '银行账号',
                dataIndex: 'bankNumber',
                key: 'bankNumber',
                ...this.getColumnSearchProps('bankNumber'),
            },
            
            {
                title: '删除',
                dataIndex: 'operation',
                fixed: 'right',
                width:100,
                render: (text, record) =>
                    this.state.dataSource.length >= 1 ? (
                            <Popconfirm
                                title="确定要删除吗?"
                                okText="确定"
                                cancelText="取消"
                                onConfirm={() => this.handleDelete(record)}
                            >
                                <Button danger>删除</Button>
                            </Popconfirm>
                    ) : null,
            },
            {
                title: '修改',
                dataIndex: 'operation',
                fixed: 'right',
                width: 100,
                render: (text, record) =>
                    this.state.dataSource.length >= 1 ? (
                        <Popconfirm
                            title="确定要修改吗?"
                            okText="确定"
                            cancelText="取消"
                            onConfirm={() => ResetData.showModal(record)}
                        >
                            <Button type='primary'>修改</Button>
                        </Popconfirm>
                    ) : null,
            }
        ];


        return (
            <div>
                <ModalBoxUI store={this.state}/>
                <Table
                    columns={columns}
                    dataSource={this.state.dataSource}
                    bordered
                    scroll={{ x: 2000 }}
                />
            </div>
        )
    }
}

