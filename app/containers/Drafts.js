import React, { Component } from 'react'
import ArticleList from '../components/ArticleList'
import styles from '../assets/css/posts.css'
import { Button } from 'antd'
export default class Drafts extends Component {
    render() {
        return (
            <div className={styles.container}>
                <ArticleList />
                <div className={styles.right}>
                    <div className={styles.toolbar}>
                        <Button style={{ marginRight: '10px' }} type="primary">
                            发布
                        </Button>
                        <Button type="primary">预览</Button>
                    </div>
                </div>
            </div>
        )
    }
}
