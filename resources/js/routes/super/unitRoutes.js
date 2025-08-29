import { generateCrudRoutes, generateNestedRoute } from "@/routes/routeUtils"

// Generate standard CRUD routes for units
const unitCrudRoutes = generateCrudRoutes("/super/units", "AdminUnit")

// Stop using generateNestedRoute and define routes verbose
const unitNestedRoutes = [
	{
		path: "/super/units/:unitId/tenants/create",
		component: "AdminUnitTenantCreate",
	},
	{
		path: "/super/units/:unitId/water-readings/create",
		component: "AdminUnitWaterReadingCreate",
	},
	{
		path: "/super/units/:unitId/invoices/create",
		component: "AdminUnitInvoiceCreate",
	},
	{
		path: "/super/units/:unitId/payments/create",
		component: "AdminUnitPaymentCreate",
	},
	{
		path: "/super/units/:unitId/credit-notes/create",
		component: "AdminUnitCreditNoteCreate",
	},
	{
		path: "/super/units/:unitId/deductions/create",
		component: "AdminUnitDeductionCreate",
	},
]

// Combine all unit routes
const unitRoutes = [...unitCrudRoutes, ...unitNestedRoutes]


export default unitRoutes
