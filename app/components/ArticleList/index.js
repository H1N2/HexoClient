import React, { Component } from 'react'
import { Input } from 'antd'
import styles from './index.css'

export default class ArticleList extends Component {
    render() {
        return (
            <div className={styles.container}>
                <Input
                    style={{ width: 'calc(100% - 20px)', marginBottom: '10px' }}
                    placeholder="输入文件名查询"
                />
                <div className={styles.articleList}>
                    {new Array(100).fill(true).map((item, index) => (
                        <div key={index} className={styles.article}>
                            文件啊啊啊文件啊啊啊
                        </div>
                    ))}
                </div>
            </div>
        )
    }
}
