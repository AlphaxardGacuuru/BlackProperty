import { generateCrudRoutes, generateNestedRoute } from "./routeUtils"

// Generate standard CRUD routes for units
const unitCrudRoutes = generateCrudRoutes("/admin/units", "AdminUnit")

// Generate nested routes for unit sub-resources
const unitNestedRoutes = [
	generateNestedRoute("/admin/units", "tenants", "AdminUnitTenantCreate"),
	generateNestedRoute(
		"/admin/units",
		"water-readings",
		"AdminUnitWaterReadingCreate"
	),
	generateNestedRoute("/admin/units", "invoices", "AdminUnitInvoiceCreate"),
	generateNestedRoute("/admin/units", "payments", "AdminUnitPaymentCreate"),
	generateNestedRoute(
		"/admin/units",
		"credit-notes",
		"AdminUnitCreditNoteCreate"
	),
	generateNestedRoute("/admin/units", "deductions", "AdminUnitDeductionCreate"),
]

// Combine all unit routes
const unitRoutes = [...unitCrudRoutes, ...unitNestedRoutes]

export default unitRoutes
