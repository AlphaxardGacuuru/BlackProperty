import { generateCrudRoutes } from "@/routes/routeUtils"

// Generate all standard CRUD routes for Subscription Plans
const subscriptionPlanRoutes = generateCrudRoutes(
	"/super/subscription-plans",
	"SuperSubscriptionPlan",
	{
		excludeShow: true,
	}
)

// This generates:
// [
//   { path: "/super/subscription-plans", component: "SuperSubscriptionPlan" },
//   { path: "/super/subscription-plans/create", component: "SuperSubscriptionPlanCreate" },
//   { path: "/super/subscription-plans/:id/edit", component: "SuperSubscriptionPlanEdit" }
// ]

export default subscriptionPlanRoutes
