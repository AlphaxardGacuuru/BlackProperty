import React from "react"
import { Link, useLocation } from "react-router-dom"

import PersonSVG from "@/svgs/PersonSVG"
import CourseSVG from "@/svgs/CourseSVG"
import LinkSVG from "@/svgs/LinkSVG"
import ResourceSVG from "@/svgs/ResourceSVG"

const InstructorNavLinks = (props) => {
	const location = useLocation()

	// Function for showing active color
	const active = (check) => {
		return (
			location.pathname.match(check) &&
			"rounded-end-pill text-danger bg-danger-subtle"
		)
	}

	// Function for showing active color
	const activeStrict = (check) => {
		return (
			location.pathname == check &&
			"rounded-end-pill text-danger bg-danger-subtle"
		)
	}

	return (
		<React.Fragment>
			{/* Profile Link */}
			<li className="nav-item">
				<Link
					to={`/instructor/${props.auth.id}/show`}
					className={`nav-link ${active(/^\/instructor\/\d+\/show$/)}`}>
					<div className="nav-link-icon">
						<PersonSVG />
					</div>
					<div className="nav-link-text">Profile</div>
				</Link>
			</li>
			{/* Profile Link End */}
			{/* Chat Links */}
			{/* <li className="nav-item">
									<Link
										to={`/instructor/chats`}
										className={`nav-link ${active("/instructor/chats")}`}>
										<div className="nav-link-icon">
											<ChatSVG />
										</div>
										<div className="nav-link-text">Chat</div>
									</Link>
								</li> */}
			{/* Chat Link End */}
			{/* Resources Link */}
			<li className="nav-item">
				<Link
					to={`/instructor/resources`}
					className={`nav-link ${active("/instructor/resources")}`}>
					<div className="nav-link-icon">
						<ResourceSVG />
					</div>
					<div className="nav-link-text">Resources</div>
				</Link>
			</li>
			{/* Resources Link End */}
			{/* Quick Links */}
			<li className="nav-item">
				<a
					href="#"
					className={`nav-link accordion-button ${active("/instructor/club/")}`}
					data-bs-toggle="collapse"
					data-bs-target="#collapseLink"
					aria-expanded="false"
					aria-controls="collapseLink">
					<span>
						<LinkSVG />
					</span>
					Links
				</a>

				{/* Collapse */}
				<div
					className="collapse"
					id="collapseLink">
					<ol className="text-end">
						<li className="nav-item">
							<Link
								to="/about"
								className={`nav-link ${active("/instructor/club")}`}>
								About Us
							</Link>
						</li>
						<li className="nav-item">
							<Link
								to="/instructor/club"
								className={`nav-link ${active("/instructor/club")}`}>
								Policies
							</Link>
						</li>
						<li className="nav-item">
							<Link
								to="/instructor/club"
								className={`nav-link ${active("/instructor/club")}`}>
								University Catalog
							</Link>
						</li>
						<li className="nav-item">
							<Link
								to="/instructor/club"
								className={`nav-link ${active("/instructor/club")}`}>
								Support
							</Link>
						</li>
						<li className="nav-item">
							<Link
								to="/instructor/club"
								className={`nav-link ${active("/instructor/club")}`}>
								Student Portal
							</Link>
						</li>
						<li className="nav-item">
							<Link
								to="/instructor/club"
								className={`nav-link ${active("/instructor/club")}`}>
								Contact Info
							</Link>
						</li>
					</ol>
				</div>
			</li>
			{/* Collapse End */}
			{/* Quick Links End */}
		</React.Fragment>
	)
}

export default InstructorNavLinks
