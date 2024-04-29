import React, { useEffect, useState } from "react"
import { Link, useLocation } from "react-router-dom"

import PersonSVG from "@/svgs/PersonSVG"
import HomeSVG from "@/svgs/HomeSVG"
import PropertySVG from "@/svgs/PropertySVG"
import StaffSVG from "@/svgs/StaffSVG"
import MoneySVG from "@/svgs/MoneySVG"
import TransactionSVG from "@/svgs/TransactionSVG"
import WalletSVG from "@/svgs/WalletSVG"
import PersonGearSVG from "@/svgs/PersonGearSVG"
import UnitSVG from "@/svgs/UnitSVG"

const AdminNavLinks = (props) => {
	const location = useLocation()

	const [properties, setProperties] = useState([])

	useEffect(() => {
		props.get(`properties/by-user-id/${props.auth.id}`, setProperties)
	}, [])

	// Function for showing active color
	const active = (check) => {
		return (
			location.pathname.match(check) &&
			"rounded-0 text-secondary bg-secondary-subtle mx-1"
		)
	}

	// Function for showing active color
	const activeStrict = (check) => {
		return (
			location.pathname == check &&
			"rounded-0 text-secondary bg-secondary-subtle"
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
			{/* Units Link */}
			<li className="nav-item">
				<Link
					to={`/admin/units`}
					className={`nav-link ${active("/admin/units")}`}>
					<div className="nav-link-icon">
						<UnitSVG />
					</div>
					<div className="nav-link-text">Units</div>
				</Link>
			</li>
			{/* Units Link End */}
			{/* Tenants Link */}
			<li className="nav-item">
				<Link
					to={`/admin/tenants`}
					className={`nav-link ${active("/admin/tenants")}`}>
					<div className="nav-link-icon">
						<PersonSVG />
					</div>
					<div className="nav-link-text">Tenants</div>
				</Link>
			</li>
			{/* Tenants Link End */}
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
