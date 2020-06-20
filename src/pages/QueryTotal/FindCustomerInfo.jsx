/*
 * @Author: huqirui 
 * @Date: 2020-06-20 19:45:29 
 * @Last Modified by:   huqirui 
 * @Last Modified time: 2020-06-20 19:45:29 
 */
import React, { Component } from 'react'
import ListTable from './ListTableList/CustomerTable';
import { Card } from 'antd';

export default class FindSupplierInifo extends Component {
    render() {
        return (
            <div>
                <Card title='客户信息展示'>
                   <ListTable /> 
                </Card>
            </div>
        )
    }
}