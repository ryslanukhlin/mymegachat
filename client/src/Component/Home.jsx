import React from 'react';
import {Layout, Menu} from "antd";
import {
    DesktopOutlined,
    PieChartOutlined,
    FileOutlined,
    TeamOutlined,
    UserOutlined,
} from '@ant-design/icons';
import '../css/User.css';
import {Link, Redirect, Route, Switch} from "react-router-dom";
import {PRIVATE_ROUTER} from "../route";
import loginForm from "../reducer/loginForm";

const Home = () => {
    const [close, setClose] = React.useState(false);

    return (
        <div>
            <Layout style={{minHeight: '100vh'}}>
                <Layout.Sider  collapsible collapsed={close} onCollapse={setClose.bind(this, !close)}>
                    <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
                        <div className="menu__logo">
                            <h1>MyChat</h1>
                        </div>
                        <Menu.Item icon={<PieChartOutlined />}>
                            <Link to="/user">Mypage</Link>
                        </Menu.Item>
                        <Menu.Item key="2" icon={<DesktopOutlined />}>
                            <Link to="/message">Message</Link>
                        </Menu.Item>
                        <Menu.Item key="3" icon={<DesktopOutlined />}>
                            <Link to="/friends">Friends</Link>
                        </Menu.Item>
                        <Menu.Item key="4" icon={<DesktopOutlined />}>
                            <Link to="/search">Search</Link>
                        </Menu.Item>
                    </Menu>
                </Layout.Sider>
                <Layout>
                    <Switch>
                        {PRIVATE_ROUTER.map(({path, component}) => (
                            <Route key={path} exact path={path} component={component}/>
                        ))}
                        <Redirect to='/user' />
                    </Switch>
                </Layout>
            </Layout>
        </div>
    );
};

export default Home;