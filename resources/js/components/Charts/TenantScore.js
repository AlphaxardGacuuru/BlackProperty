import React, { useState, useEffect, useRef } from "react"

import Doughnut from "@/components/Charts/Doughnut"

// Main App component that manages the application state and logic.
const TenantScore = () => {
	// Generate Random number between 60 and 100
	const randomNumber = Math.floor(Math.random() * (100 - 60 + 1)) + 60
	const [creditScore, setCreditScore] = useState(randomNumber)

	// Helper function to get the credit score category
	const getScoreCategory = (score) => {
		if (score >= 81) return "Excellent"
		if (score >= 61) return "Good"
		if (score >= 41) return "Fair"
		return "Poor"
	}

	// Custom plugin to draw the center text
	const centerTextPlugin = {
		id: "centerText",
		beforeDraw: (chart) => {
			const { ctx, width, height } = chart
			const { creditScore, currentCategoryName } =
				chart.options.plugins.centerText.data

			ctx.save()
			ctx.font = "700 3.5rem Inter, sans-serif"
			ctx.fillStyle = "#4B5563"
			ctx.textAlign = "center"
			ctx.textBaseline = "middle"
			ctx.fillText(creditScore, width / 2, height / 2 - 15)

			ctx.font = "500 1.125rem Inter, sans-serif"
			ctx.fillStyle = "#6B7280"
			ctx.fillText(currentCategoryName, width / 2, height / 2 + 25)
			ctx.restore()
		},
	}

	// Set up the gradient
	const getGradient = (chart) => {
		const { ctx } = chart
		const gradient = ctx.createLinearGradient(0, 0, 0, 200)
		gradient.addColorStop(0, "green")
		gradient.addColorStop(0.5, "yellow")
		// gradient.addColorStop(0.75, "blue")
		gradient.addColorStop(1, "red")
		return gradient
	}

	// Chart data and options, derived from state
	const data = {
		labels: ["Score", "Remaining"],
		datasets: [
			{
				data: [creditScore, 100 - creditScore],
				backgroundColor: (context) => {
					return context.dataIndex === 0
						? getGradient(context.chart)
						: "#E5E7EB"
				},
				borderWidth: 0,
			},
		],
	}

	const options = {
		responsive: true,
		maintainAspectRatio: false,
		cutout: "80%",
		circumference: 270,
		rotation: -135,
		plugins: {
			legend: { display: false },
			tooltip: { enabled: false },
			centerText: {
				data: {
					creditScore: creditScore,
					currentCategoryName: getScoreCategory(creditScore),
				},
			},
		},
	}

	return (
		<div className="card shadow-sm mb-2 p-4 text-center">
			<h4>Tenant Score</h4>
			<div
				className="d-flex justify-content-center p-2"
				style={{ height: "300px" }}>
				<Doughnut
					labels={["Score", "Remaining"]}
					datasets={[
						{
							data: [creditScore, 100 - creditScore],
							backgroundColor: (context) => {
								return context.dataIndex === 0
									? getGradient(context.chart)
									: "#E5E7EB"
							},
							borderWidth: 0,
						},
					]}
					cutout="80%"
					plugins={[centerTextPlugin]}
					options={options}
					style={{ height: "100%", width: "100%" }}
				/>
			</div>

			<div className="d-flex flex-wrap justify-content-center">
				<span className="badge badge-danger m-1 p-2">Poor (0-40)</span>
				<span className="badge badge-warning m-1 p-2">Fair (41-60)</span>
				<span className="badge badge-primary m-1 p-2">Good (61-80)</span>
				<span className="badge badge-success m-1 p-2">Excellent (81-100)</span>
			</div>
		</div>
	)
}

export default TenantScore
