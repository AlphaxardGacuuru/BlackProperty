import propertyRoutes from "@/routes/admin/propertyRoutes"
import unitRoutes from "@/routes/admin/unitRoutes"
import tenantRoutes from "@/routes/admin/tenantRoutes"
import financialRoutes from "@/routes/admin/financialRoutes"

// Admin dashboard and general admin routes
const adminRoutes = [
	{
		path: "/admin/subscribe",
		component: "AdminSubscriptionPlan",
	},
	{
		path: "/admin/dashboard",
		component: "AdminDashboard",
	},
	// Water readings
	{
		path: "/admin/water-readings",
		component: "AdminWaterReadings",
	},
	{
		path: "/admin/water-readings/create",
		component: "AdminWaterReadingCreate",
	},
	{
		path: "/admin/water-readings/:id/edit",
		component: "AdminWaterReadingEdit",
	},
	// Communication
	{
		path: "/admin/emails",
		component: "AdminEmails",
	},
	{
		path: "/admin/smses",
		component: "AdminSMSMessages",
	},
	// Staff and roles
	{
		path: "/admin/staff",
		component: "AdminStaff",
	},
	{
		path: "/admin/staff/create",
		component: "AdminStaffCreate",
	},
	{
		path: "/admin/staff/:id/edit",
		component: "AdminStaffEdit",
	},
	{
		path: "/admin/roles",
		component: "AdminRoleIndex",
	},
	{
		path: "/admin/roles/create",
		component: "AdminRoleCreate",
	},
	{
		path: "/admin/roles/:id/edit",
		component: "AdminRoleEdit",
	},
	// Support
	{
		path: "/admin/support",
		component: "AdminSupport",
	},
]

// Combine all admin routes
adminRoutes.push(
	...propertyRoutes,
	...unitRoutes,
	...tenantRoutes,
	...financialRoutes
)

export default adminRoutes
