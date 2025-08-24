// Route utilities and helpers

/**
 * Pluralize a word with proper English rules
 * @param {string} word - The word to pluralize
 */
const pluralize = (word) => {
	// If word ends with 'y' and the letter before 'y' is a consonant
	if (word.endsWith("y") && word.length > 1) {
		const beforeY = word[word.length - 2].toLowerCase()
		// Check if the letter before 'y' is a consonant (not a, e, i, o, u)
		if (!"aeiou".includes(beforeY)) {
			return word.slice(0, -1) + "ies"
		}
	}

	// Special cases for words ending in 's', 'x', 'z', 'ch', 'sh'
	if (
		word.endsWith("s") ||
		word.endsWith("x") ||
		word.endsWith("z") ||
		word.endsWith("ch") ||
		word.endsWith("sh")
	) {
		return word + "es"
	}

	// Default: just add 's'
	return word + "s"
}

/**
 * Generate CRUD routes for a resource
 * @param {string} basePath - The base path for the resource (e.g., "/admin/properties")
 * @param {string} componentPrefix - The component name prefix (e.g., "AdminProperty")
 * @param {object} options - Additional options
 */
export const generateCrudRoutes = (basePath, componentPrefix, options = {}) => {
	const routes = []

	// Index route - use proper pluralization
	if (!options.excludeIndex) {
		routes.push({
			path: basePath,
			component: pluralize(componentPrefix), // e.g., AdminProperty -> AdminProperties
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
	pluralize,
}
