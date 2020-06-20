import React from 'react';
import ReactDOM from 'react-dom';
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import Login from './pages/Login';
import Home from './pages/Home';
import CustomerInfoRegister from './pages/InformationManage/CustomerInfoRegister.jsx';
import SupplierInfoRegister from './pages/InformationManage/SupplierInfoRegister.jsx';
import BrandInfoRegister from './pages/InformationManage/BrandInfoRegister';

import FindSupplierInifo from './pages/QueryTotal/FindSupplierInifo';
import FindCustomerInfo from './pages/QueryTotal/FindCustomerInfo';
import FindBrandInfo from './pages/QueryTotal/FindBrandInfo';
import StockUp from './pages/StockManage';
import AllStock from './pages/Dealings/AllStock';
import AllStockBack from './pages/Dealings/AllStockBack';
import AllStockSell from './pages/Dealings/AllStockSell';

import NoFoundPage from './pages/404';
import Layout from '../src/components/Layout.jsx';
import 'antd/dist/antd.css';

ReactDOM.render(
    <BrowserRouter>
        <Switch>
            <Route exact path='/' component={Login} />
            <Route exact path='/home' render={() =>
                <Layout>
                    <Route path="/home" component={Home}></Route>
                </Layout>
            } />
            <Route path='/info' render={() =>
                <Layout>
                    <Route exact path="/info/supplier" component={SupplierInfoRegister}></Route>
                    <Route exact path='/info/brand' component={BrandInfoRegister} />
                    <Route exact path='/info/customer' component={CustomerInfoRegister} />
                </Layout>
            } />
            <Route  path='/query' render={() =>
                <Layout>
                    <Route exact path='/query/supplier' component={FindSupplierInifo} />
                    <Route exact path='/query/customer' component={FindCustomerInfo} />
                    <Route exact path='/query/brand' component={FindBrandInfo} />
                </Layout>
            } />
            <Route  path='/stock' render={() =>
                <Layout>
                    <Route exact path='/stock' component={StockUp} />
                </Layout>
            } />
            <Route  path='/allstock' render={() =>
                <Layout>
                    <Route exact path='/allstock' component={AllStock} />
                    <Route exact path='/allstock/sell' component={AllStockSell} />
                    <Route exact path='/allstock/back' component={AllStockBack} />
                </Layout>
            } />
            <Route component={NoFoundPage} />
        </Switch>
    </BrowserRouter>,
    document.getElementById('root')
);

