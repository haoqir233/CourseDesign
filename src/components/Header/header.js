import React from 'react';
import "./index.scss"
import store from '../../store';
import { message } from 'antd';
import { Link } from 'react-router-dom';

export default class Header extends React.Component {
    constructor(props) {
        super(props)
        this.state = store.getState();
        store.subscribe(this.storeChange);
        this.state = {
            bool: false
        }
    }

    //订阅方法
    storeChange = () => {
        this.setState(store.getState())
    }

    componentWillMount() {
        if(window.localStorage.userName === undefined){
            // this.props.history.push('/')
            window.location.href = '/';
            message.info('请先登录')
        }
    }


    logOut = () => {
        window.localStorage.clear();
    }

    render() {
        if(window.localStorage.userName !== undefined){
        return (
            <div className="header">
                <div className="breadcrumb">
                    <div className="breadcrumb-title">
                        企业进销管理系统
                    </div>
                    <div className="welcome">
                        <span className="date">欢迎!&emsp;{localStorage.userName}</span>
                        <Link to='/' onClick={this.logOut} style={{color:'red'}}>退出</Link>
                    </div>
                </div>
            </div>
        )}
    }
}