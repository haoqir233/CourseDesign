import React, { Component } from 'react'
import { Card,message } from 'antd';
import './style.scss';
import request, { IP } from '../../utils/request';

export default class index extends Component {

    constructor(props) {
        super(props);
        this.state = {
            password: '',
            password_massage: '',
            determine_password: ''
        };
    }

    validate_password = (e) => {
        let p = document.getElementById('password').value;
        if (p.length < 5 || p.length > 12) {
            this.setState({
                password_massage: false,
                password: e.target.value
            })
        } else {
            this.setState({
                password_massage: true,
                password: e.target.value
            })
        }
    }
    determine_password = () => {
        let dp = document.getElementById('determine_password').value;
        if (dp !== this.state.password) {
            this.setState({
                determine_password: false
            })
        } else {
            this.setState({
                determine_password: true
            })
        }
    }

    submitRegister = () => {
        
        if (this.state.password_massage === false) {
            message.error("密码格式不符合规范！");
            return;
        }
        if (this.state.determine_password === false) {
            message.error("两次密码不一致");
            return;
        }
        const url = IP + '/rest/user/modifyUser';
        if (this.state.password !== ''&& this.state.determine_password !== '') {
            request("POST", url, {
                "cmd": "modifyUser",
                "type": "request",
                "request": {
                    "account": localStorage.account,
                    "password": this.state.password,
                }
            }).then(response => {
                if (response.response.data.res) {
                    message.success('用户' + localStorage.account + '密码修改成功!请重新登录');
                    this.props.history.push('/');
                } else {
                    message.info(response.response.data.exception);
                }
            }).catch(err => {
                alert(err + '网络异常')
            })
        } else if (this.state.password === "") {
            message.error('密码不能为空')
        } else if (this.state.determine_password === ''){
            message.error('请确认密码')
        } 
        else{
            console.log("异常")
        }
    }


    render() {
        return (
            <div>
                <Card title='个人中心'>
                    <div className="register-box">
                        <div className="register-form">
                            <div >
                        请输入密码：<input id='password' className="txts" type="password" placeholder="密码大于6位数小于12位" onChange={this.validate_password} />
                        确认密码：<input id='determine_password' className="txts" type="password" placeholder="Password" onChange={this.determine_password} />
                                <button id="sub" className="register-btn" onClick={this.submitRegister}>修改密码</button>

                            </div>
                        </div>

                    </div>
                </Card>
            </div>
        )
    }
}
