import React, { Component } from 'react';
import ListTable from './Table/ListTable';
import { Card } from 'antd';

export default class index extends Component {
    render() {
        return (
            <div>
                <Card title='库存管理'>
                   <ListTable /> 
                </Card>
            </div>
        )
    }
}
