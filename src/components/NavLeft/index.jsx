/*
 * @Author: huqirui 
 * @Date: 2020-06-20 19:47:25 
 * @Last Modified by:   huqirui 
 * @Last Modified time: 2020-06-20 19:47:25 
 */
import {
    AppstoreOutlined,
    HistoryOutlined,
    IdcardOutlined,
    SettingOutlined
} from '@ant-design/icons';
import { Layout, Menu } from 'antd';
import React from 'react';
import { Link } from 'react-router-dom';

const { Sider } = Layout;
const { SubMenu } = Menu;

export default class NavMenu extends React.Component {
    state = {
        collapsed: false,
    };

    onCollapse = collapsed => {
        console.log(collapsed);
        this.setState({ collapsed });
    };

    render() {
        return (
            <Sider
                collapsible
                collapsed={this.state.collapsed}
                onCollapse={this.onCollapse}
            >
                <div className="logo">
                    <img src="/assets/logo-ant.svg" alt="" />
                    {/* <h1 id='logofont'>Ant Design</h1> */}
                </div>
                <Menu theme="dark" defaultSelectedKeys={['sub1-1']} mode="inline">
                    <SubMenu key="sub1" icon={<IdcardOutlined />} title="基础信息管理">
                        <Menu.Item key="sub1-1">
                            <Link to='/info/supplier'>供应商信息登记</Link>
                        </Menu.Item>
                        <Menu.Item key="sub1-2" >
                            <Link to='/info/brand'>商品信息登记</Link>
                        </Menu.Item>
                        <Menu.Item key="sub1-3">
                            <Link to='/info/customer'>客户信息登记</Link>
                        </Menu.Item>
                        <Menu.Item key="sub1-4" >
                            <Link to='/query/supplier'>供应商信息展示</Link>
                        </Menu.Item>
                        <Menu.Item key="sub1-5" >
                            <Link to='/query/brand'>商品信息展示</Link>
                        </Menu.Item>
                        <Menu.Item key="sub1-6" >
                            <Link to='/query/customer'>客户信息展示</Link>
                        </Menu.Item>
                    </SubMenu>
                    <Menu.Item key="sub2-1" icon={<AppstoreOutlined />}>
                            <Link to='/stock'>库存管理</Link>
                        </Menu.Item>
                    <SubMenu key="sub3" icon={<HistoryOutlined />} title="往来管理">
                        <Menu.Item key="sub3-1">
                            <Link to='/allstock'>商品入库信息展示</Link>
                        </Menu.Item>
                        <Menu.Item key="sub3-2" >
                            <Link to='/allstock/sell'>商品销售信息展示</Link>
                        </Menu.Item>
                        <Menu.Item key="sub3-3" >
                            <Link to='/allstock/back'>商品退货信息展示</Link>
                        </Menu.Item>
                    </SubMenu>
                    <Menu.Item key="sub4" icon={<SettingOutlined />}>
                        <Link to='/home'>个人中心</Link>
                    </Menu.Item>
                </Menu>
            </Sider>
        )
    }
}