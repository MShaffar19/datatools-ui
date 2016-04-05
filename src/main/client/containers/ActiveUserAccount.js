import React from 'react'
import { connect } from 'react-redux'

import UserAccount from '../components/UserAccount'

import { setVisibilitySearchText } from '../actions/visibilityFilter'

import { fetchProjectsWithPublicFeeds } from '../actions/projects'
import { updateUser, fetchUser } from '../actions/user'

const mapStateToProps = (state, ownProps) => {
  return {
    visibilitySearchText: state.visibilityFilter.searchText,
    projects: state.projects.all,
    user: state.user
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  // const projectId = ownProps.routeParams.projectId
  return {
    onComponentMount: (initialProps) => {
      // dispatch(fetchProjectsWithPublicFeeds())
    },
    searchTextChanged: (text) => { dispatch(setVisibilitySearchText(text)) },
    updateUser: (user, permissions) => { dispatch(updateUser(user, permissions)) },
    fetchUser: (user, permissions) => { dispatch(fetchUser(user)) }
  }
}

const ActiveUserAccount = connect(
  mapStateToProps,
  mapDispatchToProps
)(UserAccount)

export default ActiveUserAccount