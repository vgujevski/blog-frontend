import React from 'react'
import { useSelector } from 'react-redux'
import { Route, Redirect } from 'react-router-dom'

export const PrivateRoute = ({component: Component, ...rest}) => {
	const isAuthenticated = useSelector(state => !!state.auth.user)

	return(
		<Route {...rest} component={(props) => (
			isAuthenticated ? (
				<Component {...props}/>
			) : (
				<Redirect to="/"/>
			)
		)}/>
	)
}