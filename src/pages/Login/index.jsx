import React from 'react';
import request, { IP } from '../../utils/request';
import './style.scss';
import { message } from 'antd';

export default class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            account: '',
            password: ''
        }
    }
    

    onChangeAccount = (e) => {
        this.setState({
            account: e.target.value
        })
    }
    onChangePassword = (e) => {
        this.setState({
            password: e.target.value
        })
    }

    handleBtnClick = () => {
        const url = IP + '/rest/user/login';
        if (this.state.account !== "" && this.state.password !== "") {
            request("POST", url, {
                "cmd": "login",
                "type": "request",
                "request": {
                    "account": this.state.account,
                    "password": this.state.password
                }
            }).then(response => {
                if (response.response.data.res) {
                    console.log(response);
                    message.success('用户' + response.response.data.userName + '登录成功!');
                    localStorage.userName = response.response.data.userName;
                    localStorage.account = this.state.account;
                    this.props.history.push('/info/supplier');

                } else {
                    message.error('用户' + this.state.account + '登录失败!' + response.response.data.exception);
                }

            }).catch(err => {
                alert(err + '网络异常')
            })
        } else if (this.state.account === "") {
            message.error('用户名不能为空')
        } else if (this.state.password === "") {
            message.error('密码不能为空')
        }
        document.getElementById('password').value = '';
    }

    render() {
        onkeydown = (e) => {
            if (e.keyCode === 13) {
                this.handleBtnClick();
            }
        }
        return (
            <div className="login-box">
                <div className="login-form">
                    <h1>Welcome</h1>
                    <input id='account' className="txtb" type="text" name="" placeholder="Username" onChange={this.onChangeAccount} />
                    <input id='password' className="txtb" type="password" name="" placeholder="Password" onChange={this.onChangePassword} />
                    <button id="sub" className="login-btn" onClick={this.handleBtnClick}>Login</button>
                </div>
                
            </div>
        )
    }
}