import React, { Component } from 'react'
import {
    HashRouter as Router,
    Switch,
    Route,
    NavLink,
    Redirect
} from 'react-router-dom'
import { Layout, Menu, Icon } from 'antd'
import { connect } from 'react-redux'
import styles from '../assets/css/homePage.css'

const { Header, Sider, Content } = Layout
const SubMenu = Menu.SubMenu

import Posts from './Posts'
import Drafts from './Drafts'
import BaseSetting from './BaseSetting'

class HomePage extends Component {
    state = {
        collapsed: false,
        openKeys: ['article']
    }

    componentDidMount() {
        this.getDefaultOpenKeys()
    }

    toggle = () => {
        this.setState({
            collapsed: !this.state.collapsed
        })
    }

    getDefaultOpenKeys = () => {
        let openKeys
        switch (this.props.location.pathname) {
            case '/posts':
            case '/drafts':
                openKeys = ['article']
                break
            case '/base':
                openKeys = ['setting']
                break
            default:
                openKeys = ['article']
        }
        this.setState({ openKeys })
    }

    render() {
        return (
            <Layout style={{ height: '100vh' }}>
                <Sider
                    trigger={null}
                    collapsible
                    collapsed={this.state.collapsed}
                >
                    <div className={styles.logo}>
                        <img
                            className={styles.logoImg}
                            src={require('../assets/images/logo.png')}
                            alt=""
                        />
                    </div>
                    <Menu
                        theme="dark"
                        mode="inline"
                        openKeys={this.state.openKeys}
                        selectedKeys={[this.props.location.pathname.substr(1)]}
                        onOpenChange={openKeys => this.setState({ openKeys })}
                    >
                        <SubMenu
                            key="article"
                            title={
                                <span>
                                    <Icon type="dashboard" />
                                    <span>文章管理</span>
                                </span>
                            }
                        >
                            <Menu.Item key="posts">
                                <NavLink to="/posts">
                                    <Icon type="file-text" />
                                    <span>已发布</span>
                                </NavLink>
                            </Menu.Item>
                            <Menu.Item key="drafts">
                                <NavLink to="/drafts">
                                    <Icon type="file" />
                                    <span>草稿</span>
                                </NavLink>
                            </Menu.Item>
                        </SubMenu>
                        <SubMenu
                            key="setting"
                            title={
                                <span>
                                    <Icon type="setting" />
                                    <span>设置</span>
                                </span>
                            }
                        >
                            <Menu.Item key="base">
                                <NavLink to="/base">
                                    <Icon type="profile" />
                                    <span>基础设置</span>
                                </NavLink>
                            </Menu.Item>
                        </SubMenu>
                    </Menu>
                </Sider>
                <Layout>
                    <Header style={{ background: '#fff', padding: 0 }}>
                        <Icon
                            className={styles.trigger}
                            type={
                                this.state.collapsed
                                    ? 'menu-unfold'
                                    : 'menu-fold'
                            }
                            onClick={this.toggle}
                        />
                    </Header>
                    <Content
                        style={{
                            margin: '24px 16px',
                            padding: 24,
                            background: '#fff',
                            minHeight: 280
                        }}
                    >
                        <Router>
                            <Switch>
                                <Route path="/posts" component={Posts} />
                                <Route path="/drafts" component={Drafts} />
                                <Route path="/base" component={BaseSetting} />
                                <Route
                                    render={() => <Redirect to="/posts" />}
                                />
                            </Switch>
                        </Router>
                    </Content>
                </Layout>
            </Layout>
        )
    }
}

const mapStateToProps = state => {
    return {
        location: state.router.location
    }
}

export default connect(mapStateToProps)(HomePage)
