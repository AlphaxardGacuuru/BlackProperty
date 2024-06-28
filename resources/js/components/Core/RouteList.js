import React from "react"
import { Route } from "react-router-dom"

import Header from "@/components/Layouts/Header"
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
import AdminTenantEdit from "@/pages/admin/tenants/edit/[id]"

import AdminInvoices from "@/pages/admin/invoices/index"
import AdminInvoiceCreate from "@/pages/admin/invoices/create"
import AdminInvoiceShow from "@/pages/admin/invoices/[id]"
import AdminInvoiceEdit from "@/pages/admin/invoices/edit/[id]"

import AdminWaterReadings from "@/pages/admin/water-readings/index"
import AdminWaterReadingCreate from "@/pages/admin/water-readings/create"
import AdminWaterReadingEdit from "@/pages/admin/water-readings/edit/[id]"

import AdminPayments from "@/pages/admin/payments/index"
import AdminPaymentCreate from "@/pages/admin/payments/create"
import AdminPaymentEdit from "@/pages/admin/payments/edit/[id]"

import AdminCreditNotes from "@/pages/admin/credit-notes/index"
import AdminCreditNoteCreate from "@/pages/admin/credit-notes/create"
import AdminCreditNoteEdit from "@/pages/admin/credit-notes/edit/[id]"

import AdminWallet from "@/pages/admin/wallet/index"
import AdminWalletCreate from "@/pages/admin/wallet/create"

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
			path: "/admin/tenants/:id/edit",
			component: <AdminTenantEdit {...GLOBAL_STATE} />,
		},
		{
			path: "/admin/invoices",
			component: <AdminInvoices {...GLOBAL_STATE} />,
		},
		{
			path: "/admin/invoices/create",
			component: <AdminInvoiceCreate {...GLOBAL_STATE} />,
		},
		{
			path: "/admin/invoices/:id/show",
			component: <AdminInvoiceShow {...GLOBAL_STATE} />,
		},
		{
			path: "/admin/invoices/:id/edit",
			component: <AdminInvoiceEdit {...GLOBAL_STATE} />,
		},
		{
			path: "/admin/water-readings",
			component: <AdminWaterReadings {...GLOBAL_STATE} />,
		},
		{
			path: "/admin/water-readings/create",
			component: <AdminWaterReadingCreate {...GLOBAL_STATE} />,
		},
		{
			path: "/admin/water-readings/:id/edit",
			component: <AdminWaterReadingEdit {...GLOBAL_STATE} />,
		},
		{
			path: "/admin/payments",
			component: <AdminPayments {...GLOBAL_STATE} />,
		},
		{
			path: "/admin/payments/:id/create",
			component: <AdminPaymentCreate {...GLOBAL_STATE} />,
		},
		{
			path: "/admin/payments/:id/edit",
			component: <AdminPaymentEdit {...GLOBAL_STATE} />,
		},
		{
			path: "/admin/credit-notes",
			component: <AdminCreditNotes {...GLOBAL_STATE} />,
		},
		{
			path: "/admin/credit-notes/:id/create",
			component: <AdminCreditNoteCreate {...GLOBAL_STATE} />,
		},
		{
			path: "/admin/credit-notes/:id/edit",
			component: <AdminCreditNoteEdit {...GLOBAL_STATE} />,
		},
		{
			path: "/admin/wallet",
			component: <AdminWallet {...GLOBAL_STATE} />,
		},
		{
			path: "/admin/wallet/create",
			component: <AdminWalletCreate {...GLOBAL_STATE} />,
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
			<Header {...GLOBAL_STATE}>
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
			</Header>

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
