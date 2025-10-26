import React, { useEffect, useState } from "react"
import {
	Link,
	useLocation,
	useHistory,
} from "react-router-dom/cjs/react-router-dom.min"

import PersonSVG from "@/svgs/PersonSVG"
import HomeSVG from "@/svgs/HomeSVG"
import PropertySVG from "@/svgs/PropertySVG"
import StaffSVG from "@/svgs/StaffSVG"
import MoneySVG from "@/svgs/MoneySVG"
import WalletSVG from "@/svgs/WalletSVG"
import PersonGearSVG from "@/svgs/PersonGearSVG"
import PaymentSVG from "@/svgs/PaymentSVG"
import InvoiceSVG from "@/svgs/InvoiceSVG"
import WaterReadingSVG from "@/svgs/WaterReadingSVG"
import CreditNoteSVG from "@/svgs/CreditNoteSVG"
import UnitSVG from "@/svgs/UnitSVG"
import TenantSVG from "@/svgs/TenantSVG"
import DeductionSVG from "@/svgs/DeductionSVG"
import EmailSVG from "@/svgs/EmailSVG"
import ChatSVG from "@/svgs/ChatSVG"
import BillableSVG from "@/svgs/BillableSVG"
import SupportSVG from "@/svgs/SupportSVG"
import BillingSVG from "@/svgs/BillingSVG"
import VisitorAdmissionSVG from "@/svgs/VisitorAdmissionSVG"
import SettingsSVG from "@/svgs/SettingsSVG"
import ReferralSVG from "@/svgs/ReferralSVG"
import BellSVG from "@/svgs/BellSVG"

