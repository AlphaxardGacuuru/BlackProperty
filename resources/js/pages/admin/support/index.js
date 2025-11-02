import React, { useEffect } from "react"

import EmailSVG from "@/svgs/EmailSVG"
import PhoneSVG from "@/svgs/PhoneSVG"
import SMSSVG from "@/svgs/SMSSVG"
import WhatsAppSVG from "@/svgs/WhatsAppSVG"

const index = (props) => {
	useEffect(() => {
		props.setPage({ name: "Support", path: ["support"] })
	}, [])

	return (
		<div></div>
	)
}

export default index
