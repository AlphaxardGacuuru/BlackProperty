import React, { useEffect } from "react"
import { useLocation } from "react-router-dom/cjs/react-router-dom.min"

const Btn = ({
	btnStyle,
	className,
	icon,
	text,
	onClick,
	loading,
	dataBsToggle,
	dataBsTarget,
	tooltipText,
	tooltipBgColor,
	tooltipPlacement,
}) => {
	useEffect(() => {
		// Initialize Bootstrap tooltips
		const tooltipTriggerList = Array.from(
			document.querySelectorAll('[data-bs-toggle="tooltip"]')
		)

		tooltipTriggerList.forEach((tooltipTriggerEl) => {
			new bootstrap.Tooltip(tooltipTriggerEl)
		})
	}, [])

	return (
		<button
			style={btnStyle}
			className={`mysonar-btn btn-2 ${className}`}
			onClick={onClick}
			disabled={loading}
			data-bs-toggle={dataBsToggle}
			data-bs-target={dataBsTarget}
			data-bs-placement={tooltipPlacement}
			title={tooltipText}>
			{/* Icon Start */}
			<span style={{ color: "inherit" }}>{icon}</span>
			{/* Icon End */}

			{/* Text Start */}
			{text && (
				<span
					className="mx-1"
					style={{ color: "inherit" }}>
					{text}
				</span>
			)}
			{/* Text End */}

			{/* Loading Start */}
			{loading && (
				<div
					id="sonar-load"
					style={{ bottom: "0" }}></div>
			)}
			{/* Loading End */}
		</button>
	)
}

Btn.defaultProps = {
	loading: false,
	disabled: false,
	tooltipBgColor: "primary", // Bootstrap primary background (optional if using Bootstrap's native tooltips)
	tooltipPlacement: "top", // Default tooltip placement
}
export default Btn
