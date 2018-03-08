import React, { Component } from 'react'
import CommonPage from '../components/CommonPage'

import { connect } from 'react-redux'

class Posts extends Component {
    render() {
        return <CommonPage type="post" baseDir={this.props.baseDir} />
    }
}
const mapStateToProps = state => ({
    baseDir: state.system.baseDir
})

export default connect(mapStateToProps)(Posts)
