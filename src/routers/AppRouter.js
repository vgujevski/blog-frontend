import React from 'react'
import { Router, Route, Switch } from 'react-router-dom'
import { createBrowserHistory } from 'history'

import { Header } from '../components/Header'
import { PostsList } from '../features/posts/PostsList'
import { NotFoundPage } from '../components/NotFoundPage'

export const history = createBrowserHistory()

export const AppRouter = () => {

  return (
    <Router history={history}>
      <div>
        <Header />
        <Switch>
          <Route exact={true} path="/" component={PostsList} />
          <Route component={NotFoundPage} />
        </Switch>
      </div>
    </Router>
  )
}