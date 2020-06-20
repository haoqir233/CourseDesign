import React from 'react';
import { Card } from 'antd';
import RegistrationForm from './Form/SupplierInfoForm';


export default class Message extends React.Component {

    render(){
        return(
            <div >
                <Card title='供应商信息登记'>
                    <RegistrationForm />
                </Card>
            </div>
        )
    }
}