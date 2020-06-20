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
