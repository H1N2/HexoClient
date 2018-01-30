import React, { Component } from 'react'
import marked from 'marked'
import styles from './index.css'
import { Icon, Tooltip } from 'antd'

export default class MarkdownEditor extends Component {
    state = {
        previewing: false,
        html: ''
    }

    togglePreview = () => {
        if (!this.state.previewing) {
            let html = marked(this.props.content)
            this.setState({
                html
            })
        }
        this.setState({
            previewing: !this.state.previewing
        })
    }

    render() {
        return (
            <div className={styles.container}>
                <div className={styles.toolbar}>
                    <Tooltip title="插入图片">
                        <Icon className={styles.icon} type="picture" />
                    </Tooltip>
                    {this.state.previewing ? (
                        <Tooltip title="关闭预览">
                            <Icon
                                onClick={this.togglePreview}
                                className={styles.icon}
                                type="eye"
                            />
                        </Tooltip>
                    ) : (
                        <Tooltip title="打开预览">
                            <Icon
                                onClick={this.togglePreview}
                                className={styles.icon}
                                type="eye-o"
                            />
                        </Tooltip>
                    )}
                    <Tooltip title="保存">
                        <Icon className={styles.icon} type="save" />
                    </Tooltip>
                </div>
                {this.state.previewing ? (
                    <div
                        dangerouslySetInnerHTML={{ __html: this.state.html }}
                        className={styles.editorPreview}
                    />
                ) : (
                    <textarea
                        value={this.props.content}
                        className={styles.editor}
                        onChange={this.props.change}
                    />
                )}
            </div>
        )
    }
}
