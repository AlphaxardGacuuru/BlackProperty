import { generateCrudRoutes } from "./routeUtils"

// Generate CRUD routes but exclude the 'show' route
const adminTenantRoutes = generateCrudRoutes("/admin/tenants", "AdminTenant")

// If you wanted to exclude certain routes, you could do:
// const adminTenantRoutes = generateCrudRoutes("/admin/tenants", "AdminTenant", {
//   excludeShow: true  // This would skip the show route
// })

export default adminTenantRoutes
