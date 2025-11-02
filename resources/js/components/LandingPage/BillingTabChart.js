import React from "react"

import RentDoughnut from "@/components/Dashboard/RentDoughnut"
import WaterDoughnut from "@/components/Dashboard/WaterDoughnut"
import ServiceChargeDoughnut from "@/components/Dashboard/ServiceChargeDoughnut"

const BillingTabChart = () => {
	/*
	 * Graph Data
	 */

	var dashboard = {
		units: {
			totalOccupied: 90,
			totalUnoccupied: 10,
			percentage: "90",
			tenantsThisYear: {
				labels: [
					"January",
					"February",
					"March",
					"April",
					"May",
					"June",
					"July",
					"August",
					"September",
					"October",
					"November",
					"December",
				],
				data: [0, 0, 0, 14, 53, 94, 110, 110, 55, 55, 0, 0],
			},
			vacanciesThisYear: {
				labels: [
					"January",
					"February",
					"March",
					"April",
					"May",
					"June",
					"July",
					"August",
					"September",
					"October",
					"November",
					"December",
				],
				data: [57, 57, 57, 43, 4, -37, -53, -53, 2, 2, 0, 0],
			},
		},
		rent: {
			paid: 4000000,
			due: 1500000,
			total: "5,500,000",
			percentage: "70",
			paidThisYear: {
				labels: [
					"January",
					"February",
					"March",
					"April",
					"May",
					"June",
					"July",
					"August",
					"September",
					"October",
					"November",
					"December",
				],
				data: [
					2420000, 2420000, 2420000, 2420000, 3055000, 4840000, 7806000,
					10857000, 10857000, 10857000, 0, 0,
				],
			},
			unpaidThisYear: {
				labels: [
					"January",
					"February",
					"March",
					"April",
					"May",
					"June",
					"July",
					"August",
					"September",
					"October",
					"November",
					"December",
				],
				data: [
					561000, 561000, 561000, 561000, 601000, 722000, 737000, 667000,
					667000, 667000, 0, 0,
				],
			},
		},
		water: {
			paid: 50000,
			due: 0,
			total: "50,000",
			usageTwoMonthsAgo: "5014",
			usageLastMonth: 0,
			percentage: "100",
			paidThisYear: {
				labels: [
					"January",
					"February",
					"March",
					"April",
					"May",
					"June",
					"July",
					"August",
					"September",
					"October",
					"November",
					"December",
				],
				data: [
					7554.12, 6632.5300000000025, 5747.760000000002, 5007.559999999999,
					5458.74, 8094.449999999999, 9800.559999999998, 11764.96000000002,
					6697.179999999988, 2924.1599999999976, 0, 0,
				],
			},
			unpaidThisYear: {
				labels: [
					"January",
					"February",
					"March",
					"April",
					"May",
					"June",
					"July",
					"August",
					"September",
					"October",
					"November",
					"December",
				],
				data: [
					1279.95, 1167.5399999999997, 943.9200000000002, 865.7199999999998,
					808.93, 628.6, 519.4, 450.1099999999999, 265.71999999999997,
					114.84000000000002, 0, 0,
				],
			},
		},
		serviceCharge: {
			paid: 40000,
			due: 10000,
			total: "50,000",
			percentage: "80",
			paidThisYear: {
				labels: [
					"January",
					"February",
					"March",
					"April",
					"May",
					"June",
					"July",
					"August",
					"September",
					"October",
					"November",
					"December",
				],
				data: [
					400070, 400070, 400070, 400070, 529214, 881447, 1374467, 1867487,
					1867487, 1867487, 0, 0,
				],
			},
			unpaidThisYear: {
				labels: [
					"January",
					"February",
					"March",
					"April",
					"May",
					"June",
					"July",
					"August",
					"September",
					"October",
					"November",
					"December",
				],
				data: [
					92950, 92950, 92950, 92950, 92950, 92950, 92950, 92950, 92950, 92950,
					0, 0,
				],
			},
		},
	}

	return (
		<div className="card border-0 shadow-sm text-center p-4">
			<div className="d-flex justify-content-between flex-wrap">
				{/* Rent Doughnut */}
				<RentDoughnut dashboard={dashboard} />
				{/* Rent Doughnut End */}
				{/* Water Doughnut */}
				<WaterDoughnut dashboard={dashboard} />
				{/* Water Doughnut End */}
				{/* Service Charge Doughnut */}
				<ServiceChargeDoughnut dashboard={dashboard} />
				{/* Service Charge Doughnut End */}
			</div>
		</div>
	)
}

export default BillingTabChart
