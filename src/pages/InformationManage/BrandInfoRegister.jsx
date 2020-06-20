import React from 'react';
import { Card } from 'antd';
import RegistrationForm from './Form/BrandInfoForm';

export default class Message extends React.Component {

    render(){
        return(
            <div>
                <Card title='商品信息登记'>
                    <RegistrationForm />
                </Card>
            </div>
        )
    }
}