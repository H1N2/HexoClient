import React, { Component } from 'react'
import styles from '../assets/css/posts.css'
import { Button, Modal, Input, Tooltip, Tabs, message } from 'antd'
import ArticleList from '../components/ArticleList'
import MarkdownEditor from '../components/MarkdownEditor'

const confirm = Modal.confirm
import { connect } from 'react-redux'
import { use } from '../service'

class Posts extends Component {
    state = {
        content: '',
        activeIndex: 0,
        visible: false,
        editorVisible: false,
        filename: '',
        dialogTitle: '',
        articles: []
    }

    componentDidMount() {
        this.getData()
    }

    getData() {
        let path = this.props.baseDir + '/source/_posts'
        use('getFileList', path, files => {
            this.files = files
            console.log(files)
            this.setState({
                articles: files
            })
        })
    }

    showDeleteConfirm = () => {
        confirm({
            title: '提示',
            content: '删除后将无法恢复，确定要删除吗？',
            okText: '确定',
            cancelText: '取消',
            onOk: () => {
                let filename = `${this.props.baseDir}/source/_posts/${
                    this.current.filename
                }.md`
                use('deleteFile', filename, res => {
                    message.success('删除成功')
                    this.files = this.files.filter(item => {
                        return item.filename !== this.current.filename
                    })
                    this.setState({
                        articles: this.files
                    })
                })
            }
        })
    }

    onChange = e => {
        this.setState({
            content: e.target.value
        })
    }
    handleArticleClick = index => {
        // TODO 加载对应的文件 设置为content
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
        use(
            'createFile',
            {
                filename: this.state.filename,
                dir: this.props.baseDir,
                type: 'post'
            },
            res => {
                if (res.code !== 0) {
                    return message.warn(res.msg)
                }
                message.success('创建成功')
                this.setState({
                    visible: false
                })
                this.getData()
            }
        )
    }

    handleEditorOk() {
        // TODO 讲内容写入对应的文件中
    }

    handleSearch = keywords => {
        let data = this.files.filter(item => {
            return item.filename.indexOf(keywords) !== -1
        })
        this.setState({
            articles: data
        })
    }

    handleEdit = data => {
        use(
            'getFileDetail',
            `${this.props.baseDir}/source/_posts/${data.filename}.md`,
            content => {
                this.current = data
                this.setState({
                    dialogTitle: data.filename,
                    editorVisible: true,
                    content
                })
            }
        )
    }

    handleDelete = data => {
        this.current = data
        this.showDeleteConfirm()
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
                    onEdit={this.handleEdit}
                    onDelete={this.handleDelete}
                />
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
                <Modal
                    width="80%"
                    title={this.state.dialogTitle}
                    okText="确定"
                    cancelText="取消"
                    visible={this.state.editorVisible}
                    onOk={this.handleEditorOk}
                    style={{ top: 30 }}
                    onCancel={() => {
                        this.setState({
                            editorVisible: false
                        })
                    }}
                >
                    <div className={styles.editorBox}>
                        <MarkdownEditor
                            content={this.state.content}
                            change={this.onChange}
                        />
                    </div>
                </Modal>
            </div>
        )
    }
}
const mapStateToProps = state => ({
    baseDir: state.system.baseDir
})

export default connect(mapStateToProps)(Posts)
