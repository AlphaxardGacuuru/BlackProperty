// Route utilities and helpers

/**
 * Generate CRUD routes for a resource
 * @param {string} basePath - The base path for the resource (e.g., "/admin/properties")
 * @param {string} componentPrefix - The component name prefix (e.g., "AdminProperty")
 * @param {object} options - Additional options
 */
export const generateCrudRoutes = (basePath, componentPrefix, options = {}) => {
	const routes = []

	// Index route
	if (!options.excludeIndex) {
		routes.push({
			path: basePath,
			component: `${componentPrefix}s`, // e.g., AdminProperties
		})
	}

	// Create route
	if (!options.excludeCreate) {
		routes.push({
			path: `${basePath}/create`,
			component: `${componentPrefix}Create`,
		})
	}

	// Show route
	if (!options.excludeShow) {
		routes.push({
			path: `${basePath}/:id/show`,
			component: `${componentPrefix}Show`,
		})
	}

	// Edit route
	if (!options.excludeEdit) {
		routes.push({
			path: `${basePath}/:id/edit`,
			component: `${componentPrefix}Edit`,
		})
	}

	return routes
}

/**
 * Generate nested resource routes
 * @param {string} parentPath - Parent resource path
 * @param {string} childPath - Child resource path
 * @param {string} componentName - Component name
 */
export const generateNestedRoute = (parentPath, childPath, componentName) => {
	return {
		path: `${parentPath}/:${parentPath.split("/").pop()}Id/${childPath}/create`,
		component: componentName,
	}
}

/**
 * Group routes by feature/module
 */
export const groupRoutes = (...routeGroups) => {
	return routeGroups.flat()
}

export default {
	generateCrudRoutes,
	generateNestedRoute,
	groupRoutes,
}
