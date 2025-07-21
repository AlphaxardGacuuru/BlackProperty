import React, { useEffect } from "react"
import { withRouter } from "react-router-dom"

function subscribed(props) {
	useEffect(() => {
		const location = props.history.location

		const unlisten = props.history.listen(() => {
			// Redirect to subscription page if user is not subscribed
			if (
				props.auth.name != "Guest" &&
				!props.auth.activeSubscription?.id &&
				props.auth.emailVerifiedAt &&
				location.pathname.match("/admin/")
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
