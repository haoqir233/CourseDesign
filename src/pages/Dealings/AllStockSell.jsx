/*
 * @Author: huqirui 
 * @Date: 2020-06-20 19:44:23 
 * @Last Modified by:   huqirui 
 * @Last Modified time: 2020-06-20 19:44:23 
 */
import React, { Component } from 'react';
import ListTable from './Table/ListTableSell';
import { Card } from 'antd';

export default class index extends Component {
    render() {
        return (
            <div>
                <Card title='商品销售信息展示'>
                   <ListTable /> 
                </Card>
            </div>
        )
    }
}