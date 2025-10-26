import { generateCrudRoutes } from "../routeUtils"

// Generate CRUD routes but exclude the 'show' route
const index = [
	{
		path: "/tenant/user/:id/edit",
		component: "AdminUserEdit",
	},
	{
		path: "/tenant/vacant-units",
		component: "TenantVacantUnits",
	},
	{
		path: "/tenant/support",
		component: "AdminSupport",
	},
]

const crudRoutes = generateCrudRoutes("/tenant/tenants", "AdminTenant")

index.push(...crudRoutes)

export default index
