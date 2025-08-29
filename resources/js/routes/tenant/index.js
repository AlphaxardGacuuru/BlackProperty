import { generateCrudRoutes } from "../routeUtils"

// Generate CRUD routes but exclude the 'show' route
const index = [
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

index.push(...crudRoutes)

export default index
