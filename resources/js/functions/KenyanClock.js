import React, { useEffect, useState } from "react"

import Btn from "@/components/Core/Btn"

const KenyanClock = (props) => {
	const [kenyanTime, setKenyanTime] = useState("")
	const [kenyanTime2, setKenyanTime2] = useState("")

	useEffect(() => {
		// Function for Kenyann Clock
		const getKenyanTime = () => {
			const kenyanOffset = 3 // Kenyan time zone offset from UTC (in hours)
			const now = new Date()
			const utc = now.getTime() + now.getTimezoneOffset() * 60000 // Convert to UTC
			const kenyan = new Date(utc + 3600000 * kenyanOffset) // Adjust for Kenyan time

			const formattedTime = kenyan.toLocaleTimeString("en-KE", {
				timeZone: "Africa/Nairobi",
				day: "numeric",
				weekday: "short",
				month: "short",
				year: "numeric",
				hour: "2-digit",
				minute: "2-digit",
				second: "2-digit",
				hour12: true,
			})

			const formattedTime2 = kenyan.toLocaleTimeString("en-KE", {
				timeZone: "Africa/Nairobi",
				hour: "2-digit",
				minute: "2-digit",
				second: "2-digit",
				hour12: true,
			})

			setKenyanTime(formattedTime)
			setKenyanTime2(formattedTime2)
		}

		// Update the time every second
		const interval = setInterval(getKenyanTime, 1000)

		// Clean up interval on component unmount
		return () => clearInterval(interval)
	}, [])

	return (
		<React.Fragment>
			<Btn
				btnClass={`${props.className} my-1 fs-6 hidden`}
				btnText={
					<div>
						<div style={{ fontSize: "1em" }}>{kenyanTime}</div>
						<div style={{ fontSize: "0.8em" }}>EAT-GMT+3</div>
					</div>
				}
			/>

			<Btn
				btnClass={`${props.className} fs-6 anti-hidden`}
				btnText={kenyanTime2}
			/>
		</React.Fragment>
	)
}

export default KenyanClock
