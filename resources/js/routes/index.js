import React from "react"
import { Route } from "react-router-dom"

// Import route definitions
import authRoutes from "./auth"
import publicRoutes from "./publicRoutes"
import superRoutes from "./super"
import adminRoutes from "./admin"

import tenantRoutes from "./tenant"

// Import component mapping
import componentMap from "./componentMap"

const RouteList = ({ GLOBAL_STATE }) => {
	// Helper function to render route with component
	const renderRoute = (route, key) => {
		const Component = componentMap[route.component]

		// Add error checking to help debug missing components
		if (!Component) {
			console.error(
				`Component "${route.component}" not found in componentMap for route: ${route.path}`
			)
			return null
		}

		return (
			<Route
				key={key}
				path={route.path}
				exact
				render={() => <Component {...GLOBAL_STATE} />}
			/>
		)
	}

	return (
		<React.Fragment>
			{/* Auth routes */}
			{authRoutes.map(renderRoute)}

			{/* Public routes with Header layout */}
			<componentMap.Header {...GLOBAL_STATE}>
				{publicRoutes.map(renderRoute)}
			</componentMap.Header>

			{/* Admin routes with AdminNav layout */}
			<componentMap.AdminNav {...GLOBAL_STATE}>
				{superRoutes.map(renderRoute)}
				{adminRoutes.map(renderRoute)}
				{tenantRoutes.map(renderRoute)}
			</componentMap.AdminNav>
		</React.Fragment>
	)
}

export default RouteList
