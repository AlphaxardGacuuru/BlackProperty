import { generateCrudRoutes } from "@/routes/routeUtils"

// Generate CRUD routes but exclude the 'show' route
const adminTenantRoutes = generateCrudRoutes("/super/tenants", "AdminTenant")

// If you wanted to exclude certain routes, you could do:
// const adminTenantRoutes = generateCrudRoutes("/super/tenants", "AdminTenant", {
//   excludeShow: true  // This would skip the show route
// })

export default adminTenantRoutes
