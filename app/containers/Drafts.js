import React, { Component } from 'react'
import CommonListPage from '../components/CommonListPage'
import { connect } from 'react-redux'
import { use } from '../service'

class Drafts extends Component {
    render() {
        return (
            <CommonListPage
                type="draft"
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

export default connect(mapStateToProps)(Drafts)
