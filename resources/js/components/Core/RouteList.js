import React from "react"
import { Route } from "react-router-dom"

import Index from "@/pages/index"

import AdminNav from "@/components/Layouts/AdminNav"

import AdminDashboard from "@/pages/admin/index"

import AdminProperties from "@/pages/admin/properties/index"
import AdminPropertyCreate from "@/pages/admin/properties/create"
import AdminPropertyShow from "@/pages/admin/properties/[id]"
import AdminPropertyEdit from "@/pages/admin/properties/edit/[id]"

import AdminFinanceTransaction from "@/pages/admin/finance/transactions/index"
import AdminFinanceWallet from "@/pages/admin/finance/wallet/index"
import AdminFinanceWalletCreate from "@/pages/admin/finance/wallet/create"

import AdminInstructors from "@/pages/admin/instructors/index"
import AdminInstructorCreate from "@/pages/admin/instructors/create"
import AdminInstructorShow from "@/pages/admin/instructors/[id]"
import AdminInstructorEdit from "@/pages/admin/instructors/edit/[id]"

import AdminStudents from "@/pages/admin/students/index"
import AdminStudentCreate from "@/pages/admin/students/create"
import AdminStudentEdit from "@/pages/admin/students/edit/[id]"

import AdminDepartmentCreate from "@/pages/admin/departments/create"
import AdminDepartmentEdit from "@/pages/admin/departments/edit/[id]"

import AdminCourses from "@/pages/admin/courses/index"
import AdminCourseCreate from "@/pages/admin/courses/create"
import AdminCourseShow from "@/pages/admin/courses/[id]"
import AdminCourseEdit from "@/pages/admin/courses/edit/[id]"

import AdminUnitCreate from "@/pages/admin/units/create"
import AdminUnitShow from "@/pages/admin/units/[id]"
import AdminUnitEdit from "@/pages/admin/units/edit/[id]"

import AdminMaterialCreate from "@/pages/admin/materials/create"
import AdminMaterialEdit from "@/pages/admin/materials/edit/[id]"

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
			path: "/admin/instructors",
			component: <AdminInstructors {...GLOBAL_STATE} />,
		},
		{
			path: "/admin/instructors/create",
			component: <AdminInstructorCreate {...GLOBAL_STATE} />,
		},
		{
			path: "/admin/instructors/:id/show",
			component: <AdminInstructorShow {...GLOBAL_STATE} />,
		},
		{
			path: "/admin/instructors/:id/edit",
			component: <AdminInstructorEdit {...GLOBAL_STATE} />,
		},
		{
			path: "/admin/students",
			component: <AdminStudents {...GLOBAL_STATE} />,
		},
		{
			path: "/admin/students/create",
			component: <AdminStudentCreate {...GLOBAL_STATE} />,
		},
		{
			path: "/admin/students/:id/show",
			component: <AdminInstructorShow {...GLOBAL_STATE} />,
		},
		{
			path: "/admin/students/:id/edit",
			component: <AdminStudentEdit {...GLOBAL_STATE} />,
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
			path: "/admin/departments/:id/create",
			component: <AdminDepartmentCreate {...GLOBAL_STATE} />,
		},
		{
			path: "/admin/departments/:id/edit",
			component: <AdminDepartmentEdit {...GLOBAL_STATE} />,
		},
		{
			path: "/admin/courses",
			component: <AdminCourses {...GLOBAL_STATE} />,
		},
		{
			path: "/admin/courses/create",
			component: <AdminCourseCreate {...GLOBAL_STATE} />,
		},
		{
			path: "/admin/courses/:id/show",
			component: <AdminCourseShow {...GLOBAL_STATE} />,
		},
		{
			path: "/admin/courses/:id/edit",
			component: <AdminCourseEdit {...GLOBAL_STATE} />,
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
			path: "/admin/materials/:id/create",
			component: <AdminMaterialCreate {...GLOBAL_STATE} />,
		},
		{
			path: "/admin/materials/:id/edit",
			component: <AdminMaterialEdit {...GLOBAL_STATE} />,
		},
		{
			path: "/admin/staff",
			component: <AdminStaff {...GLOBAL_STATE} />,
		},
		{
			path: "/admin/staff/create",
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
