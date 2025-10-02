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
import ReferralSVG from "@/svgs/ReferralSVG"
import SubscriptionPlanSVG from "@/svgs/SubscriptionPlanSVG"
import UserAdmissionSVG from "@/svgs/UserAdmissionSVG"

const SuperNavLinks = (props) => {
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
			link: "/super/dashboard",
			icon: <HomeSVG />,
			name: "Dashboard",
		},
		{
			link: "/super/properties",
			icon: <PropertySVG />,
			name: "Properties",
		},
		{
			link: "/super/units",
			icon: <UnitSVG />,
			name: "Units",
		},
		{
			link: "/super/tenants",
			icon: <TenantSVG />,
			name: "Tenants",
		},
		{
			link: "/super/water-readings",
			icon: <WaterReadingSVG />,
			name: "Water Readings",
		},
		{
			link: "/super/invoices",
			icon: <InvoiceSVG />,
			name: "Invoices",
		},
		{
			link: "/super/payments",
			icon: <PaymentSVG />,
			name: "Payments",
		},
		{
			link: "/super/credit-notes",
			icon: <CreditNoteSVG />,
			name: "Credit Notes",
		},
		{
			link: "/super/deductions",
			icon: <DeductionSVG />,
			name: "Deductions",
		},
		{
			collapse: "Communication",
			icon: <EmailSVG />,
			links: [
				{
					link: "/super/emails",
					icon: <EmailSVG />,
					name: "Emails",
				},
				{
					link: "/super/smses",
					icon: <ChatSVG />,
					name: "SMSes",
				},
			],
		},
		{
			link: "/super/staff",
			icon: <StaffSVG />,
			name: "Staff",
		},
		{
			link: "/super/roles",
			icon: <PersonGearSVG />,
			name: "Roles",
		},
		{
			link: "/super/referrals",
			icon: <ReferralSVG />,
			name: "Referrals",
		},
		{
			collapse: "Subscription",
			icon: <SubscriptionPlanSVG />,
			links: [
				{
					link: "/super/subscription-plans",
					icon: <SubscriptionPlanSVG />,
					name: "Plans",
				},
				{
					link: "/super/user-subscription-plans",
					icon: <SubscriptionPlanSVG />,
					name: "User Plans",
				},
			],
		},
		{
			link: "/super/support",
			icon: <SupportSVG />,
			name: "Support",
		},
	]

	return (
		<React.Fragment>
			{navLinks.map((navLink, key) => (
				<React.Fragment key={key}>
					{!navLink.collapse ? (
						<li
							key={key}
							className="nav-item hidden">
							<Link
								to={navLink.link}
								className={`nav-link ${active(navLink.link)}`}>
								<div className="nav-link-icon">{navLink.icon}</div>
								<div className="nav-link-text">{navLink.name}</div>
							</Link>
						</li>
					) : (
						<li className="nav-item hidden">
							<Link
								to={navLink.link}
								className={`nav-link accordion-button my-1 `}
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
											className="nav-item"
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
							className="nav-item anti-hidden">
							<Link
								to={navLink.link}
								className={`nav-link ${active(navLink.link)}`}
								onClick={() => props.setAdminMenu("")}>
								<div className="nav-link-icon">{navLink.icon}</div>
								<div className="nav-link-text">{navLink.name}</div>
							</Link>
						</li>
					) : (
						<li className="nav-item anti-hidden">
							<Link
								to={navLink.link}
								className={`nav-link accordion-button my-1 ${active(
									navLink.link
								)}`}
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
											className="nav-item"
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

export default SuperNavLinks
