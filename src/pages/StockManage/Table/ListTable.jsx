/*
 * @Author: huqirui 
 * @Date: 2020-06-20 19:46:27 
 * @Last Modified by:   huqirui 
 * @Last Modified time: 2020-06-20 19:46:27 
 */
import React, { Component } from 'react'
import { Table, Input, Button, Space, Popconfirm ,message} from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import Highlighter from 'react-highlight-words';
import request, { IP } from '../../../utils/request';
import * as ResetData from './util/ResetData';
import ModalBoxUI from './util/ModalBoxUI';
import store from './store';
import ModalAdd from './util/ModalAdd';
import ModalSub from './util/ModalSub';
import ModalBack from './util/ModalBack';

export default class ListTable extends Component {
    constructor(props) {
        super(props);
        this.state = store.getState();
        store.subscribe(this.storeChange);
    }
    // 订阅方法
    storeChange = () => {
        this.setState(store.getState())
    }

    /**
     * 所有商品名称
     */
    AllCommodityName = () =>{
        const url = IP + '/rest/brand/getAllCommodityName';
        request("POST", url, {
            "cmd": "getAllCommodityName",
            "type": "request"
        }).then(response => {
            if (response.response.data.res) {
                const action = {
                    type: 'allCommodityName',
                    value: response.response.data.data,
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
     * 所有客户全称
     */
    AllCustomerName = () =>{
        const url = IP + '/rest/customer/getAllCustomerName';
        request("POST", url, {
            "cmd": "getAllCustomerName",
            "type": "request"
        }).then(response => {
            if (response.response.data.res) {
                const action = {
                    type: 'getAllCustomerName',
                    value: response.response.data.data,
                };
                store.dispatch(action);
            } else {
                message.info(response.response.data.exception);
            }
        }).catch(err => {
            alert(err + '网络异常')
        })
    }

    componentDidMount(){
        this.AllCommodityName();
        this.AllCustomerName();
        ResetData.findAllStock();
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

    addStock = () =>{
        const action = {
            type: 'addStock',
            value: true,
        };
        store.dispatch(action);
    }


    addSell = (value)=>{
        this.addSellValue(value);
        const action = {
            type: 'addSell',
            value: true,
        };
        store.dispatch(action);
    }

    addSellValue = (value) =>{
        const action = {
            type: 'addSellValue',
            value: value,
        };
        store.dispatch(action);
    }

    //退货
    stockUpBack = (value) =>{
        this.stockUpBackValue(value);
        const action = {
            type: 'stockUpBack',
            value: true,
        };
        store.dispatch(action);
    }

    stockUpBackValue = (value) =>{
        const action = {
            type: 'stockUpBackValue',
            value: value,
        };
        store.dispatch(action);
    }



    render() {
        
        //定义表头，一般放在render()中
        const columns = [
            {
                title: '商品库存编号',
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
                title: '产地',
                dataIndex: 'place',
                key: 'place',
                width: 150,
                ...this.getColumnSearchProps('place'),
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
                title: '商品单价',
                dataIndex: 'price',
                key: 'price',
                ...this.getColumnSearchProps('price'),
            },
            {
                title: '库存数量',
                dataIndex: 'stockNumber',
                key: 'stockNumber',
                ...this.getColumnSearchProps('stockNumber'),
            },
            {
                title: '库存金额',
                dataIndex: 'amount',
                key: 'amount',
                ...this.getColumnSearchProps('amount'),
            },
            {
                title: '修改单价',
                dataIndex: 'operation',
                fixed: 'right',
                width: 100,
                render: (text, record) =>
                    this.state.findAllStock.length >= 1 ? (
                        <Popconfirm
                            title="确定要修改吗?"
                            okText="确定"
                            cancelText="取消"
                            onConfirm={() => ResetData.showModal(record)}
                        >
                            <Button type='primary'>修改</Button>
                        </Popconfirm>
                    ) : null,
            },
            {
                title: '销售',
                dataIndex: 'operation',
                fixed: 'right',
                width: 100,
                render: (text, record) =>
                    this.state.findAllStock.length >= 1 ? (
                        <Popconfirm
                            title="确定要销售吗?"
                            okText="确定"
                            cancelText="取消"
                            onConfirm={() => this.addSell(record)}
                        >
                            <Button type='primary'>销售</Button>
                        </Popconfirm>
                    ) : null,
            },
            {
                title: '退货',
                dataIndex: 'operation',
                fixed: 'right',
                width: 100,
                render: (text, record) =>
                    this.state.findAllStock.length >= 1 ? (
                        <Popconfirm
                            title="确定要退货吗?"
                            okText="确定"
                            cancelText="取消"
                            onConfirm={() => this.stockUpBack(record)}
                        >
                            <Button type='primary'>退货</Button>
                        </Popconfirm>
                    ) : null,
            },
        ];

        return (
            <div>
                <Button onClick={this.addStock} type="primary">入库</Button>
                <ModalAdd />
                <ModalSub />
                <ModalBack />
                <ModalBoxUI store={this.state}/>
                <br />
                <Table
                    columns={columns}
                    dataSource={this.state.findAllStock}
                    bordered
                    scroll={{ x: 1600 }}
                />
            </div>
        )
    }
}
