import React, { useEffect, useState } from "react"
import { Link, useLocation } from "react-router-dom"

import Img from "@/components/Core/Img"

import ChevronUpSVG from "@/svgs/ChevronUpSVG"

const Footer = (props) => {
	const location = useLocation()

	const [isVisible, setIsVisible] = useState(false)
	const [faculties, setFaculties] = useState([])

	useEffect(() => props.get("faculties", setFaculties), [])

	// Show button when page is scrolled down to a certain point
	const toggleVisibility = () => {
		if (window.pageYOffset > 300) {
			setIsVisible(true)
		} else {
			setIsVisible(false)
		}
	}

	// Set scroll event listener
	useEffect(() => {
		window.addEventListener("scroll", toggleVisibility)
		return () => {
			window.removeEventListener("scroll", toggleVisibility)
		}
	}, [])

	const onScroll = () => {
		// Smooth scroll to top
		window.scrollTo({
			top: 0,
			behavior: "smooth",
		})
	}

	const hide =
		location.pathname.match("/student/") ||
		location.pathname.match("/instructor/") ||
		location.pathname.match("/admin/") ||
		location.pathname.match("/register") ||
		location.pathname.match("/login")
			? "d-none"
			: ""

	return (
		<React.Fragment>
			{/* footer section */}
			<footer className={`footer-section spad px-4 pb-0 ${hide}`}>
				<div className="footer-top">
					<div className="footer-warp">
						<div className="row">
							{faculties.map((faculty, key) => (
								<div
									key={key}
									className="widget-item mb-4">
									<h4>{faculty.name}</h4>
									<ul>
										{faculty.courses.map((course, key) => (
											<li key={key}>
												<a href="">{course.name}</a>
											</li>
										))}
									</ul>
								</div>
							))}
							<div className="widget-item">
								<h4>Contact Info</h4>
								<ul className="contact-list">
									<li>
										1481 Creekside Lane <br />
										Nairobi, Kenya
									</li>
									<li>+254722777990</li>
									<li>drkarenge@gmail.com</li>
								</ul>
							</div>
						</div>
					</div>
				</div>
				<div className="footer-bottom">
					<div className="footer-warp">
						<ul className="footer-menu">
							<li>
								<a href="#">Terms & Conditions</a>
							</li>
							<li>
								<a href="#">Register</a>
							</li>
							<li>
								<a href="#">Privacy</a>
							</li>
						</ul>
						<div className="copyright">
							<a
								target="_blank"
								href="https://www.templateshub.net">
								Templates Hub
							</a>
						</div>
					</div>
				</div>
			</footer>
			{/* footer section end */}

			{isVisible && (
				<div
					id="scrollUpBtn"
					onClick={onScroll}>
					<ChevronUpSVG />
				</div>
			)}
		</React.Fragment>
	)
}

export default Footer
