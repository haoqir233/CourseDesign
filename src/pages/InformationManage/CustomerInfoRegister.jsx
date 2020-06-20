import React from 'react';
import { Card } from 'antd';
import RegistrationForm from './Form/CustomerInfoForm';

export default class Message extends React.Component {

    render(){
        return(
            <div >
                <Card title='客户信息登记'>
                    <RegistrationForm />
                </Card>
            </div>
        )
    }
}