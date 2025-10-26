import React, { useEffect } from "react"
import { withRouter } from "react-router-dom"

function subscribed(props) {
	useEffect(() => {
		const location = props.history.location

		const unlisten = props.history.listen((newLocation, action) => {
			// Get the clicked/intended route
			const clickedRoute = newLocation.pathname

			// PREVENT redirect if the clicked route is a /super/ or /tenant/ route
			if (
				clickedRoute.match(/super/) ||
				clickedRoute.match(/tenant/) ||
				props.auth.subscriptionByPropertyIds?.length > 0
			) {
				return
			}

			// Redirect to subscription page if user is not subscribed
			if (
				props.auth.name != "Guest" &&
				props.auth.activeSubscription == null &&
				props.auth.emailVerifiedAt &&
				clickedRoute.match("/admin/")
			) {
				window.location.href = "/#/admin/subscribe"
			}
		})

		return () => {
			unlisten()
		}
	}, [])

	return null
}

export default withRouter(subscribed)
