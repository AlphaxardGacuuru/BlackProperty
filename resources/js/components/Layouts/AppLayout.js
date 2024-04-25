import React from "react"

import Messages from "@/components/Core/Messages"
import TopNav from "@/components/Layouts/TopNav"
import BottomNav from "@/components/Layouts/BottomNav"
import Footer from "@/components/Layouts/Footer"

const AppLayout = ({ GLOBAL_STATE, children }) => {
	return (
		<React.Fragment>
			<TopNav {...GLOBAL_STATE} />

			{/* Page Content */}
			<main>{children}</main>

			{/* <BottomNav {...GLOBAL_STATE} /> */}
			<Messages {...GLOBAL_STATE} />
			<Footer />
		</React.Fragment>
	)
}

export default AppLayout
