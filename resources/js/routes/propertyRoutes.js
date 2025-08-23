import { generateCrudRoutes } from "./routeUtils"

// Generate all standard CRUD routes for properties
const propertyRoutes = generateCrudRoutes("/admin/properties", "AdminProperty")

// This generates:
// [
//   { path: "/admin/properties", component: "AdminProperties" },
//   { path: "/admin/properties/create", component: "AdminPropertyCreate" },
//   { path: "/admin/properties/:id/show", component: "AdminPropertyShow" },
//   { path: "/admin/properties/:id/edit", component: "AdminPropertyEdit" }
// ]

export default propertyRoutes
