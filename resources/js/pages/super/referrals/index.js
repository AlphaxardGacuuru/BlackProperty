import React, { useEffect, useState } from "react"

import ReferralList from "@/components/Referrals/ReferralList"

const index = (props) => {
	// Get Referrals
	const [referrals, setReferrals] = useState([])

	const [nameQuery, setNameQuery] = useState("")
	const [emailQuery, setEmailQuery] = useState("")
	const [phoneQuery, setPhoneQuery] = useState("")

	const dataToFetch = () => {
		props.getPaginated(
			`referrals?refererId=${props.auth?.id}&
			name=${nameQuery}&
			email=${emailQuery}&
			phone=${phoneQuery}`,
			setReferrals
		)
	}

	useEffect(() => {
		// Set page
		props.setPage({ name: "Referrals", path: ["referrals"] })
		dataToFetch()
	}, [props.selectedPropertyId, nameQuery, phoneQuery, emailQuery])

	return (
		<div className="row">
			<div className="col-sm-12">
				{/* Referrals Tab */}
				<ReferralList
					{...props}
					referrals={referrals}
					setReferrals={setReferrals}
					setNameQuery={setNameQuery}
					setEmailQuery={setEmailQuery}
					setPhoneQuery={setPhoneQuery}
					stateToUpdate={dataToFetch}
				/>
				{/* Referrals Tab End */}
			</div>
		</div>
	)
}

export default index