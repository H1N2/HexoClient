import React, { Component } from 'react'
import CommonListPage from '../components/CommonListPage'

import { connect } from 'react-redux'

class Posts extends Component {
    render() {
        return <CommonListPage type="post" baseDir={this.props.baseDir} />
    }
}
const mapStateToProps = state => ({
    baseDir: state.system.baseDir
})

export default connect(mapStateToProps)(Posts)
