import React, { Component } from 'react'
import styles from '../assets/css/posts.css'
import { Button, Modal, Input, Tooltip } from 'antd'
import ArticleList from '../components/ArticleList'
import MarkdownEditor from '../components/MarkdownEditor'
import nanoid from 'nanoid'

export default class Posts extends Component {
    state = {
        content: '# 这是已发布的',
        activeIndex: 0,
        visible: false,
        filename: '',
        articles: new Array(10).fill(true).map(() => ({
            key: nanoid(),
            filename: '这是一个测试的新建的文章',
            date: '2018-02-01 14:00:00'
        }))
    }
    onChange = e => {
        this.setState({
            content: e.target.value
        })
    }
    handleArticleClick = index => {
        // TODO 加载对应的文件 设置为content
        console.log(index)
        this.setState({
            activeIndex: index
        })
    }
    handleAddClick = () => {
        this.setState({
            visible: true
        })
    }
    handleOk = () => {
        // TODO 调用主进程方法 hexo new post this.state.filename
        console.log(this.state.filename)
    }
    handleSearch = keywords => {
        console.log(keywords)
    }
    render() {
        return (
            <div className={styles.container}>
                <div className={styles.toolbar}>
                    <div>
                        <Input
                            style={{
                                width: '240px',
                                marginBottom: '10px'
                            }}
                            placeholder="输入文件名查询"
                            onPressEnter={e =>
                                this.handleSearch(e.target.value)
                            }
                        />
                        <Tooltip title="新建">
                            <Button
                                style={{ marginLeft: '10px' }}
                                type="primary"
                                icon="plus"
                                onClick={this.handleAddClick}
                            />
                        </Tooltip>
                    </div>
                    <Button type="primary">部署</Button>
                </div>
                <ArticleList
                    type="posts"
                    data={this.state.articles}
                    activeIndex={this.state.activeIndex}
                    onClick={this.handleArticleClick}
                    onAddClick={this.handleAddClick}
                    onSearch={this.handleSearch}
                />
                <div className={styles.right}>
                    {/*
                    <div className={styles.markdownContainer}>
                        <MarkdownEditor
                            content={this.state.content}
                            change={this.onChange}
                        />
                    </div>
                    */}
                </div>
                <Modal
                    title="新建文章"
                    okText="确定"
                    cancelText="取消"
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={() => {
                        this.setState({
                            visible: false
                        })
                    }}
                >
                    <Input
                        value={this.state.filename}
                        placeholder="请输入标题"
                        onChange={e => {
                            this.setState({ filename: e.target.value })
                        }}
                    />
                </Modal>
            </div>
        )
    }
}
