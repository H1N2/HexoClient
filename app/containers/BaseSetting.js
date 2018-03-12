import React, { Component } from 'react'
import {
    Form,
    Input,
    Tooltip,
    Icon,
    Cascader,
    Select,
    Row,
    Col,
    Checkbox,
    Button
} from 'antd'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { use } from '../service'
import { setBaseSetting } from '../actions'

const FormItem = Form.Item
const Search = Input.Search
const formItemLayout = {
    labelCol: {
        xs: { span: 24 },
        sm: { span: 5 }
    },
    wrapperCol: {
        xs: { span: 24 },
        sm: { span: 14 }
    }
}
const tailFormItemLayout = {
    wrapperCol: {
        xs: {
            span: 24,
            offset: 0
        },
        sm: {
            span: 20,
            offset: 5
        }
    }
}

class BaseSetting extends Component {
    state = {
        baseDir: this.props.baseDir,
        ak: this.props.ak,
        sk: this.props.sk,
        bucket: this.props.bucket
    }

    handleSubmit = e => {
        // TODO 校验仓库是否为合法的hexo目录、校验七牛ak sk bucket的正确性
        e.preventDefault()
        this.props.setBaseSetting({
            baseDir: this.state.baseDir,
            ak: this.state.ak,
            sk: this.state.sk,
            bucket: this.state.bucket
        })
    }
    chooseFolder = () => {
        use('setdir').then(path => {
            this.setState({
                baseDir: path
            })
        })
    }
    render() {
        return (
            <div>
                <Form onSubmit={this.handleSubmit}>
                    <FormItem {...formItemLayout} label="项目目录设置">
                        <Search
                            disabled
                            value={this.state.baseDir}
                            enterButton={<Icon type="folder" />}
                            onSearch={this.chooseFolder}
                        />
                    </FormItem>
                    <FormItem {...formItemLayout} label="七牛云AccessKey">
                        <Input
                            value={this.state.ak}
                            onChange={e =>
                                this.setState({ ak: e.target.value })
                            }
                        />
                    </FormItem>
                    <FormItem {...formItemLayout} label="七牛云SecretKey">
                        <Input
                            value={this.state.sk}
                            onChange={e =>
                                this.setState({ sk: e.target.value })
                            }
                        />
                    </FormItem>
                    <FormItem {...formItemLayout} label="七牛云Bucket">
                        <Input
                            value={this.state.bucket}
                            onChange={e =>
                                this.setState({ bucket: e.target.value })
                            }
                        />
                    </FormItem>
                    <FormItem {...tailFormItemLayout}>
                        <Button type="primary" htmlType="submit">
                            保存
                        </Button>
                    </FormItem>
                </Form>
            </div>
        )
    }
}
const mapStateToProps = state => ({
    baseDir: state.system.baseDir,
    ak: state.system.ak,
    sk: state.system.sk,
    bucket: state.system.bucket
})
const mapDispatchToProps = dispatch =>
    bindActionCreators({ setBaseSetting }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(BaseSetting)
