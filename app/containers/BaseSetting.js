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
export default class BaseSetting extends Component {
    handleSubmit = e => {
        e.preventDefault()
        console.log('confirm')
    }
    chooseFolder = () => {
        console.log('choose folder')
    }
    render() {
        return (
            <div>
                <Form onSubmit={this.handleSubmit}>
                    <FormItem {...formItemLayout} label="项目目录设置">
                        <Search
                            disabled
                            enterButton={<Icon type="folder" />}
                            onSearch={this.chooseFolder}
                        />
                    </FormItem>
                    <FormItem {...formItemLayout} label="七牛云AccessKey">
                        <Input />
                    </FormItem>
                    <FormItem {...formItemLayout} label="七牛云SecretKey">
                        <Input />
                    </FormItem>
                    <FormItem {...formItemLayout} label="七牛云Bucket">
                        <Input />
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
