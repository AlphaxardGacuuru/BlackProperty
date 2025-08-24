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

const TenantNavLinks = (props) => {
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
			link: "/tenant/dashboard",
			icon: <HomeSVG />,
			name: "Dashboard",
		},
		{
			link: `/tenant/tenants/${props.auth.id}/show`,
			icon: <TenantSVG />,
			name: "Tenant",
		},
		{
			link: "/tenant/support",
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

export default TenantNavLinks
