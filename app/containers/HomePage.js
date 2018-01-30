import React, { Component } from 'react'
import { Layout, Menu, Icon } from 'antd'
import styles from '../assets/css/homePage.css'

const { Header, Sider, Content } = Layout
const SubMenu = Menu.SubMenu

import Posts from './Posts'
import Drafts from './Drafts'
import BaseSetting from './BaseSetting'
import QiniuSetting from './QiniuSetting'

export default class HomePage extends Component {
    state = {
        collapsed: false,
        key: 'posts'
    }

    toggle = () => {
        this.setState({
            collapsed: !this.state.collapsed
        })
    }
    changeMenu = ({ key }) => {
        this.setState({
            key: key
        })
    }

    renderContent() {
        switch (this.state.key) {
            case 'posts':
                return <Posts />
            case 'drafts':
                return <Drafts />
            case 'base':
                return <BaseSetting />
            case 'qiniu':
                return <QiniuSetting />
            default:
                return <Posts />
        }
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
                            src={require('../assets/images/logo.svg')}
                            alt=""
                        />
                    </div>
                    <Menu
                        theme="dark"
                        mode="inline"
                        defaultOpenKeys={['article']}
                        defaultSelectedKeys={[this.state.key]}
                        onClick={this.changeMenu}
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
                                <Icon type="file-text" />
                                <span>已发布</span>
                            </Menu.Item>
                            <Menu.Item key="drafts">
                                <Icon type="file" />
                                <span>草稿</span>
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
                                <Icon type="profile" />
                                <span>基础设置</span>
                            </Menu.Item>
                            <Menu.Item key="qiniu">
                                <Icon type="cloud" />
                                <span>七牛云</span>
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
                        {this.renderContent()}
                    </Content>
                </Layout>
            </Layout>
        )
    }
}
