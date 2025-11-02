import React, { useState } from "react"
import { Link } from "react-router-dom/cjs/react-router-dom"

import PropertyDoughnut from "@/components/Dashboard/PropertyDoughnut"

import PropertyTabChart from "@/components/LandingPage/PropertyTabChart"
import OccupancyTabChart from "@/components/LandingPage/OccupancyTabChart"
import WaterTabChart from "@/components/LandingPage/WaterTabChart"
import BillingTabChart from "@/components/LandingPage/BillingTabChart"
import TenantTabChart from "@/components/LandingPage/TenantTabChart"
import PropertyTabInfo from "@/components/LandingPage/PropertyTabInfo"
import OccupancyTabInfo from "@/components/LandingPage/OccupancyTabInfo"
import WaterTabInfo from "@/components/LandingPage/WaterTabInfo"
import BillingTabInfo from "@/components/LandingPage/BillingTabInfo"
import TenantTabInfo from "@/components/LandingPage/TenantTabInfo"

import ForwardSVG from "@/svgs/ForwardSVG"
import PropertySVG from "@/svgs/PropertySVG"
import UnitSVG from "@/svgs/UnitSVG"
import MoneySVG from "@/svgs/MoneySVG"
import WaterReadingSVG from "@/svgs/WaterReadingSVG"
import TenantSVG from "@/svgs/TenantSVG"
import SubscriptionPlan from "@/components/SubscriptionPlan/SubscriptionPlan"

