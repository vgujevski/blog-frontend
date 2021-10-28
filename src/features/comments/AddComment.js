import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup'
import { v4 as uuid } from 'uuid'

import { selectLoggedInUser } from '../auth/authSlice';
import { saveComment } from './commentsSlice';

export const AddComment = ({postId}) => {

  const user = useSelector(state => selectLoggedInUser(state))
  const dispatch = useDispatch()

  const commentedOn = new Date().toString()

  const onSubmitClicked = (text) => {
    dispatch(saveComment({
      commentId: uuid(),
      author: user.uid,
      commentedOn,
      postId,
      content: text
    }))
  }

  return (
    <div>
      New Comment
      {!user ?
        <div>You need to be logged in to leave comments</div>
        :
        <div>
          <Formik
            initialValues={{ comment: '' }}
            validationSchema={Yup.object({
              comment: Yup.string().max(100, 'Must be 100 characters or less').required('required')
            })}
            onSubmit={(values) => {
              onSubmitClicked(values.comment)
            }}
          >
            <Form>
              <Field
                placeholder="Enter your comment here"
                name="comment"
                type="text" />
              <ErrorMessage name="comment" />
              <button type="submit">Submit</button>
            </Form>
          </Formik>
        </div>
      }

    </div>
  )
}