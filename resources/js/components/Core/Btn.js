import React from "react"
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
}) => {
	const location = useLocation()

	return (
		<button
			style={btnStyle}
			className={`mysonar-btn btn-2 ${className}`}
			onClick={onClick}
			disabled={loading}
			data-bs-toggle={dataBsToggle}
			data-bs-target={dataBsTarget}>
			<span style={{ color: "inherit" }}>{icon}</span>
			{text && (
				<span
					className="mx-1"
					style={{ color: "inherit" }}>
					{text}
				</span>
			)}
			{loading && (
				<div
					id="sonar-load"
					style={{ bottom: "0" }}></div>
			)}
		</button>
	)
}

Btn.defaultProps = {
	loading: false,
	disabled: false,
}
export default Btn
