import React from 'react'
import { Router, Route, Switch } from 'react-router-dom'
import { createBrowserHistory } from 'history'

import { PrivateRoute } from './PrivateRoute'
import { Navbar } from '../components/Navbar'
import { PostsList } from '../features/posts/PostsList'
import { AddPost } from '../features/posts/AddPost'
import { EditPostForm } from '../features/posts/EditPostForm'
import { SinglePostPage } from '../features/posts/SinglePost'
import { NotFoundPage } from '../components/NotFoundPage'

export const history = createBrowserHistory()

export const AppRouter = () => {

  return (
    <Router history={history}>
      <div>
        <Navbar />
        <Switch>
          <Route exact={true} path="/" component={PostsList} />
          <Route exact path="/posts/:postId" component={SinglePostPage} />
          <PrivateRoute exact={true} path="/addPost" component={AddPost}/>
          <PrivateRoute exact={true} path="/editPost/:postId" component={EditPostForm}/>
          <Route component={NotFoundPage} />  
        </Switch>
      </div>
    </Router>
  )
}