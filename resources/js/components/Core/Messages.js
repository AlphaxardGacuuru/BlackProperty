import React, { useEffect } from "react"
import { ToastContainer, toast, Bounce } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

const Messages = ({ messages, setMessages, errors, setErrors }) => {

	useEffect(() => {
		// Display messages and errors as toasts
		if (messages.length > 0) {
			messages.forEach((message) => toast.success(message))
			setTimeout(() => setMessages([]), 2900)
		}

		if (errors.length > 0) {
			errors.forEach((validationErrors) => {
				// Check if validationErrors is an array
				if (Array.isArray(validationErrors)) {
					validationErrors.forEach((error) => toast.error(error))
				} else {
					toast.warning(validationErrors)
				}
			})
			setTimeout(() => setErrors([]), 2900)
		}

		return () => {}
	}, [messages, errors])

	return (
		<ToastContainer
			toastId="messages-toast" // Unique ID for this toast
			position="top-right"
			autoClose={10000}
			hideProgressBar={false}
			newestOnTop={false}
			closeOnClick
			rtl={false}
			pauseOnFocusLoss
			draggable
			draggablePercent={40}
			pauseOnHover
			theme="colored"
			transition={Bounce}
		/>
	)
}

export default Messages
