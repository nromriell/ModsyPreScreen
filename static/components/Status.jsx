import React, {Fragment} from 'react'
import {connect} from 'react-redux'

/**
 * @author
 * Nathan Romriell - 10/17/2019
 *
 * @info
 * Functional Component - Status
 *
 * @description
 * Fragment wrapped component to display the status of the remote load based on the redux state
 *
 * @redux-props
 * loading                - Boolean determining whether the remote is loading
 * error                  - Boolean determining whether the remote load failed
 *
 */

const Status = (props) => {
    return <Fragment>
        { props.loading && <div className="Loading">Loading...</div> }
        { props.error && <div className="Error">Error Reaching Server</div> }
    </Fragment>
};

const mapStateToProps = (state) =>
{
    return {
        loading: state.data.loading,
        error: state.data.error
    }
};

export default connect(mapStateToProps, null)(Status);