import React, {useEffect, useState} from 'react'
import {connect} from 'react-redux'

/**
 * @author
 * Nathan Romriell - 10/16/2019
 *
 *
 * @info
 * Functional Component - InfiniteScroll
 *
 * @description
 * Generic Wrapping Class for infinite scrolling
 *
 * @props
 * id                     - div element id
 * className              - div element class
 * children               - child elements
 *
 * @redux-props
 * target                 - Y Page Location for next page load
 * data                   - Data being tracked, requires "loading" attribute
 * loadNewPage($page)     - Trigger page load for $page
 * changeTarget($target)  - Change load target, used along side data.loading to prevent duplicate remote calls
 *
 * @Hooks
 * [maxPage, setMaxPage]  - Component state tracking last page loaded
 * useEffect              - Add/Remove Event Listeners for page scroll and window resize
 *
 * @Functions
 * OnScroll()             - Track page position, Trigger Remote Page Loads
 *
 */
const InfiniteScroll = (props) => {
  const [maxPage, setMaxPage] = useState(1);
  const onScroll = () => {
    if(Math.ceil(document.body.scrollTop+document.body.clientHeight)+5 >= props.target){ //Math.ceil used to prevent floating point errors from blocking page load
      if(!props.data.loading) {
        setMaxPage(maxPage + 1);
        props.changeTarget(props.target + window.innerHeight / 2);
        props.loadNewPage(maxPage + 1);
      }
    }
  };
  useEffect(() => {
     window.addEventListener('scroll', onScroll);
     window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    }
  });

  return <div id={props.id} className={props.className}>{props.children}</div>

};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    loadNewPage: (page) => dispatch(ownProps.pageLoadAction(page)),
    changeTarget: (newY) => dispatch(ownProps.targetChangeAction(newY))
  }
};

const mapStateToProps = (state) => {
  return {
    target:state.scrollTarget,
    data: state.data
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(InfiniteScroll)