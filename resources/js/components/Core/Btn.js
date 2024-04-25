import React from "react"
import { useLocation } from "react-router-dom/cjs/react-router-dom.min"

const Btn = ({ btnStyle, btnClass, btnText, onClick, loading, disabled }) => {
	const location = useLocation()

	return (
		<button
			style={btnStyle}
			className={`${
				location.pathname.match("/admin/")
					? "btn-primary"
					: location.pathname.match("/instructor/")
					? "btn-danger"
					: "btn-success"
			} btn rounded-pill text-capitalize ${btnClass}`}
			onClick={onClick}
			disabled={disabled}>
			{btnText}
			{loading && (
				<div
					className="text-white spinner-border spinner-border-sm border-2 my-auto mx-2"
					style={{ color: "inherit" }}></div>
			)}
		</button>
	)
}

Btn.defaultProps = {
	loading: false,
	disabled: false,
}
export default Btn
