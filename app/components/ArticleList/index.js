import React, { Component } from 'react'
import { Input, Icon, Button, Tooltip, Table } from 'antd'
import styles from './index.css'

export default class ArticleList extends Component {
    render() {
        const columns = [
            {
                title: '文章标题',
                dataIndex: 'filename',
                key: 'filename',
                width: '40%'
            },
            {
                title: '最后修改时间',
                dataIndex: 'date',
                key: 'date',
                width: '30%'
            },
            {
                title: '操作',
                key: 'options',
                width: '30%',
                render: (text, record) => (
                    <span>
                        <Button
                            type="primary"
                            onClick={() => this.props.onEdit(record)}
                        >
                            编辑
                        </Button>
                        {this.props.type === 'drafts' ? (
                            <Button style={{ marginLeft: '10px' }}>发布</Button>
                        ) : null}
                        <Button
                            type="dashed"
                            style={{ marginLeft: '10px' }}
                            onClick={() => this.props.onDelete(record)}
                        >
                            删除
                        </Button>
                    </span>
                )
            }
        ]
        return (
            <div
                ref={el => {
                    this.container = el
                }}
                className={styles.container}
            >
                <div className={styles.articleList}>
                    <Table dataSource={this.props.data} columns={columns} />
                </div>
            </div>
        )
    }
}
