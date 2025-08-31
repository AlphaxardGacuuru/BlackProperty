import propertyRoutes from "./propertyRoutes"
import unitRoutes from "./unitRoutes"
import adminTenantRoutes from "./tenantRoutes"
import financialRoutes from "./financialRoutes"

// Super dashboard and general admin routes
const adminRoutes = [
	{
		path: "/super/subscribe",
		component: "AdminSubscriptionPlan",
	},
	{
		path: "/super/dashboard",
		component: "AdminDashboard",
	},
	// Water readings
	{
		path: "/super/water-readings",
		component: "AdminWaterReadings",
	},
	{
		path: "/super/water-readings/create",
		component: "AdminWaterReadingCreate",
	},
	{
		path: "/super/water-readings/:id/edit",
		component: "AdminWaterReadingEdit",
	},
	// Communication
	{
		path: "/super/emails",
		component: "AdminEmails",
	},
	{
		path: "/super/smses",
		component: "AdminSMSMessages",
	},
	// Staff and roles
	{
		path: "/super/staff",
		component: "AdminStaff",
	},
	{
		path: "/super/staff/create",
		component: "AdminStaffCreate",
	},
	{
		path: "/super/staff/:id/edit",
		component: "AdminStaffEdit",
	},
	{
		path: "/super/roles",
		component: "AdminRoleIndex",
	},
	{
		path: "/super/roles/create",
		component: "AdminRoleCreate",
	},
	{
		path: "/super/roles/:id/edit",
		component: "AdminRoleEdit",
	},
	{
		path: "/super/referrals",
		component: "SuperReferral",
	},
	// Support
	{
		path: "/super/support",
		component: "AdminSupport",
	},
]

// Combine all super routes
const superRoutes = [
	...adminRoutes,
	...propertyRoutes,
	...unitRoutes,
	...adminTenantRoutes,
	...financialRoutes,
]

export default superRoutes
