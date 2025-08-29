import { generateCrudRoutes, generateNestedRoute } from "../routeUtils"

// Generate standard CRUD routes for units
const unitCrudRoutes = generateCrudRoutes("/admin/units", "AdminUnit")

// Stop using generateNestedRoute and define routes verbose
const unitNestedRoutes = [
	{
		path: "/admin/units/:unitId/tenants/create",
		component: "AdminUnitTenantCreate",
	},
	{
		path: "/admin/units/:unitId/water-readings/create",
		component: "AdminUnitWaterReadingCreate",
	},
	{
		path: "/admin/units/:unitId/invoices/create",
		component: "AdminUnitInvoiceCreate",
	},
	{
		path: "/admin/units/:unitId/payments/create",
		component: "AdminUnitPaymentCreate",
	},
	{
		path: "/admin/units/:unitId/credit-notes/create",
		component: "AdminUnitCreditNoteCreate",
	},
	{
		path: "/admin/units/:unitId/deductions/create",
		component: "AdminUnitDeductionCreate",
	},
]

// Combine all unit routes
const unitRoutes = [...unitCrudRoutes, ...unitNestedRoutes]

export default unitRoutes
