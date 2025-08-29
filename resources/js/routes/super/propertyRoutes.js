import { generateCrudRoutes } from "@/routes/routeUtils"

// Generate all standard CRUD routes for properties
const propertyRoutes = generateCrudRoutes("/super/properties", "AdminProperty")

// This generates:
// [
//   { path: "/super/properties", component: "AdminProperties" },
//   { path: "/super/properties/create", component: "AdminPropertyCreate" },
//   { path: "/super/properties/:id/show", component: "AdminPropertyShow" },
//   { path: "/super/properties/:id/edit", component: "AdminPropertyEdit" }
// ]

export default propertyRoutes