const index = (props) => {
	const [tab, setTab] = useState("property")

	/*
	 * Graph Data
	 */

	var dashboardProperties = {
		total: 5,
		ids: [1, 2, 3, 4, 5],
		names: [
			"Kulas Alley",
			"Nathanial Trail",
			"Bechtelar Forge",
			"Kozey Oval",
			"Pouros Center",
		],
		units: [12, 11, 11, 12, 11],
	}

	const subscriptionPlans = [
		{
			id: 1,
			name: "BP 20",
			description: "20 units or Less",
			amount: null,
			currency: null,
			price: {
				yearly: 20000,
				monthly: 2000,
				onboarding_fee: 2000,
			},
			features: [
				"Property Management",
				"Occupancy Management",
				"Billing",
				"Water Management",
				"Tenant Management",
				"Staff Management",
			],
			createdAt: "2025-09-02T16:45:05.000000Z",
		},
		{
			id: 2,
			name: "BP 50",
			description: "Between 21 - 50 units",
			amount: null,
			currency: null,
			price: {
				yearly: 50000,
				monthly: 5000,
				onboarding_fee: 5000,
			},
			features: [
				"Property Management",
				"Occupancy Management",
				"Billing",
				"Water Management",
				"Tenant Management",
				"Staff Management",
			],
			createdAt: "2025-09-02T16:45:05.000000Z",
		},
		{
			id: 3,
			name: "BP 100",
			description: "Betwee 51 - 100 units",
			amount: null,
			currency: null,
			price: {
				yearly: 100000,
				monthly: 10000,
				onboarding_fee: 10000,
			},
			features: [
				"Property Management",
				"Occupancy Management",
				"Billing",
				"Water Management",
				"Tenant Management",
				"Staff Management",
			],
			createdAt: "2025-09-02T16:45:05.000000Z",
		},
		{
			id: 4,
			name: "BP 200",
			description: "Between 101 - 200 units",
			amount: null,
			currency: null,
			price: {
				yearly: 200000,
				monthly: 20000,
				onboarding_fee: 20000,
			},
			features: [
				"Property Management",
				"Occupancy Management",
				"Billing",
				"Water Management",
				"Tenant Management",
				"Staff Management",
			],
			createdAt: "2025-09-07T17:14:21.000000Z",
		},
	]

	const activeTab = (activeTab) => {
		return tab == activeTab ? "btn-2" : "white-btn"
	}

	return (
		<div>
			{/* <!-- ***** Hero Area Start ***** --> */}
			<div className="row">
				<div
					className="col-sm-6"
					style={{ backgroundColor: "#232323" }}>
					<div className="mt-5 mb-5 hidden"></div>
					<center>
						<br />
						<br />
						<div className="d-flex justify-content-center flex-column m-5 p-5">
							<div
								className="m-3"
								style={{ backgroundColor: "white", height: "1px" }}></div>
							<h2 className="text-white mb-4">
								Property management. Beautifully reimagined.
							</h2>
							<p
								className="text-white"
								style={{ fontSize: "1.1em", lineHeight: "1.6" }}>
								From tenant onboarding to final billing, experience property
								management that just works.
							</p>
							<p
								className="text-white"
								style={{ fontSize: "0.95em", opacity: 0.9, marginTop: "1rem" }}>
								Every detail, every interaction, designed to feel effortless.
							</p>
							<Link
								to="/admin/dashboard"
								className="btn sonar-btn white-btn w-25 mx-auto">
								<span className="me-1">start now</span>
								<ForwardSVG />
							</Link>
						</div>
					</center>
				</div>
				<div className="col-sm-6 p-4">
					<div className="card border-0 shadow-sm mt-5 p-4">
						{/* Property Doughnut */}
						<PropertyDoughnut dashboardProperties={dashboardProperties} />
						{/* Property Doughnut End */}
					</div>
				</div>
			</div>
			{/* <!-- ***** Hero Area End ***** --> */}

			{/* Product Area Start */}
			<div className="row">
				<div
					className="col-sm-12 p-5 text-center text-white"
					style={{ backgroundColor: "#232323" }}>
					<h2 className="mb-2 text-white">
						Everything Property Management. One Plaform
					</h2>
					<h5 className="mb-4">Built for the Modern Property Manager</h5>
					<div className="d-flex justify-content-center flex-wrap">
						{/* Property Tab Button */}
						<button className={`btn sonar-btn white-btn px-4 m-2`}>
							<PropertySVG />
							<span
								className="ms-1"
								style={{ color: "inherit" }}>
								property management
							</span>
						</button>
						{/* Property Tab Button End */}
						{/* Occupancy Tab Button */}
						<button className={`btn sonar-btn white-btn px-4 m-2`}>
							<UnitSVG />
							<span
								className="ms-1"
								style={{ color: "inherit" }}>
								occupancy management
							</span>
						</button>
						{/* Occupancy Tab Button End */}
						{/* Billing Tab Button */}
						<button className={`btn sonar-btn white-btn px-4 m-2`}>
							<MoneySVG />
							<span
								className="ms-1"
								style={{ color: "inherit" }}>
								billing
							</span>
						</button>
						{/* Billing Tab Button End */}
						{/* Water Tab Button */}
						<button className={`btn sonar-btn white-btn px-4 m-2`}>
							<WaterReadingSVG />
							<span
								className="ms-1"
								style={{ color: "inherit" }}>
								water management
							</span>
						</button>
						{/* Water Tab Button End */}
						{/* Tenant Tab Button */}
						<button className={`btn sonar-btn white-btn px-4 m-2`}>
							<TenantSVG />
							<span
								className="ms-1"
								style={{ color: "inherit" }}>
								tenant acquisition
							</span>
						</button>
						{/* Tenant Tab Button End */}
					</div>
				</div>
			</div>
			{/* Product Area End */}

			{/* <!-- ***** Features Area Start ***** --> */}
			<div
				className="row"
				style={{ backgroundColor: "#232323" }}>
				<div className="col-sm-6">
					<PropertyTabInfo />
				</div>
				<div className="col-sm-6 p-4">
					<PropertyTabChart />
				</div>
			</div>
			<div
				className="row"
				style={{ backgroundColor: "#232323" }}>
				<div className="col-sm-6">
					<div className="mt-5 mb-5 hidden"></div>
					<OccupancyTabInfo />
				</div>
				<div className="col-sm-6 p-4">
					<OccupancyTabChart />
				</div>
			</div>
			<div
				className="row"
				style={{ backgroundColor: "#232323" }}>
				<div className="col-sm-6">
					<BillingTabInfo />
				</div>
				<div className="col-sm-6 p-4">
					<BillingTabChart />
				</div>
			</div>
			<div
				className="row"
				style={{ backgroundColor: "#232323" }}>
				<div className="col-sm-6">
					<div className="mt-5 mb-5 hidden"></div>
					<WaterTabInfo />
				</div>
				<div className="col-sm-6 p-4">
					<WaterTabChart />
				</div>
			</div>
			<div
				className="row"
				style={{ backgroundColor: "#232323" }}>
				<div className="col-sm-6">
					<TenantTabInfo />
				</div>
				<div className="col-sm-6 p-4">
					<TenantTabChart />
				</div>
			</div>
			{/* <!-- ***** Features Area End ***** --> */}

			{/* <!-- ***** Pricing Area Start ***** --> */}
			<div className="sonar-services-area">
				<div
					className="row"
					style={{ backgroundColor: "#232323" }}>
					<div className="col-sm-12 text-center my-5">
						<h2 className="text-white">Pricing</h2>
					</div>
				</div>
				<div className="d-flex justify-content-center flex-wrap my-5">
					{subscriptionPlans.map((subscriptionPlan, key) => (
						<SubscriptionPlan
							{...props}
							key={key}
							subscriptionPlan={subscriptionPlan}
						/>
					))}
				</div>
			</div>
			{/* <!-- ***** Pricing Area End ***** --> */}
		</div>
	)
}

export default index
