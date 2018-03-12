import React, { Component } from 'react'
import marked from 'marked'
import styles from './index.css'
import './github-markdown.global.css'
import { Icon, Tooltip } from 'antd'
import Qiniu from '../../utils/qiniu'
import Policy from '../../utils/policy'

export default class MarkdownEditor extends Component {
    state = {
        previewing: false,
        html: ''
    }

    componentDidMount() {
        if (this.props.bucket) {
            Qiniu.autoZone(this.props.ak, this.props.bucket)
                .then(response => {
                    this.uploadURL = `http://${response.up.src.main[0]}`
                })
                .catch(error => {
                    console.log(error)
                })
        }
        Qiniu.domain(this.props.ak, this.props.sk, this.props.bucket)
            .then(res => {
                this.domain = res[0]
            })
            .catch(e => {
                console.log(e)
            })
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

    handleInsertImg = () => {
        this.file.click()
        this.pos = this.getPosition(this.textarea)
        this.top = this.textarea.scrollTop
    }

    handleInsertLink = () => {
        this.pos = this.getPosition(this.textarea)
        this.top = this.textarea.scrollTop
        setTimeout(() => {
            this.insertText(this.textarea, '[https://hexo.io](https://hexo.io)')
        }, 300)
    }

    handleFileChange = e => {
        // TODO upload image to qiniu
        let file = this.file.files[0]
        let extname = /\S+\.(\S+)$/.exec(file.name)[1]
        const key = `${new Date().getTime()}.${extname}`
        const options = {
            scope: `${this.props.bucket}:${key}`
        }
        const mac = {
            accessKey: this.props.ak,
            secretKey: this.props.sk
        }
        const putPolicy = new Policy(options)
        const uploadToken = putPolicy.uploadToken(mac)

        this.uploadFile({
            data: {
                file,
                key,
                token: uploadToken
            },
            action: this.uploadURL
        })
            .then(res => {
                let url = `http://${this.domain}/${res.key}`
                let imgContent = `![${file.name}](${url})`
                this.insertText(this.textarea, imgContent)
                this.file.value = ''
            })
            .catch(e => {
                message.error('出错啦TAT')
            })
    }

    uploadFile = ({ data, action }) => {
        return new Promise((resolve, reject) => {
            let { file, token, key } = data
            var xhr = new XMLHttpRequest()
            xhr.open('POST', action, true)
            var formData
            formData = new FormData()
            if (key !== null && key !== undefined) formData.append('key', key)
            formData.append('token', token)
            formData.append('file', file)

            xhr.onreadystatechange = function(response) {
                if (
                    xhr.readyState == 4 &&
                    xhr.status == 200 &&
                    xhr.responseText != ''
                ) {
                    var blkRet = JSON.parse(xhr.responseText)
                    resolve(blkRet)
                } else if (xhr.status != 200 && xhr.responseText) {
                    var blkRet = JSON.parse(xhr.responseText)
                    reject(blkRet)
                }
            }
            xhr.send(formData)
        })
    }

    insertText = (obj, str) => {
        var startPos = this.pos.startPos,
            endPos = this.pos.endPos,
            cursorPos = startPos,
            tmpStr = this.props.content
        let content =
            tmpStr.substring(0, startPos) +
            str +
            tmpStr.substring(endPos, tmpStr.length)
        this.props.setContent(content)
        cursorPos += str.length
        obj.focus()
        obj.scrollTop = this.top
        obj.selectionStart = obj.selectionEnd = cursorPos
    }

    getPosition = element => {
        let startPos = 0,
            endPos = 0
        if (element.selectionStart || element.selectionStart == '0') {
            startPos = element.selectionStart
        }
        if (element.selectionEnd || element.selectionEnd == '0') {
            endPos = element.selectionEnd
        }
        return { startPos, endPos }
    }

    render() {
        return (
            <div className={styles.container}>
                <div className={styles.toolbar}>
                    <Tooltip title="插入图片">
                        <Icon
                            onClick={this.handleInsertImg}
                            className={styles.icon}
                            type="picture"
                        />
                    </Tooltip>
                    <Tooltip title="插入链接">
                        <Icon
                            onClick={this.handleInsertLink}
                            className={styles.icon}
                            type="link"
                        />
                    </Tooltip>
                    <input
                        type="file"
                        ref={fileinput => {
                            this.file = fileinput
                        }}
                        style={{ display: 'none' }}
                        onChange={this.handleFileChange}
                        accept=".jpeg,.jpg,.png,.svg"
                    />
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
                        ref={textarea => (this.textarea = textarea)}
                    />
                )}
            </div>
        )
    }
}
