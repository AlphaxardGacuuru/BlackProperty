import React, { useState, useEffect } from "react"

import { ToastContainer, toast, Bounce } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

const PageLoader = (props) => {
	const [called, setCalled] = useState(false)

	const Spinner = (
		<div className="d-flex justify-content-between align-items-center">
			<div>Loading items</div>
			<div
				className="text-white spinner-border border-2 my-auto mx-2"
				style={{ color: "inherit" }}></div>
		</div>
	)

	// Check if there are loading items and show toast
	useEffect(() => {
		if (props.loadingItems > 0) {
			if (!called) {
				toast.info(Spinner, {
					toastId: "page-loader-toast", // Unique ID for this toast
					position: "top-center",
					autoClose: false,
					hideProgressBar: false,
					newestOnTop: false,
					closeOnClick: false,
					rtl: false,
					pauseOnFocusLoss: true,
					draggable: false,
					draggablePercent: 40,
					pauseOnHover: true,
					theme: "colored",
					transition: Bounce,
					closeButton: false,
					stacked: false,
				})

				setCalled(true)
			}
		} else {
			setCalled(false)
			toast.dismiss("page-loader-toast")
		}
	}, [props.loadingItems])

	return 0
}

export default PageLoader
