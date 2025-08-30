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

const SuperNavLinks = (props) => {
	const location = useLocation()
	const history = useHistory()

	// Function for showing active color
	const active = (check) => {
		return location.pathname.match(check) && "text-primary"
	}

	// Function for showing active color
	const activeStrict = (check) => {
		return (
			location.pathname == check && "rounded-0 text-primary bg-primary-subtle"
		)
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
			link: "/super/emails",
			icon: <EmailSVG />,
			name: "Emails",
		},
		{
			link: "/super/smses",
			icon: <ChatSVG />,
			name: "SMSes",
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
			link: "/super/support",
			icon: <SupportSVG />,
			name: "Support",
		},
	]

	return (
		<React.Fragment>
			{navLinks.map((navLink, key) => (
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
			))}

			{/* Mobile Start */}
			{navLinks.map((navLink, key) => (
				<li
					key={key}
					className="nav-item anti-hidden"
					onClick={() => props.setAdminMenu("")}>
					<Link
						to={navLink.link}
						className={`nav-link ${active(navLink.link)}`}>
						<div className="nav-link-icon">{navLink.icon}</div>
						<div className="nav-link-text">{navLink.name}</div>
					</Link>
				</li>
			))}
			{/* Mobile End */}
		</React.Fragment>
	)
}

export default SuperNavLinks