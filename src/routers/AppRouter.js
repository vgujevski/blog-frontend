import React from 'react'
import { Router, Route, Switch } from 'react-router-dom'
import { createBrowserHistory } from 'history'

import { PrivateRoute } from './PrivateRoute'
import { Header } from '../components/Header'
import { PostsList } from '../features/posts/PostsList'
import { AddPost } from '../features/posts/AddPost'
import { NotFoundPage } from '../components/NotFoundPage'

export const history = createBrowserHistory()

export const AppRouter = () => {

  return (
    <Router history={history}>
      <div>
        <Header />
        <Switch>
          <Route exact={true} path="/" component={PostsList} />
          <PrivateRoute exact={true} path="/add-post" component={AddPost}/>
          <Route component={NotFoundPage} />  
        </Switch>
      </div>
    </Router>
  )
}