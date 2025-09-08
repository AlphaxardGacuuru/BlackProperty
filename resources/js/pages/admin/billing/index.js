import React, { useEffect, useState } from "react"

import BillingList from "@/components/Billings/BillingList"
import SubscriptionStatementList from "@/components/Billings/SubscriptionStatementList"
import TenantList from "@/components/Tenants/TenantList"
import HeroHeading from "@/components/Core/HeroHeading"
import HeroIcon from "@/components/Core/HeroIcon"

import BillingSVG from "@/svgs/BillingSVG"
import SubscriptionPlan from "@/components/SubscriptionPlan/SubscriptionPlan"

const billing = (props) => {
	const [billings, setBillings] = useState([])
	const [subscriptionPlans, setSubscriptionPlans] = useState([])

	const [tenant, setTenant] = useState("")
	const [unit, setUnit] = useState("")
	const [startMonth, setStartMonth] = useState("")
	const [startYear, setStartYear] = useState("")
	const [endMonth, setEndMonth] = useState("")
	const [endYear, setEndYear] = useState("")

	const [tab, setTab] = useState("statement")

	useEffect(() => {
		props.setPage({ name: "Billings", path: ["billings"] })

		// Fetch Billings
		props.getPaginated(
			`mpesa-transactions?
			propertyId=${props.selectedPropertyId}&
			tenant=${tenant}&
			unit=${unit}&
			userId=${props.auth.id}&
			startMonth=${startMonth}&
			endMonth=${endMonth}&
			startYear=${startYear}&
			endYear=${endYear}`,
			setBillings
		)

		// Fetch Subscription Plan
		props.get(`subscription-plans`, setSubscriptionPlans)
	}, [
		props.selectedPropertyId,
		tenant,
		unit,
		startMonth,
		endMonth,
		startYear,
		endYear,
	])

	const active = (activeTab) => {
		return activeTab == tab
			? "bg-secondary text-white shadow-sm"
			: "bg-secondary-subtle"
	}

	const activeTab = (activeTab) => {
		return activeTab == tab ? "d-block" : "d-none"
	}

	return (
		<div className="row">
			<div className="col-sm-4">
				<div className="card shadow-sm p-2 mb-2">
					<div className="d-flex justify-content-between w-100 align-items-center">
						<HeroHeading
							heading="Current Plan"
							data={
								<div className="">
									<h5 className="my-1">
										{props.auth.activeSubscription?.name || "Free Plan"}
									</h5>
									<h6 className=" text-success">
										KES{" "}
										{props.auth.activeSubscription?.price?.monthly?.toLocaleString() ||
											"KES 0"}
									</h6>
								</div>
							}
						/>
						<HeroIcon>
							<BillingSVG />
						</HeroIcon>
					</div>

					<hr className="border" />

					<div className="d-flex justify-content-between">
						<div className="me-2">
							<h5 className="mb-1">Billing Due</h5>
							<h6>1st July 2025</h6>
						</div>
						<div className="">
							<h5 className="mb-1">Prepayments</h5>
							<h6>KES 0</h6>
						</div>
					</div>
				</div>
			</div>
			<div className="col-sm-8">
				{/* Tabs */}
				<div className="d-flex justify-content-between flex-wrap mb-2">
					<div
						className={`card shadow-sm flex-grow-1 text-center me-1 mb-2 py-2 px-4 ${active(
							"statement"
						)}`}
						style={{ cursor: "pointer" }}
						onClick={() => setTab("statement")}>
						Statement
					</div>
					<div
						className={`card shadow-sm flex-grow-1 text-center me-1 mb-2 py-2 px-4 ${active(
							"settings"
						)}`}
						style={{ cursor: "pointer" }}
						onClick={() => setTab("settings")}>
						Settings
					</div>
				</div>
				{/* Tabs End */}

				{/* Statements Tab */}
				{tab == "statement" && <SubscriptionStatementList {...props} />}
				{/* Statements Tab End */}

				{/* Settings Start */}
				<div className={activeTab("settings")}>
					{/* Data */}
					<div className="card shadow-sm mb-2 p-2">
						{/* <!-- ***** Pricing Area Start ***** --> */}
						<div className="sonar-services-area">
							<div className="container">
								<div className="row">
									<div className="col-sm-12 text-center my-5">
										<h2>Subscription Plans</h2>
									</div>
								</div>
								<div className="d-flex justify-content-center flex-wrap mb-5">
									{subscriptionPlans.map((subscriptionPlan, key) => (
										<SubscriptionPlan
											{...props}
											key={key}
											subscriptionPlan={subscriptionPlan}
										/>
									))}
								</div>
							</div>
						</div>
						{/* <!-- ***** Pricing Area End ***** --> */}

						{/* <hr className="border" /> */}

						{/* <div className="d-flex justify-content-between">
							<div className="p-4">Subscription Plan</div>
							<div className="p-4">
								<div>Plan</div>
								<div>KES 2,000/month</div>
							</div>
							<div className="p-4">
								<MyLink text="Change Plan" />
							</div>
						</div> */}
					</div>
				</div>
				{/* Settings End */}
			</div>
		</div>
	)
}

export default billing
