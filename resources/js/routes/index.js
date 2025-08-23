import React from "react"
import { Route } from "react-router-dom"

// Import route definitions
import authRoutes from "./authRoutes"
import publicRoutes from "./publicRoutes"
import propertyRoutes from "./propertyRoutes"
import unitRoutes from "./unitRoutes"
import tenantRoutes from "./tenantRoutes"
import financialRoutes from "./financialRoutes"
import adminRoutes from "./adminRoutes"

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

	// Combine all admin routes
	const allAdminRoutes = [
		...adminRoutes,
		...propertyRoutes,
		...unitRoutes,
		...tenantRoutes,
		...financialRoutes,
	]

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
				{allAdminRoutes.map(renderRoute)}
			</componentMap.AdminNav>
		</React.Fragment>
	)
}

export default RouteList
