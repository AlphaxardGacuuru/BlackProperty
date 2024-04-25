import React from "react"
import { Link, useLocation } from "react-router-dom"

import PersonSVG from "@/svgs/PersonSVG"
import HomeSVG from "@/svgs/HomeSVG"
import FacultySVG from "@/svgs/FacultySVG"
import CourseSVG from "@/svgs/CourseSVG"
import StaffSVG from "@/svgs/StaffSVG"
import StudentSVG from "@/svgs/StudentSVG"
import SessionSVG from "@/svgs/SessionSVG"
import MoneySVG from "@/svgs/MoneySVG"
import TransactionSVG from "@/svgs/TransactionSVG"
import WalletSVG from "@/svgs/WalletSVG"
import ChatSVG from "@/svgs/ChatSVG"
import LinkSVG from "@/svgs/LinkSVG"
import ResourceSVG from "@/svgs/ResourceSVG"
import PersonGearSVG from "@/svgs/PersonGearSVG"

const AdminNavLinks = () => {
	const location = useLocation()

	// Function for showing active color
	const active = (check) => {
		return (
			location.pathname.match(check) &&
			"rounded-end-pill text-primary bg-primary-subtle"
		)
	}

	// Function for showing active color
	const activeStrict = (check) => {
		return (
			location.pathname == check &&
			"rounded-end-pill text-primary bg-primary-subtle"
		)
	}

	return (
		<React.Fragment>
			{/* Dashboard Link */}
			<li className="nav-item">
				<Link
					to={`/admin/dashboard`}
					className={`nav-link ${activeStrict("/admin/dashboard")}`}>
					<div className="nav-link-icon">
						<HomeSVG />
					</div>
					<div className="nav-link-text">Dashboard</div>
				</Link>
			</li>
			{/* Dashboard Link End */}
			{/* Finance Links */}
			<li className="nav-item">
				<a
					href="#"
					className={`nav-link accordion-button ${active("/admin/finance/")}`}
					data-bs-toggle="collapse"
					data-bs-target="#collapseFinance"
					aria-expanded="false"
					aria-controls="collapseFinance">
					<div className="nav-link-icon">
						<MoneySVG />
					</div>
					<div className="nav-link-text">Finance</div>
				</a>

				{/* Collapse */}
				<div
					className={!location.pathname.match("finance") ? "collapse" : ""}
					id="collapseFinance">
					<ol className="ms-4">
						{/* Transactions */}
						<li className="nav-item">
							<Link
								to={`/admin/finance/transactions`}
								className={`nav-link ${activeStrict(
									"/admin/finance/transactions"
								)}`}>
								<div className="nav-link-icon">
									<TransactionSVG />
								</div>
								<div className="nav-link-text">Trasactions</div>
							</Link>
						</li>
						{/* Transactions End */}
						{/* Wallet */}
						<li className="nav-item">
							<Link
								to={`/admin/finance/wallet`}
								className={`nav-link ${activeStrict("/admin/finance/wallet")}`}>
								<div className="nav-link-icon">
									<WalletSVG />
								</div>
								<div className="nav-link-text">Wallet</div>
							</Link>
						</li>
						{/* Wallet End */}
					</ol>
				</div>
				{/* Collapse End */}
			</li>
			{/* Finance Links End */}
			{/* Customers Link */}
			<li className="nav-item">
				<Link
					to={`/admin/instructors`}
					className={`nav-link ${active("/admin/instructors")}`}>
					<div className="nav-link-icon">
						<PersonSVG />
					</div>
					<div className="nav-link-text">Instructors</div>
				</Link>
			</li>
			{/* Customers Link End */}
			{/* Students Link */}
			<li className="nav-item">
				<Link
					to={`/admin/students`}
					className={`nav-link ${
						active("/admin/students") || active("/admin/students")
					}`}>
					<div className="nav-link-icon">
						<StudentSVG />
					</div>
					<div className="nav-link-text">Students</div>
				</Link>
			</li>
			{/* Students Link End */}
			{/* Faculties Link */}
			<li className="nav-item">
				<Link
					to={`/admin/faculties`}
					className={`nav-link ${active("/admin/faculties")}`}>
					<div className="nav-link-icon">
						<FacultySVG />
					</div>
					<div className="nav-link-text">Faculties</div>
				</Link>
			</li>
			{/* Faculties Link End */}
			{/* Courses Link */}
			<li className="nav-item">
				<Link
					to={`/admin/courses`}
					className={`nav-link ${
						active("/admin/courses") ||
						active("/admin/units") ||
						active("/admin/materials")
					}`}>
					<div className="nav-link-icon">
						<CourseSVG />
					</div>
					<div className="nav-link-text">Courses</div>
				</Link>
			</li>
			{/* Courses Link End */}
			{/* Sessions Link */}
			<li className="nav-item">
				<Link
					to={`/admin/sessions`}
					className={`nav-link ${active("/admin/sessions")}`}>
					<div className="nav-link-icon">
						<SessionSVG />
					</div>
					<div className="nav-link-text">Sessions</div>
				</Link>
			</li>
			{/* Sessions Link End */}
			{/* Chat Links */}
			{/* <li className="nav-item">
									<Link
										to={`/admin/chats`}
										className={`nav-link ${active("/admin/chats")}`}>
										<div className="nav-link-icon">
											<ChatSVG />
										</div>
										<div className="nav-link-text">Chat</div>
									</Link>
								</li> */}
			{/* Chat Link End */}
			{/* Staff Links */}
			<li className="nav-item">
				<Link
					to={`/admin/staff`}
					className={`nav-link ${active("/admin/staff")}`}>
					<div className="nav-link-icon">
						<StaffSVG />
					</div>
					<div className="nav-link-text">Staff</div>
				</Link>
			</li>
			{/* Staff Link End */}
			{/* Roles Links */}
			<li className="nav-item">
				<Link
					to={`/admin/roles`}
					className={`nav-link ${active("/admin/roles")}`}>
					<div className="nav-link-icon">
						<PersonGearSVG />
					</div>
					<div className="nav-link-text">Roles</div>
				</Link>
			</li>
			{/* Roles Link End */}
		</React.Fragment>
	)
}

export default AdminNavLinks
