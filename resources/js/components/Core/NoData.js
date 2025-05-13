import React from "react"

const NoData = () => {
	return (
		<div className="bg-white text-center w-100 py-5">
			<img
				src="/img/no-data-found.jpg"
				alt="No entries found"
				style={{ width: "30%", height: "auto" }}
			/>
			<h4 className="opacity-25">We didn't find anything.</h4>
		</div>
	)
}

export default NoData
