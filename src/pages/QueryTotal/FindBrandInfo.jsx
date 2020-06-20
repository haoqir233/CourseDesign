/*
 * @Author: huqirui 
 * @Date: 2020-06-20 19:45:25 
 * @Last Modified by:   huqirui 
 * @Last Modified time: 2020-06-20 19:45:25 
 */
import React, { Component } from 'react'
import ListTable from './ListTableList/BrandInfo';
import { Card } from 'antd';

export default class FindSupplierInifo extends Component {
    render() {
        return (
            <div>
                <Card title='商品信息展示'>
                   <ListTable /> 
                </Card>
            </div>
        )
    }
}
