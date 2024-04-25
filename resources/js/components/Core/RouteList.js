import React from "react"
import { Route } from "react-router-dom"

import Index from "@/pages/index"
import Blog from "@/pages/blog"
import Contact from "@/pages/contact"
import Courses from "@/pages/courses"
import Elements from "@/pages/elements"

import AdminNav from "@/components/Layouts/AdminNav"

import Login from "@/pages/login"
import AdminDashboard from "@/pages/admin/index"

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

import AdminFaculties from "@/pages/admin/faculties/index"
import AdminFacultyCreate from "@/pages/admin/faculties/create"
import AdminFacultyShow from "@/pages/admin/faculties/[id]"
import AdminFacultyEdit from "@/pages/admin/faculties/edit/[id]"

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

import AdminSessions from "@/pages/admin/sessions/index"
import AdminSessionCreate from "@/pages/admin/sessions/create"
import AdminSessionEdit from "@/pages/admin/sessions/edit/[id]"

import AdminChat from "@/pages/admin/chats/index"
import AdminChatNew from "@/pages/admin/chats/new"
import AdminChatView from "@/pages/admin/chats/[id]"

import AdminStaff from "@/pages/admin/staff/index"
import AdminStaffCreate from "@/pages/admin/staff/create"
import AdminStaffEdit from "@/pages/admin/staff/edit/[id]"

import AdminRoleIndex from "@/pages/admin/role"
import AdminRoleCreate from "@/pages/admin/role/create"
import AdminRoleEdit from "@/pages/admin/role/edit/[id]"

import AdminResources from "@/pages/admin/resources/index"

const RouteList = ({ GLOBAL_STATE }) => {
	const routes = [
		{
			path: "/",
			component: <Index {...GLOBAL_STATE} />,
		},
		{
			path: "/blog",
			component: <Blog {...GLOBAL_STATE} />,
		},
		{
			path: "/contact",
			component: <Contact {...GLOBAL_STATE} />,
		},
		{
			path: "/courses",
			component: <Courses {...GLOBAL_STATE} />,
		},
		{
			path: "/elements",
			component: <Elements {...GLOBAL_STATE} />,
		},
		{
			path: "/login",
			component: <Login {...GLOBAL_STATE} />,
		},
	]

	// Admin Routes
	const adminRoutes = [
		{
			path: "/admin/dashboard",
			component: <AdminDashboard {...GLOBAL_STATE} />,
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
			path: "/admin/faculties",
			component: <AdminFaculties {...GLOBAL_STATE} />,
		},
		{
			path: "/admin/faculties/create",
			component: <AdminFacultyCreate {...GLOBAL_STATE} />,
		},
		{
			path: "/admin/faculties/:id/show",
			component: <AdminFacultyShow {...GLOBAL_STATE} />,
		},
		{
			path: "/admin/faculties/:id/edit",
			component: <AdminFacultyEdit {...GLOBAL_STATE} />,
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
			path: "/admin/sessions",
			component: <AdminSessions {...GLOBAL_STATE} />,
		},
		{
			path: "/admin/sessions/create",
			component: <AdminSessionCreate {...GLOBAL_STATE} />,
		},
		{
			path: "/admin/sessions/:id/edit",
			component: <AdminSessionEdit {...GLOBAL_STATE} />,
		},
		{
			path: "/admin/chats",
			component: <AdminChat {...GLOBAL_STATE} />,
		},
		{
			path: "/admin/chats/new",
			component: <AdminChatNew {...GLOBAL_STATE} />,
		},
		{
			path: "/admin/chats/view/:id",
			component: <AdminChatView {...GLOBAL_STATE} />,
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

	const instructorRoutes = [
		{
			path: "/instructor/:id/show",
			component: <AdminInstructorShow {...GLOBAL_STATE} />,
		},
		{
			path: "/instructor/courses/:id/show",
			component: <AdminCourseShow {...GLOBAL_STATE} />,
		},
		{
			path: "/instructor/units/:id/show",
			component: <AdminUnitShow {...GLOBAL_STATE} />,
		},
		{
			path: "/instructor/resources",
			component: <AdminResources {...GLOBAL_STATE} />,
		},
		{
			path: "/instructor/chats",
			component: <AdminChat {...GLOBAL_STATE} />,
		},
		{
			path: "/instructor/chats/new",
			component: <AdminChatNew {...GLOBAL_STATE} />,
		},
		{
			path: "/instructor/chats/view/:id",
			component: <AdminChatView {...GLOBAL_STATE} />,
		},
	]

	const studentRoutes = [
		{
			path: "/student/:id/show",
			component: <AdminInstructorShow {...GLOBAL_STATE} />,
		},
		{
			path: "/student/courses",
			component: <AdminCourses {...GLOBAL_STATE} />,
		},
		{
			path: "/student/courses/:id/show",
			component: <AdminCourseShow {...GLOBAL_STATE} />,
		},
		{
			path: "/student/units/:id/show",
			component: <AdminUnitShow {...GLOBAL_STATE} />,
		},
		{
			path: "/student/resources",
			component: <AdminResources {...GLOBAL_STATE} />,
		},
		{
			path: "/student/chats",
			component: <AdminChat {...GLOBAL_STATE} />,
		},
		{
			path: "/student/chats/new",
			component: <AdminChatNew {...GLOBAL_STATE} />,
		},
		{
			path: "/student/chats/view/:id",
			component: <AdminChatView {...GLOBAL_STATE} />,
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

				{/* Instructor Routes */}
				{instructorRoutes.map((route, key) => (
					<Route
						key={key}
						path={route.path}
						exact
						render={() => route.component}
					/>
				))}
				{/* Instructor Routes End */}

				{/* Student Routes */}
				{studentRoutes.map((route, key) => (
					<Route
						key={key}
						path={route.path}
						exact
						render={() => route.component}
					/>
				))}
				{/* Student Routes End */}
			</AdminNav>
		</React.Fragment>
	)
}

export default RouteList
