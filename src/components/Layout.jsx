/*
 * @Author: huqirui 
 * @Date: 2020-06-20 19:47:11 
 * @Last Modified by:   huqirui 
 * @Last Modified time: 2020-06-20 19:47:11 
 */
import React from 'react';
import { Layout} from 'antd';
import './LayoutStyle.scss';
import Head from './Header/header';
import NavMenu from './NavLeft';

const { Header, Content, Footer } = Layout;

export default class SiderDemo extends React.Component {
	
	render() {
		return (
			<Layout style={{ minHeight: '100vh' }}>
				<NavMenu />
				<Layout className="site-layout">
					<Header className="site-layout-background" 
						// style={{position:'fixed',width:'100%',zIndex:1}}
					>
						<Head />
					</Header>
					<Content style={{ margin: '0 16px' }}>
						<div className="content" style={{ padding: '20px', position: 'relative' }}>
							{this.props.children}
						</div>
					</Content>
					<Footer style={{ textAlign: 'center' }}>Ant Design ©2020 Created by 胡启瑞 & 赵宇杰</Footer>
				</Layout>
			</Layout>
		);
	}
}