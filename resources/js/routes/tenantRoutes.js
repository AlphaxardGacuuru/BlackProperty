import { generateCrudRoutes } from "./routeUtils"

// Generate CRUD routes but exclude the 'show' route
const tenantRoutes = [
	{
		path: "/tenant/dashboard",
		component: "TenantDashboard",
	},
	// Support
	{
		path: "/tenant/support",
		component: "AdminSupport",
	},
]

const crudRoutes = generateCrudRoutes("/tenant/tenants", "AdminTenant")

tenantRoutes.push(...crudRoutes)

// If you wanted to exclude certain routes, you could do:
// const tenantRoutes = generateCrudRoutes("/admin/tenants", "AdminTenant", {
//   excludeShow: true  // This would skip the show route
// })

export default tenantRoutes
