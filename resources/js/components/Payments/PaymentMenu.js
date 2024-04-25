import React, { useState } from "react"

import FlutterWaveHookBtn from "@/components/Payments/FlutterWaveHookBtn"
import KopokopoBtn from "@/components/Payments/KopokopoBtn"

import CloseSVG from "@/svgs/CloseSVG"

const PaymentMenu = (props) => {
	const [stkPushed, setStkPushed] = useState()
	return (
		<React.Fragment>
			<div className={props.showPayMenu}>
				<div className="bottomMenu">
					<div className="d-flex align-items-center justify-content-between">
						{/* Title */}
						<div className="m-1">
							<h4>Choose a Payment Method</h4>
						</div>
						{/* Title End */}

						{/* Close Icon */}
						<div
							className="closeIcon me-2"
							style={{ fontSize: "0.8em" }}
							onClick={() => props.setShowPayMenu("")}>
							<CloseSVG />
						</div>
						{/* Close Icon End */}
					</div>

					<div className="mt-4 mb-2">
						<FlutterWaveHookBtn
							{...props}
							paymentAmount={props.paymentAmount}
							paymentTitle={props.paymentTitle}
							paymentDescription={props.paymentDescription}
							text="pay with card"
						/>
					</div>
					<div className="mb-2">
						<KopokopoBtn
							{...props}
							paymentAmount={props.paymentAmount}
							text="pay with card"
							setStkPushed={setStkPushed}
						/>
					</div>
				</div>
			</div>

			<div className={stkPushed}>
				<div className="bottomMenu">
					<div className="d-flex align-items-center justify-content-between">
						{/* Title */}
						<div className="m-1">
							<h4>MPESA Payment</h4>
						</div>
						{/* Title End */}

						{/* Close Icon */}
						<div
							className="closeIcon me-2"
							style={{ fontSize: "0.8em" }}
							onClick={() => setStkPushed("")}>
							<CloseSVG />
						</div>
						{/* Close Icon End */}
					</div>

					<center>
						<h5>
							Request was sent to
							<span className="text-success"> {props.auth.phone}</span>
						</h5>
						<br />

						<h6>Checking payment</h6>
						<div className="spinner-border spinner-border-lg border-2 text-success my-4 mx-2"></div>
					</center>
				</div>
			</div>
		</React.Fragment>
	)
}

export default PaymentMenu
