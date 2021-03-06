/*
 * @Author: huqirui 
 * @Date: 2020-06-20 19:45:39 
 * @Last Modified by:   huqirui 
 * @Last Modified time: 2020-06-20 19:45:39 
 */
import React from 'react'
import { Table, Input, Button, Space, Popconfirm } from 'antd';
import Highlighter from 'react-highlight-words';
import { SearchOutlined } from '@ant-design/icons';
import ModalBoxUI from './components/ModalBoxUIbra.jsx';
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
        const url = IP + '/rest/brand/findAllBrand';
        request("POST", url, {
            "cmd": "findAllBrand",
            "type": "request",
        }).then(response => {
            if (response.response.data.res) {
                mes = response.response.data.data
                mes.map((item)=>{
                    item.key = item.brandId
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
        const url = IP + '/rest/brand/deleteBrand';
        request("POST", url, {
            "cmd": "deleteBrand",
            "type": "request",
            "request":{
               "commodityName":record.commodityName
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
                dataIndex: 'brandId',
                key: 'brandId',
                width: 150,
                fixed: 'left',
                ...this.getColumnSearchProps('brandId'),
            },
            {
                title: '商品名称',
                dataIndex: 'commodityName',
                key: 'commodityName',
                width: 150,
                fixed: 'left',
                ...this.getColumnSearchProps('commodityName'),
            },
            {
                title: '简称',
                dataIndex: 'easyName',
                key: 'easyName',
                ...this.getColumnSearchProps('easyName'),
            },
            {
                title: '供应商全称',
                dataIndex: 'supplierName',
                key: 'supplierName',
                width: 200,
                ...this.getColumnSearchProps('supplierName'),
            },
            {
                title: '计量单位',
                dataIndex: 'unit',
                key: 'unit',
                ...this.getColumnSearchProps('unit'),
            },
            {
                title: '规格',
                dataIndex: 'spec',
                key: 'spec',
                ...this.getColumnSearchProps('spec'),
            },
            {
                title: '包装',
                dataIndex: 'pack',
                key: 'pack',
                ...this.getColumnSearchProps('pack'),
            },
            {
                title: '产地',
                dataIndex: 'place',
                key: 'place',
                ...this.getColumnSearchProps('place'),
            },
            {
                title: '批号',
                dataIndex: 'lotNumber',
                key: 'lotNumber',
                ...this.getColumnSearchProps('lotNumber'),
            },
            {
                title: '批准文号',
                dataIndex: 'approvalNumber',
                key: 'approvalNumber',
                ...this.getColumnSearchProps('approvalNumber'),
            },
            {
                title: '备注',
                dataIndex: 'remark',
                key: 'remark',
                ...this.getColumnSearchProps('remark'),
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

