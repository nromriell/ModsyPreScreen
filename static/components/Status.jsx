import React, {Fragment} from 'react'
import {connect} from 'react-redux'

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