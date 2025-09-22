import { generateCrudRoutes } from "@/routes/routeUtils"

// Generate all standard CRUD routes for User Admissions
const userAdmissionRoutes = generateCrudRoutes("/admin/user-admissions", "AdminUserAdmission")

// This generates:
// [
//   { path: "/admin/user-admissions", component: "AdminUserAdmission" },
//   { path: "/admin/user-admissions/create", component: "AdminUserAdmissionCreate" },
//   { path: "/admin/user-admissions/:id", component: "AdminUserAdmissionShow" }
//   { path: "/admin/user-admissions/:id/edit", component: "AdminUserAdmissionEdit" }
// ]

export default userAdmissionRoutes
