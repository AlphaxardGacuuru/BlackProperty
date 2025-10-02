import { generateCrudRoutes } from "@/routes/routeUtils"

// Generate all standard CRUD routes for Visitor Admissions
const visitorAdmissionRoutes = generateCrudRoutes("/admin/visitor-admissions", "AdminVisitorAdmission")

// This generates:
// [
//   { path: "/admin/visitor-admissions", component: "AdminVisitorAdmission" },
//   { path: "/admin/visitor-admissions/create", component: "AdminVisitorAdmissionCreate" },
//   { path: "/admin/visitor-admissions/:id", component: "AdminVisitorAdmissionShow" }
//   { path: "/admin/visitor-admissions/:id/edit", component: "AdminVisitorAdmissionEdit" }
// ]

export default visitorAdmissionRoutes
