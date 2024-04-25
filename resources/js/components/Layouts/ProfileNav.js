import React, { useState } from "react"
import { Link, useLocation, useHistory } from "react-router-dom"

import CloseSVG from "@/svgs/CloseSVG"
import CupSVG from "@/svgs/CupSVG"
import MenuSVG from "@/svgs/MenuSVG"
import PersonSVG from "@/svgs/PersonSVG"
import HomeSVG from "@/svgs/HomeSVG"
import MembershipSVG from "@/svgs/MembershipSVG"
import ClubSVG from "@/svgs/ClubSVG"
import EventSVG from "@/svgs/EventSVG"
import LoyaltySVG from "@/svgs/LoyaltySVG"
import TransactionSVG from "../../svgs/TransactionSVG"

const ProfileNav = (props) => {
	const location = useLocation()

	// Location
	const show = location.pathname.match("profile") ? "d-block" : "d-none"

	// Function for showing active color
	const active = (check) => {
		return (
			location.pathname.match(check) &&
			"rounded-end-pill text-primary bg-primary-subtle"
		)
	}

	// Function for showing active color
	const activeStrict = (check) => {
		return (
			location.pathname == check &&
			"rounded-end-pill text-primary bg-primary-subtle"
		)
	}

	return (
		<div
			id="MyElement"
			className={props.leftMenu + " " + show}>
			{/* <!-- ***** Side Menu Area Start ***** --> */}
			<div className="leftMenu d-flex align-items-center justify-content-start">
				<div
					className="sonarNav wow fadeInUp w-100 mt-4"
					data-wow-delay="1s">
					<nav>
						<ul className="m-0 p-0">
							<li className="nav-item active">
								<Link
									to={`/profile/show/${props.auth.id}`}
									className={`nav-link text-dark ${
										active("/profile/show") || active("/profile/edit")
									}`}>
									<div className="nav-link-icon">
										<PersonSVG />
									</div>
									<div className="nav-link-text">Profile</div>
								</Link>
							</li>
							<React.Fragment>
								<li className="nav-item active">
									<Link
										to={`/profile/membership`}
										className={`nav-link text-dark ${active(
											"/profile/membership"
										)}`}>
										<div className="nav-link-icon">
											<MembershipSVG />
										</div>
										<div className="nav-link-text">Membership</div>
									</Link>
								</li>
								<li className="nav-item active">
									<Link
										to="/profile/transaction"
										className={`nav-link text-dark ${active(
											"/profile/transaction"
										)}`}>
										<div className="nav-link-icon">
											<TransactionSVG />
										</div>
										<div className="nav-link-text">Transaction History</div>
									</Link>
								</li>
								<li className="nav-item active">
									<Link
										to="/profile/event"
										className={`nav-link text-dark ${active(
											"/profile/event"
										)}`}>
										<div className="nav-link-icon">
											<EventSVG />
										</div>
										<div className="nav-link-text">Event Bookings</div>
									</Link>
								</li>
								<li className="nav-item active">
									<Link
										to="/profile/loyalty"
										className={`nav-link text-dark ${active(
											"/profile/loyalty"
										)}`}>
										<div className="nav-link-icon">
											<LoyaltySVG />
										</div>
										<div className="nav-link-text">Loyatly Points</div>
									</Link>
								</li>
							</React.Fragment>
						</ul>
					</nav>
				</div>

				<br />
			</div>
			{/* <!-- ***** Side Menu Area End ***** --> */}
			<div className="left-main">{props.children}</div>
		</div>
	)
}

ProfileNav.defaultProps = {
	notCurrentUser: false,
}

export default ProfileNav
