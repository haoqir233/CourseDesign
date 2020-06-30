import { Button, Result } from 'antd';
import React from 'react';
import { Link } from 'react-router-dom';

/**
 * 404页面
 */
const NoFoundPage = () => (
  <Result
    status="404"
    title="404"
    subTitle="抱歉，您访问的页面不存在。"
    extra={
      <Button type="primary" >
        <Link to='/'>返回首页</Link>
      </Button>
    }
  />
);

export default NoFoundPage;
