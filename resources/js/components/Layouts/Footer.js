import React, { useEffect, useState } from "react"
import { Link, useLocation } from "react-router-dom"

import Img from "@/components/Core/Img"

import ChevronUpSVG from "@/svgs/ChevronUpSVG"
import PhoneSVG from "@/svgs/PhoneSVG"
import EmailSVG from "@/svgs/EmailSVG"
import SMSSVG from "@/svgs/SMSSVG"
import WhatsAppSVG from "@/svgs/WhatsAppSVG"

const Footer = (props) => {
	const location = useLocation()

	const [isVisible, setIsVisible] = useState(false)

	// Show button when page is scrolled down to a certain point
	const toggleVisibility = () => {
		const scrollTop =
			window.pageYOffset ||
			document.documentElement.scrollTop ||
			document.body.scrollTop ||
			0
		if (scrollTop > 300) {
			setIsVisible(true)
		} else {
			setIsVisible(false)
		}
	}

	// Set scroll event listener
	useEffect(() => {
		// Check initial scroll position
		toggleVisibility()

		// Add listeners to multiple scroll sources
		const handleScroll = () => {
			toggleVisibility()
		}

		window.addEventListener("scroll", handleScroll, { passive: true })
		document.addEventListener("scroll", handleScroll, { passive: true })

		// Also try listening on document.body in case that's where the scroll is happening
		if (document.body) {
			document.body.addEventListener("scroll", handleScroll, { passive: true })
		}

		return () => {
			window.removeEventListener("scroll", handleScroll)
			document.removeEventListener("scroll", handleScroll)
			if (document.body) {
				document.body.removeEventListener("scroll", handleScroll)
			}
		}
	}, [])

	const onScroll = () => {
		// Try the browser's native smooth scroll first
		try {
			window.scrollTo({
				top: 0,
				behavior: "smooth",
			})

			// Check if it worked after a short delay
			setTimeout(() => {
				const newScroll =
					window.pageYOffset ||
					document.documentElement.scrollTop ||
					document.body.scrollTop

				if (newScroll > 100) {
					// Manual scroll attempts
					window.scrollTo(0, 0)
					document.documentElement.scrollTop = 0
					document.body.scrollTop = 0

					// Also try scrolling any scrollable containers
					const scrollableElements = document.querySelectorAll("*")
					scrollableElements.forEach((el) => {
						if (el.scrollTop > 0) {
							el.scrollTop = 0
						}
					})
				}
			}, 100)
		} catch (error) {
			// Direct fallback
			window.scrollTo(0, 0)
			document.documentElement.scrollTop = 0
			document.body.scrollTop = 0
		}
	}

	const show = location.pathname === "/" || location.pathname.match("/support")
	
	return (
		<React.Fragment>
			{/* Scroll to Top Button */}
			{isVisible && (
				<div
					id="scrollUpBtn"
					onClick={onScroll}>
					<ChevronUpSVG />
				</div>
			)}

			{/* Actual Footer Content */}
			{show && (
				<footer
					className="text-light py-5 mt-5"
					style={{ backgroundColor: "#232323" }}>
					<div className="container">
						{/* <!-- Contact Form Area --> */}
						<div className="text-center">
							<h2 className="mb-2 text-white">Contact Us</h2>
							<h4 className="text-white">Let’s talk</h4>
							<div className="row">
								{/* Phone Start */}
								<div className="col-sm-3">
									<a
										href="tel:0700364446"
										className="d-flex align-items-center text-white fs-1"
										data-toggle="tooltip"
										data-placement="bottom"
										title="Phone">
										<div
											className="p-2"
											style={{ width: "80px", height: "80px" }}>
											<PhoneSVG />
										</div>
										<h6 className="mb-2">0700364446</h6>
									</a>
								</div>
								{/* Phone End */}
								{/* SMS Start */}
								<div className="col-sm-3">
									<a
										href="sms:0700364446"
										className="d-flex align-items-center text-white fs-1">
										<div
											className="p-2"
											style={{ width: "80px", height: "80px" }}>
											<SMSSVG />
										</div>
										<h6 className="mb-2">0700364446</h6>
									</a>
								</div>
								{/* SMS End */}
								{/* WhatsApp Start */}
								<div className="col-sm-3">
									<a
										href="https://wa.me/+2540700364446"
										className="d-flex align-items-center text-white fs-1"
										data-toggle="tooltip"
										data-placement="bottom"
										title="WhatsApp">
										<div
											className="p-2"
											style={{ width: "80px", height: "80px" }}>
											<WhatsAppSVG />
										</div>
										<h6 className="mb-2">0700364446</h6>
									</a>
								</div>
								{/* WhatsApp End */}
								{/* Email Start */}
								<div className="col-sm-3">
									<a
										href="mailto:al@black.co.ke?subject=Property Management System&body=Enquiry"
										data-toggle="tooltip"
										className="d-flex align-items-center text-white fs-1"
										data-placement="bottom"
										title="Email">
										<div
											className="p-2"
											style={{ width: "80px", height: "80px" }}>
											<EmailSVG />
										</div>
										<h6 className="mb-2">al@black.co.ke</h6>
									</a>
								</div>
								{/* Email End */}
							</div>
						</div>

						<hr className="mb-5 border-light" />

						<div className="row">
							<div className="col-lg-4 col-md-6 mb-4">
								<h5 className="text-white mb-3">Black Property</h5>
								<p className="text-white">
									Streamline your property management with our comprehensive
									solution. From tenant management to billing, we've got you
									covered.
								</p>
							</div>

							<div className="col-lg-2 col-md-6 mb-4">
								<h6 className="text-white mb-3">Features</h6>
								<ul className="list-unstyled">
									<li className="mb-2">
										<Link
											to="/properties"
											className="text-white text-decoration-none">
											Properties
										</Link>
									</li>
									<li className="mb-2">
										<Link
											to="/tenants"
											className="text-white text-decoration-none">
											Tenants
										</Link>
									</li>
									<li className="mb-2">
										<Link
											to="/invoices"
											className="text-white text-decoration-none">
											Billing
										</Link>
									</li>
									<li className="mb-2">
										<Link
											to="/reports"
											className="text-white text-decoration-none">
											Reports
										</Link>
									</li>
								</ul>
							</div>

							<div className="col-lg-2 col-md-6 mb-4">
								<h6 className="text-white mb-3">Support</h6>
								<ul className="list-unstyled">
									<li className="mb-2">
										<a
											href="#"
											className="text-white text-decoration-none">
											Help Center
										</a>
									</li>
									<li className="mb-2">
										<a
											href="#"
											className="text-white text-decoration-none">
											Contact Us
										</a>
									</li>
									<li className="mb-2">
										<a
											href="#"
											className="text-white text-decoration-none">
											Privacy Policy
										</a>
									</li>
									<li className="mb-2">
										<a
											href="#"
											className="text-white text-decoration-none">
											Terms of Service
										</a>
									</li>
								</ul>
							</div>

							<div className="col-lg-4 col-md-6 mb-4">
								<h6 className="text-white mb-3">Connect</h6>
								<p className="text-white">
									Stay updated with the latest features and property management
									tips.
								</p>
								<div className="d-flex gap-3 mt-3">
									<a
										href="#"
										className="text-white">
										<PhoneSVG />
									</a>
									<a
										href="#"
										className="text-white">
										<SMSSVG />
									</a>
									<a
										href="#"
										className="text-white">
										<WhatsAppSVG />
									</a>
									<a
										href="#"
										className="text-white">
										<EmailSVG />
									</a>
								</div>
							</div>
						</div>

						<hr className="my-4 border-secondary" />

						<div className="row align-items-center">
							<div className="col-md-6">
								<p className="text-white mb-0">
									© {new Date().getFullYear()} BlackProperty. All rights
									reserved.
								</p>
							</div>
							<div className="col-md-6 text-md-end">
								<p className="text-white mb-0">
									Made with ❤️ for property managers
								</p>
							</div>
						</div>
					</div>
				</footer>
			)}
		</React.Fragment>
	)
}

export default Footer
