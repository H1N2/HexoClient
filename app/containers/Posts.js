import React, { Component } from 'react'
import CommonListPage from '../components/CommonListPage'

import { connect } from 'react-redux'

class Posts extends Component {
    render() {
        return (
            <CommonListPage
                type="post"
                baseDir={this.props.baseDir}
                ak={this.props.ak}
                sk={this.props.sk}
                bucket={this.props.bucket}
            />
        )
    }
}
const mapStateToProps = state => ({
    baseDir: state.system.baseDir,
    ak: state.system.ak,
    sk: state.system.sk,
    bucket: state.system.bucket
})

export default connect(mapStateToProps)(Posts)
