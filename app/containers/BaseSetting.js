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
const formItemLayout = {
    labelCol: {
        xs: { span: 24 },
        sm: { span: 4 }
    },
    wrapperCol: {
        xs: { span: 24 },
        sm: { span: 20 }
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
            offset: 4
        }
    }
}
export default class BaseSetting extends Component {
    handleSubmit = () => {}
    render() {
        return (
            <div>
                <Form onSubmit={this.handleSubmit}>
                    <FormItem {...formItemLayout} label="项目目录设置">
                        <Input />
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
                            确定
                        </Button>
                    </FormItem>
                </Form>
            </div>
        )
    }
}
