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