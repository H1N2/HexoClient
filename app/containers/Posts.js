import React, { Component } from 'react'
import styles from '../assets/css/posts.css'
import { Button } from 'antd'
import ArticleList from '../components/ArticleList'
import MarkdownEditor from '../components/MarkdownEditor'

export default class Posts extends Component {
    state = {
        content: '# 这是已发布的'
    }
    onChange = e => {
        this.setState({
            content: e.target.value
        })
    }
    render() {
        return (
            <div className={styles.container}>
                <ArticleList />
                <div className={styles.right}>
                    <div className={styles.toolbar}>
                        <Button style={{ marginRight: '10px' }} type="primary">
                            重新发布
                        </Button>
                        <Button type="primary">预览</Button>
                    </div>
                    <div className={styles.markdownContainer}>
                        <MarkdownEditor
                            content={this.state.content}
                            change={this.onChange}
                        />
                    </div>
                </div>
            </div>
        )
    }
}
