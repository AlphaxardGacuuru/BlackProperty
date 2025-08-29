import { generateCrudRoutes, groupRoutes } from "@/routes/routeUtils"

// Generate separate route groups for each financial resource
const invoiceRoutes = generateCrudRoutes("/super/invoices", "AdminInvoice")
const paymentRoutes = generateCrudRoutes("/super/payments", "AdminPayment")

// Credit notes don't have a show route, so exclude it
const creditNoteRoutes = generateCrudRoutes(
	"/super/credit-notes",
	"AdminCreditNote",
	{
		excludeShow: true,
	}
)

// Deductions don't have a show route either
const deductionRoutes = generateCrudRoutes(
	"/super/deductions",
	"AdminDeduction",
	{
		excludeShow: true,
	}
)

// Add the billing route manually since it doesn't follow CRUD pattern
const billingRoutes = [
	{
		path: "/super/billing",
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