const AdminNavLinks = (props) => {
	const location = useLocation()
	const history = useHistory()

	// Function for showing active color
	const active = (check) => {
		return location.pathname.match(check) && "text-primary"
	}

	// Function for showing active color
	const activeStrict = (check) => {
		return location.pathname == check && "text-primary"
	}

	const navLinks = [
		{
			link: "/admin/dashboard",
			icon: <HomeSVG />,
			name: "Dashboard",
		},
		{
			link: "/admin/properties",
			icon: <PropertySVG />,
			name: "Properties",
		},
		{
			link: "/admin/units",
			icon: <UnitSVG />,
			name: "Units",
		},
		{
			link: "/admin/tenants",
			icon: <TenantSVG />,
			name: "Tenants",
		},
		{
			link: "/admin/water-readings",
			icon: <WaterReadingSVG />,
			name: "Water Readings",
		},
		{
			link: "/admin/invoices",
			icon: <InvoiceSVG />,
			name: "Invoices",
		},
		{
			link: "/admin/payments",
			icon: <PaymentSVG />,
			name: "Payments",
		},
		{
			link: "/admin/credit-notes",
			icon: <CreditNoteSVG />,
			name: "Credit Notes",
		},
		{
			link: "/admin/deductions",
			icon: <DeductionSVG />,
			name: "Deductions",
		},
		{
			collapse: "Communication",
			icon: <EmailSVG />,
			links: [
				{
					link: "/admin/emails",
					icon: <EmailSVG />,
					name: "Emails",
				},
				{
					link: "/admin/smses",
					icon: <ChatSVG />,
					name: "SMSes",
				},
			],
		},
		{
			link: "/admin/staff",
			icon: <StaffSVG />,
			name: "Staff",
		},
		{
			link: "/admin/visitor-admissions",
			icon: <VisitorAdmissionSVG />,
			name: "Visitor Admissions",
		},
		{
			collapse: "Settings",
			icon: <SettingsSVG />,
			links: [
				{
					link: "/admin/billing",
					icon: <BillingSVG />,
					name: "Billing",
				},
				{
					link: "/admin/support",
					icon: <SupportSVG />,
					name: "Support",
				},
			],
		},
	]

	// Check if user has properties so as to show staff or roles
	const canStaffOrRole = (entity) => {
		if (["Staff", "Roles"].includes(entity)) {
			return props.auth.propertyIds.length > 0 ? "" : "d-none"
		}
	}

	/*
	 * Handle Permissions
	 */
	const can = (entity) => {
		if (
			props.auth.propertyIds.length > 0 ||
			["staff", "roles"].includes(entity)
		) {
			return
		}

		if (Array.isArray(entity)) {
			var hasAtleastOnePersmission = entity.some((entityName) => {
				if (["billing", "support"].includes(entityName)) {
					return true
				} else {
					return props.auth.permissions.some((permission) =>
						permission.match(entity)
					)
						? ""
						: "d-none"
				}
			})

			return hasAtleastOnePersmission ? "" : "d-none"
		} else {
			return props.auth.permissions.some((permission) =>
				permission.match(entity)
			)
				? ""
				: "d-none"
		}
	}

	return (
		<React.Fragment>
			{navLinks.map((navLink, key) => (
				<React.Fragment key={key}>
					{!navLink.collapse ? (
						<li
							key={key}
							className={`nav-item hidden ${canStaffOrRole(navLink.name)} ${can(
								navLink.name.toLowerCase()
							)}`}>
							<Link
								to={navLink.link}
								className={`nav-link ${active(navLink.link)}`}>
								<div className="nav-link-icon">{navLink.icon}</div>
								<div className="nav-link-text">{navLink.name}</div>
							</Link>
						</li>
					) : (
						<li
							className={`nav-item hidden ${canStaffOrRole(navLink.name)} ${can(
								navLink.links.map((link) => link.name.toLowerCase())
							)}`}>
							<Link
								to={navLink.link}
								className={`nav-link accordion-button my-1 ${navLink.links
									.map((link) => active(link.link))
									.join(" ")}`}
								data-bs-toggle="collapse"
								data-bs-target={`#collapse${key}`}
								aria-expanded="false"
								aria-controls={`collapse${key}`}>
								<div className="nav-link-icon">{navLink.icon}</div>
								<div className="nav-link-text">{navLink.collapse}</div>
							</Link>

							{/* Collapse */}
							<div
								className={"collapse"}
								id={`collapse${key}`}>
								<ol className="ms-4">
									{/* Link Start */}
									{navLink.links.map((link, index) => (
										<li
											className={`nav-item ${can(link.name.toLowerCase())}`}
											key={index}>
											<Link
												to={link.link}
												className={`nav-link ${activeStrict(link.link)}`}>
												<div className="nav-link-icon">{link.icon}</div>
												<div className="nav-link-text">{link.name}</div>
											</Link>
										</li>
									))}
									{/* Link End */}
								</ol>
							</div>
							{/* Collapse End */}
						</li>
					)}
				</React.Fragment>
			))}

			{/* Mobile Start */}
			{navLinks.map((navLink, key) => (
				<React.Fragment key={key}>
					{!navLink.collapse ? (
						<li
							key={key}
							className={`nav-item anti-hidden ${canStaffOrRole(
								navLink.name
							)} ${can(navLink.name.toLowerCase())}`}>
							<Link
								to={navLink.link}
								className={`nav-link ${active(navLink.link)}`}
								onClick={() => props.setAdminMenu("")}>
								<div className="nav-link-icon">{navLink.icon}</div>
								<div className="nav-link-text">{navLink.name}</div>
							</Link>
						</li>
					) : (
						<li
							className={`nav-item anti-hidden ${canStaffOrRole(
								navLink.name
							)} ${can(navLink.links.map((link) => link.name.toLowerCase()))}`}>
							<Link
								to={navLink.link}
								className={`nav-link accordion-button my-1 ${navLink.links
									.map((link) => active(link.link))
									.join(" ")}`}
								data-bs-toggle="collapse"
								data-bs-target={`#collapse${key}`}
								aria-expanded="false"
								aria-controls={`collapse${key}`}>
								<div className="nav-link-icon">{navLink.icon}</div>
								<div className="nav-link-text">{navLink.collapse}</div>
							</Link>

							{/* Collapse */}
							<div
								className={"collapse"}
								id={`collapse${key}`}>
								<ol className="ms-4">
									{/* Link Start */}
									{navLink.links.map((link, index) => (
										<li
											className={`nav-item ${can(link.name.toLowerCase())}`}
											key={index}>
											<Link
												to={link.link}
												className={`nav-link ${activeStrict(link.link)}`}
												onClick={() => props.setAdminMenu("")}>
												<div className="nav-link-icon">{link.icon}</div>
												<div className="nav-link-text">{link.name}</div>
											</Link>
										</li>
									))}
									{/* Link End */}
								</ol>
							</div>
							{/* Collapse End */}
						</li>
					)}
				</React.Fragment>
			))}
			{/* Mobile End */}
		</React.Fragment>
	)
}

export default AdminNavLinks
