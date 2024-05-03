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
import TransactionSVG from "@/svgs/TransactionSVG"
import WalletSVG from "@/svgs/WalletSVG"
import PersonGearSVG from "@/svgs/PersonGearSVG"
import UnitSVG from "@/svgs/UnitSVG"
import PaymentSVG from "@/svgs/PaymentSVG"
import InvoiceSVG from "@/svgs/InvoiceSVG"

const AdminNavLinks = (props) => {
	const location = useLocation()
	const history = useHistory()

	const [properties, setProperties] = useState([])

	useEffect(() => {
		props.get(`properties/by-user-id/${props.auth.id}`, setProperties)

		if (props.auth.name == "Guest") {
			history.push("/admin")
		}
	}, [])

	// Function for showing active color
	const active = (check) => {
		return (
			location.pathname.match(check) &&
			"text-primary border-bottom border-primary mx-2"
			// "rounded-0 text-primary bg-primary-subtle mx-1"
		)
	}

	// Function for showing active color
	const activeStrict = (check) => {
		return (
			location.pathname == check && "rounded-0 text-primary bg-primary-subtle"
		)
	}

	return (
		<React.Fragment>
			<li>
				<Link
					to="/"
					style={{
						color: location.pathname == "/" ? "gold" : "white",
					}}
					className="nav-link"
					onClick={() => setMenu("")}>
					<span
						style={{
							float: "left",
							paddingRight: "20px",
							color: location.pathname == "/" ? "gold" : "white",
						}}>
						<HomeSVG />
					</span>
					Home
				</Link>
			</li>
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
			{/* Properties Link */}
			<li className="nav-item">
				<Link
					to={`/admin/properties`}
					className={`nav-link ${active("/admin/properties")}`}>
					<div className="nav-link-icon">
						<PropertySVG />
					</div>
					<div className="nav-link-text">Properties</div>
				</Link>
			</li>
			{/* Properties Link End */}
			{/* Invoices Link */}
			<li className="nav-item">
				<Link
					to={`/admin/invoices`}
					className={`nav-link ${active("/admin/invoices")}`}>
					<div className="nav-link-icon">
						<InvoiceSVG />
					</div>
					<div className="nav-link-text">Invoices</div>
				</Link>
			</li>
			{/* Invoices Link End */}
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
						{/* Payments Link */}
						<li className="nav-item">
							<Link
								to={`/admin/finance/payments`}
								className={`nav-link ${active("/admin/finance/payments")}`}>
								<div className="nav-link-icon">
									<PaymentSVG />
								</div>
								<div className="nav-link-text">Payments</div>
							</Link>
						</li>
						{/* Payments Link End */}
						{/* Wallet */}
						<li className="nav-item">
							<Link
								to={`/admin/finance/wallet`}
								className={`nav-link ${active("/admin/finance/wallet")}`}>
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
