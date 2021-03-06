import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter, Route, Switch} from 'react-router-dom'
import PropTypes from 'prop-types'
import SignIn from './components/Login'
import SignUp from './components/SignUp'
import {StartPage} from './components/StartPage'
import {AboutPage} from './components/AboutPage'
import Map from './components/Map'
import {me} from './store'
import SingleLanguage from './components/SingleLanguage'
import LanguagePractice from './components/LanguagePractice'

class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData()
  }

  render() {
    const {isLoggedIn} = this.props

    return (
      <Switch>
        {/* Routes placed here are available to all visitors */}
        <Route exact path="/" component={StartPage} />
        <Route path="/map" component={Map} />
        <Route path="/SignIn" component={SignIn} />
        <Route path="/SignUp" component={SignUp} />
        <Route path="/About" component={AboutPage} />
        <Route
          exact
          path="/language/:singleLanguage"
          component={SingleLanguage}
        />
        <Route
          exact
          path="/language/:singlelanguage/practice"
          component={LanguagePractice}
        />
        {isLoggedIn && (
          <Switch>
            {/* Routes placed here are only available after logging in */}
            <Route path="/home" component={UserHome} />
          </Switch>
        )}
        {/* Displays our SignIn component as a fallback */}
        {/* <Route component={SignIn} /> */}
      </Switch>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.user that has a truthy id.
    // Otherwise, state.user will be an empty object, and state.user.id will be falsey
    isLoggedIn: !!state.user.id,
  }
}

const mapDispatch = (dispatch) => {
  return {
    loadInitialData() {
      dispatch(me())
    },
  }
}

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Routes))

/**
 * PROP TYPES
 */
Routes.propTypes = {
  loadInitialData: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
}
