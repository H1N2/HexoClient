import React, { Component } from 'react'
import CommonListPage from '../components/CommonListPage'
import { connect } from 'react-redux'
import { use } from '../service'

class Drafts extends Component {
    render() {
        return <CommonListPage type="draft" baseDir={this.props.baseDir} />
    }
}
const mapStateToProps = state => ({
    baseDir: state.system.baseDir
})

export default connect(mapStateToProps)(Drafts)
