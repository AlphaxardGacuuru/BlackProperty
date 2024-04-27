import React from "react"
import { Route } from "react-router-dom"

import Index from "@/pages/index"

import AdminNav from "@/components/Layouts/AdminNav"

import AdminDashboard from "@/pages/admin/index"

import AdminProperties from "@/pages/admin/properties/index"
import AdminPropertyCreate from "@/pages/admin/properties/create"
import AdminPropertyShow from "@/pages/admin/properties/[id]"
import AdminPropertyEdit from "@/pages/admin/properties/edit/[id]"

import AdminUnits from "@/pages/admin/units/index"
import AdminUnitCreate from "@/pages/admin/units/create"
import AdminUnitShow from "@/pages/admin/units/[id]"
import AdminUnitEdit from "@/pages/admin/units/edit/[id]"

import AdminTenants from "@/pages/admin/tenants/index"
import AdminTenantCreate from "@/pages/admin/tenants/create"
import AdminTenantShow from "@/pages/admin/tenants/[id]"
import AdminTenantEdit from "@/pages/admin/tenants/edit/[id]"

import AdminFinanceTransaction from "@/pages/admin/finance/transactions/index"
import AdminFinanceWallet from "@/pages/admin/finance/wallet/index"
import AdminFinanceWalletCreate from "@/pages/admin/finance/wallet/create"

import AdminStaff from "@/pages/admin/staff/index"
import AdminStaffCreate from "@/pages/admin/staff/create"
import AdminStaffEdit from "@/pages/admin/staff/edit/[id]"

import AdminRoleIndex from "@/pages/admin/role"
import AdminRoleCreate from "@/pages/admin/role/create"
import AdminRoleEdit from "@/pages/admin/role/edit/[id]"

const RouteList = ({ GLOBAL_STATE }) => {
	const routes = [
		{
			path: "/",
			component: <Index {...GLOBAL_STATE} />,
		},
	]

	// Admin Routes
	const adminRoutes = [
		{
			path: "/admin/dashboard",
			component: <AdminDashboard {...GLOBAL_STATE} />,
		},
		{
			path: "/admin/properties",
			component: <AdminProperties {...GLOBAL_STATE} />,
		},
		{
			path: "/admin/properties/create",
			component: <AdminPropertyCreate {...GLOBAL_STATE} />,
		},
		{
			path: "/admin/properties/:id/show",
			component: <AdminPropertyShow {...GLOBAL_STATE} />,
		},
		{
			path: "/admin/properties/:id/edit",
			component: <AdminPropertyEdit {...GLOBAL_STATE} />,
		},
		{
			path: "/admin/units",
			component: <AdminUnits {...GLOBAL_STATE} />,
		},
		{
			path: "/admin/units/:id/create",
			component: <AdminUnitCreate {...GLOBAL_STATE} />,
		},
		{
			path: "/admin/units/:id/show",
			component: <AdminUnitShow {...GLOBAL_STATE} />,
		},
		{
			path: "/admin/units/:id/edit",
			component: <AdminUnitEdit {...GLOBAL_STATE} />,
		},
		{
			path: "/admin/tenants",
			component: <AdminTenants {...GLOBAL_STATE} />,
		},
		{
			path: "/admin/tenants/:id/create",
			component: <AdminTenantCreate {...GLOBAL_STATE} />,
		},
		{
			path: "/admin/tenants/:id/show",
			component: <AdminTenantShow {...GLOBAL_STATE} />,
		},
		{
			path: "/admin/tenants/:id/edit",
			component: <AdminTenantEdit {...GLOBAL_STATE} />,
		},
		{
			path: "/admin/finance/transactions",
			component: <AdminFinanceTransaction {...GLOBAL_STATE} />,
		},
		{
			path: "/admin/finance/wallet",
			component: <AdminFinanceWallet {...GLOBAL_STATE} />,
		},
		{
			path: "/admin/finance/wallet/create",
			component: <AdminFinanceWalletCreate {...GLOBAL_STATE} />,
		},
		{
			path: "/admin/staff",
			component: <AdminStaff {...GLOBAL_STATE} />,
		},
		{
			path: "/admin/staff/:id/create",
			component: <AdminStaffCreate {...GLOBAL_STATE} />,
		},
		{
			path: "/admin/staff/:id/edit",
			component: <AdminStaffEdit {...GLOBAL_STATE} />,
		},
		{ path: "/admin/roles", component: <AdminRoleIndex {...GLOBAL_STATE} /> },
		{
			path: "/admin/roles/create",
			component: <AdminRoleCreate {...GLOBAL_STATE} />,
		},
		{
			path: "/admin/roles/:id/edit",
			component: <AdminRoleEdit {...GLOBAL_STATE} />,
		},
	]

	return (
		<React.Fragment>
			{/* Landing Page routes */}
			{routes.map((route, key) => (
				<Route
					key={key}
					path={route.path}
					exact
					render={() => route.component}
				/>
			))}
			{/* Landing Page routes End */}

			<AdminNav {...GLOBAL_STATE}>
				{/* Admin Routes */}
				{adminRoutes.map((route, key) => (
					<Route
						key={key}
						path={route.path}
						exact
						render={() => route.component}
					/>
				))}
				{/* Admin Routes End */}
			</AdminNav>
		</React.Fragment>
	)
}

export default RouteList
