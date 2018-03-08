import React, { Component } from 'react'
import marked from 'marked'
import styles from './index.css'
import './github-markdown.global.css'
import { Icon, Tooltip } from 'antd'

export default class MarkdownEditor extends Component {
    state = {
        previewing: false,
        html: ''
    }

    togglePreview = () => {
        if (!this.state.previewing) {
            let contents = this.props.content.split('---')
            let header = contents[1]
            let content = ''
            for (let i = 2, l = contents.length; i < l; i++) {
                content += contents[i]
            }
            let title = /title: (\S+)/.exec(header)[1]
            let html =
                `<h1 style="text-align: center;">${title}</h1>` +
                marked(content)
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
                    <Tooltip title="插入七牛图片">
                        <Icon className={styles.icon} type="cloud-upload-o" />
                    </Tooltip>
                    <Tooltip title="插入链接">
                        <Icon className={styles.icon} type="link" />
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
                </div>
                {this.state.previewing ? (
                    <div
                        dangerouslySetInnerHTML={{ __html: this.state.html }}
                        className={styles.editorPreview + ' markdown-body'}
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
