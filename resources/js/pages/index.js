import React, { useState } from "react"
import { Link } from "react-router-dom/cjs/react-router-dom"

import Img from "@/components/Core/Img"
import Btn from "@/components/Core/Btn"
import Doughnut from "@/components/Charts/Doughnut"
import MyLink from "@/components/Core/MyLink"

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
import PhoneSVG from "@/svgs/PhoneSVG"
import EmailSVG from "@/svgs/EmailSVG"
import SMSSVG from "@/svgs/SMSSVG"
import WhatsAppSVG from "@/svgs/WhatsAppSVG"
import SubscriptionPlan from "@/components/SubscriptionPlan/SubscriptionPlan"

const index = (props) => {
	const [tab, setTab] = useState("property")

	/*
	 * Graph Data
	 */

	var doughnutProperties = [
		{
			label: " Units",
			data: [5, 10, 15, 20, 10],
		},
	]

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
			id: 2,
			name: "BP 50",
			description: "Between 21 - 50 units",
			amount: null,
			currency: null,
			price: {
				yearly: 50000,
				monthly: 5000,
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
			id: 3,
			name: "BP 100",
			description: "Betwee 51 - 100 units",
			amount: null,
			currency: null,
			price: {
				yearly: 100000,
				monthly: 10000,
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
				onboarding_fee: 30000,
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
				<div className="col-sm-6 mt-5 p-5">
					<div className="card border-0 shadow mt-5 p-4">
						<div className="card border-0 shadow">
							<center>
								<div className="middle2">
									<h1
										className="hidden"
										style={{ fontSize: "10em" }}>
										4
									</h1>
								</div>
								<Doughnut
									labels={[
										"Tevody Apartments",
										"Rezona Heights",
										"Western Heights",
										"Alima Apartments",
										"Joska Apartments",
									]}
									datasets={doughnutProperties}
									cutout="50%"
									size="25em"
								/>
								<h6 className="mb-3">Total Units: 60</h6>
							</center>
						</div>
					</div>
				</div>
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
								Kenya's Leading Property Management Software
							</h2>
							<p className="text-white">
								Manage your Properties efficiently with our modern Property
								Management Software that leaves nothing out of the picture, from
								tenant onboarding, billing to exit.
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
						<button
							className={`btn sonar-btn ${activeTab("property")} px-4 m-2`}
							onClick={() => setTab("property")}>
							<PropertySVG />
							<span
								className="ms-1"
								style={{ color: "inherit" }}>
								property management
							</span>
						</button>
						{/* Property Tab Button End */}
						{/* Occupancy Tab Button */}
						<button
							className={`btn sonar-btn ${activeTab("occupancy")} px-4 m-2`}
							onClick={() => setTab("occupancy")}>
							<UnitSVG />
							<span
								className="ms-1"
								style={{ color: "inherit" }}>
								occupancy management
							</span>
						</button>
						{/* Occupancy Tab Button End */}
						{/* Billing Tab Button */}
						<button
							className={`btn sonar-btn ${activeTab("billing")} px-4 m-2`}
							onClick={() => setTab("billing")}>
							<MoneySVG />
							<span
								className="ms-1"
								style={{ color: "inherit" }}>
								billing
							</span>
						</button>
						{/* Billing Tab Button End */}
						{/* Water Tab Button */}
						<button
							className={`btn sonar-btn ${activeTab("water")} px-4 m-2`}
							onClick={() => setTab("water")}>
							<WaterReadingSVG />
							<span
								className="ms-1"
								style={{ color: "inherit" }}>
								water management
							</span>
						</button>
						{/* Water Tab Button End */}
						{/* Tenant Tab Button */}
						<button
							className={`btn sonar-btn ${activeTab("tenant")} px-4 m-2`}
							onClick={() => setTab("tenant")}>
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

			{/* <!-- ***** Hero Area Start ***** --> */}
			<div className="row">
				<div
					className="col-sm-6"
					style={{ backgroundColor: "#232323" }}>
					<div className="mt-5 mb-5 hidden"></div>
					{tab == "property" && <PropertyTabInfo />}
					{tab == "occupancy" && <OccupancyTabInfo />}
					{tab == "billing" && <BillingTabInfo />}
					{tab == "water" && <WaterTabInfo />}
					{tab == "tenant" && <TenantTabInfo />}
				</div>
				<div className="col-sm-6 p-5">
					{tab == "property" && <PropertyTabChart />}
					{tab == "occupancy" && <OccupancyTabChart />}
					{tab == "billing" && <BillingTabChart />}
					{tab == "water" && <WaterTabChart />}
					{tab == "tenant" && <TenantTabChart />}
				</div>
			</div>
			{/* <!-- ***** Hero Area End ***** --> */}

			{/* <!-- ***** Pricing Area Start ***** --> */}
			<div className="sonar-services-area">
				<div className="row">
					<div className="col-sm-12 text-center my-5">
						<h2>Pricing</h2>
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
			{/* <!-- ***** Pricing Area End ***** --> */}

			{/* Contact Start */}
			<section
				className="sonar-contact-area section-padding-100 py-5"
				style={{ backgroundColor: "#232323" }}>
				{/* <!-- back end content --> */}
				<div className="backEnd-content">
					<img
						className="dots"
						src="img/core-img/dots.png"
						alt=""
					/>
				</div>

				<div className="container mb-5">
					<div className="row">
						{/* <!-- Contact Form Area --> */}
						<div className="col-12">
							<div className="text-center">
								<h2 className="mb-2 text-white">Contact Us</h2>
								<h4 className="text-white">Let’s talk</h4>
								<div className="d-flex justify-content-center flex-column">
									{/* Phone Start */}
									<div className="d-flex justify-content-center align-items-center">
										<a
											href="tel:0700364446"
											className="d-flex align-items-center text-white fs-1"
											data-toggle="tooltip"
											data-placement="bottom"
											title="Phone">
											<div
												className="border border-light rounded-circle p-2 m-4"
												style={{ width: "80px", height: "80px" }}>
												<PhoneSVG />
											</div>
											<h6>0700364446</h6>
										</a>
									</div>
									{/* Phone End */}
									{/* SMS Start */}
									<div className="d-flex justify-content-center align-items-center">
										<a
											href="sms:0700364446"
											className="d-flex align-items-center text-white fs-1">
											<div
												className="border border-light rounded-circle p-2 m-4"
												style={{ width: "80px", height: "80px" }}>
												<SMSSVG />
											</div>
											<h6>0700364446</h6>
										</a>
									</div>
									{/* SMS End */}
									{/* WhatsApp Start */}
									<div className="d-flex justify-content-center align-items-center">
										<a
											href="https://wa.me/+2540700364446"
											className="d-flex align-items-center text-white fs-1"
											data-toggle="tooltip"
											data-placement="bottom"
											title="WhatsApp">
											<div
												className="border border-light rounded-circle p-2 m-4"
												style={{ width: "80px", height: "80px" }}>
												<WhatsAppSVG />
											</div>
											<h6>0700364446</h6>
										</a>
									</div>
									{/* WhatsApp End */}
									{/* Email Start */}
									<div className="d-flex justify-content-center align-items-center">
										<a
											href="mailto:al@black.co.ke?subject=Property Management System&body=Enquiry"
											data-toggle="tooltip"
											className="d-flex align-items-center text-white fs-1"
											data-placement="bottom"
											title="Email">
											<div
												className="border border-light rounded-circle p-2 m-4"
												style={{ width: "80px", height: "80px" }}>
												<EmailSVG />
											</div>
											<h6>al@black.co.ke</h6>
										</a>
									</div>
									{/* Email End */}
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>
			{/* Contact End */}
		</div>
	)
}

export default index
