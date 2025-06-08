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
		<div>
			{/* Contact Start */}
			<section
				className="sonar-contact-area section-padding-100 py-5 card shadow-sm">
				{/* <!-- back end content --> */}
				<div className="backEnd-content">
					<img
						className="dots"
						src="img/core-img/dots.png"
						alt=""
					/>
				</div>

				<div className="container mb-5">
					<div className="row">
						{/* <!-- Contact Form Area --> */}
						<div className="col-12">
							<div className="text-center">
								<h2 className="mb-2 text-dark">Contact Us</h2>
								<h4 className="text-dark">Let’s talk</h4>
								<div className="d-flex justify-content-center flex-wrap">
									<div
										className="border border-dark rounded-circle p-2 m-4"
										style={{ width: "80px", height: "80px" }}>
										<a
											href="tel:0700364446"
											className="text-dark my-auto fs-1"
											data-toggle="tooltip"
											data-placement="bottom"
											title="Phone">
											<PhoneSVG />
										</a>
									</div>
									<div
										className="border border-dark rounded-circle p-2 m-4"
										style={{ width: "80px", height: "80px" }}>
										<a
											href="sms:0700364446"
											className="text-dark my-auto fs-1">
											<SMSSVG />
										</a>
									</div>
									<div
										className="border border-dark rounded-circle p-2 m-4"
										style={{ width: "80px", height: "80px" }}>
										<a
											href="https://wa.me/+2540700364446"
											className="text-dark my-auto fs-1"
											data-toggle="tooltip"
											data-placement="bottom"
											title="WhatsApp">
											<WhatsAppSVG />
										</a>
									</div>
									<div
										className="border border-dark rounded-circle p-2 m-4"
										style={{ width: "80px", height: "80px" }}>
										<a
											href="mailto:al@black.co.ke?subject=Property Management System&body=Enquiry"
											data-toggle="tooltip"
											className="text-dark my-auto fs-1"
											data-placement="bottom"
											title="Email">
											<EmailSVG />
										</a>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>
			{/* Contact End */}
		</div>
	)
}

export default index
