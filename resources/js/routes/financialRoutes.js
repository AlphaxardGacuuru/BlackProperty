import { generateCrudRoutes, groupRoutes } from "./routeUtils"

// Generate separate route groups for each financial resource
const invoiceRoutes = generateCrudRoutes("/admin/invoices", "AdminInvoice")
const paymentRoutes = generateCrudRoutes("/admin/payments", "AdminPayment")

// Credit notes don't have a show route, so exclude it
const creditNoteRoutes = generateCrudRoutes(
	"/admin/credit-notes",
	"AdminCreditNote",
	{
		excludeShow: true,
	}
)

// Deductions don't have a show route either
const deductionRoutes = generateCrudRoutes(
	"/admin/deductions",
	"AdminDeduction",
	{
		excludeShow: true,
	}
)

// Add the billing route manually since it doesn't follow CRUD pattern
const billingRoutes = [
	{
		path: "/admin/billing",
		component: "AdminBilling",
	},
]

// Combine all financial routes
const financialRoutes = groupRoutes(
	invoiceRoutes,
	paymentRoutes,
	creditNoteRoutes,
	deductionRoutes,
	billingRoutes
)

export default financialRoutes
