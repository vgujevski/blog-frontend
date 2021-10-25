import React from 'react'
import { useSelector } from 'react-redux';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup'

import { selectLoggedInUser } from '../auth/authSlice';

export const AddComment = () => {

  const user = useSelector(state => selectLoggedInUser(state))

  const handleSubmit = () => {
    console.log('submit clicked');
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
              console.log('new Comment: ', JSON.stringify(values, null, 2));
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