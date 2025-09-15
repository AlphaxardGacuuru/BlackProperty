import { generateCrudRoutes } from "@/routes/routeUtils"

// Generate all standard CRUD routes for Subscription Plans
const userSubscriptionPlanRoutes = generateCrudRoutes(
	"/super/user-subscription-plans",
	"SuperUserSubscriptionPlan",
	{
		excludeShow: true,
	}
)

// This generates:
// [
//   { path: "/super/user-subscription-plans", component: "SuperUserSubscriptionPlan" },
//   { path: "/super/user-subscription-plans/create", component: "SuperUserSubscriptionPlanCreate" },
//   { path: "/super/user-subscription-plans/:id/edit", component: "SuperUserSubscriptionPlanEdit" }
// ]

export default userSubscriptionPlanRoutes