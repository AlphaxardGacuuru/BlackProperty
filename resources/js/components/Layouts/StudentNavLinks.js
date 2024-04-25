import React from "react"
import { Link, useLocation } from "react-router-dom"

import PersonSVG from "@/svgs/PersonSVG"
import CourseSVG from "@/svgs/CourseSVG"
import LinkSVG from "@/svgs/LinkSVG"
import ResourceSVG from "@/svgs/ResourceSVG"

const StudentNavLinks = (props) => {
	const location = useLocation()

	// Function for showing active color
	const active = (check) => {
		return (
			location.pathname.match(check) &&
			"rounded-end-pill text-success bg-success-subtle"
		)
	}

	// Function for showing active color
	const activeStrict = (check) => {
		return (
			location.pathname == check &&
			"rounded-end-pill text-success bg-success-subtle"
		)
	}

	return (
		<React.Fragment>
			{/* Profile Link */}
			<li className="nav-item">
				<Link
					to={`/student/${props.auth.id}/show`}
					className={`nav-link ${active(/^\/student\/\d+\/show$/)}`}>
					<div className="nav-link-icon">
						<PersonSVG />
					</div>
					<div className="nav-link-text">Profile</div>
				</Link>
			</li>
			{/* Profile Link End */}
			{/* Courses Link */}
			<li className="nav-item">
				<Link
					to={`/student/courses`}
					className={`nav-link ${
						active("/student/courses") ||
						active("/student/units") ||
						active("/student/materials")
					}`}>
					<div className="nav-link-icon">
						<CourseSVG />
					</div>
					<div className="nav-link-text">Courses</div>
				</Link>
			</li>
			{/* Courses Link End */}
			{/* Chat Links */}
			{/* <li className="nav-item">
									<Link
										to={`/student/chats`}
										className={`nav-link ${active("/student/chats")}`}>
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
					to={`/student/resources`}
					className={`nav-link ${active("/student/resources")}`}>
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
					className={`nav-link accordion-button ${active("/student/club/")}`}
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
								className={`nav-link ${active("/student/club")}`}>
								About Us
							</Link>
						</li>
						<li className="nav-item">
							<Link
								to="/student/club"
								className={`nav-link ${active("/student/club")}`}>
								Policies
							</Link>
						</li>
						<li className="nav-item">
							<Link
								to="/student/club"
								className={`nav-link ${active("/student/club")}`}>
								University Catalog
							</Link>
						</li>
						<li className="nav-item">
							<Link
								to="/student/club"
								className={`nav-link ${active("/student/club")}`}>
								Support
							</Link>
						</li>
						<li className="nav-item">
							<Link
								to="/student/club"
								className={`nav-link ${active("/student/club")}`}>
								Student Portal
							</Link>
						</li>
						<li className="nav-item">
							<Link
								to="/student/club"
								className={`nav-link ${active("/student/club")}`}>
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

export default StudentNavLinks
