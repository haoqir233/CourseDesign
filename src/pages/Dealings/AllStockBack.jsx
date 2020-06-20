import React, { Component } from 'react';
import ListTable from './Table/ListTableBack';
import { Card } from 'antd';

export default class index extends Component {
    render() {
        return (
            <div>
                <Card title='商品退货信息展示'>
                   <ListTable /> 
                </Card>
            </div>
        )
    }
}