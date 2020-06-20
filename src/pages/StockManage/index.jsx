/*
 * @Author: huqirui 
 * @Date: 2020-06-20 19:46:19 
 * @Last Modified by:   huqirui 
 * @Last Modified time: 2020-06-20 19:46:19 
 */
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
