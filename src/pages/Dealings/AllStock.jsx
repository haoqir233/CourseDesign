import React, { Component } from 'react';
import ListTable from './Table/ListTable';
import { Card } from 'antd';

export default class index extends Component {
    render() {
        return (
            <div>
                <Card title='商品入库信息展示'>
                   <ListTable /> 
                </Card>
            </div>
        )
    }
}