import React from "react"
import { Link, useLocation } from "react-router-dom"

import LogoSVG from "@/svgs/LogoSVG"
import MenuSVG from "@/svgs/MenuSVG"
import CloseSVG from "@/svgs/CloseSVG"

window.onscroll = () => {
	if (window.pageYOffset > 0) {
		document.getElementById("header-area").classList.add("sticky")
	} else {
		document.getElementById("header-area").classList.remove("sticky")
	}
}

const Header = (props) => {
	const location = useLocation()

	// Show Admin Nav based on Location
	const showHeader =
		!location.pathname.match("/admin/") &&
		!location.pathname.match("/tenant/") &&
		!location.pathname.match("/super/") &&
		// !location.pathname.match("/download-app") &&
		!location.pathname.match("/socialite")
			? "d-block"
			: "d-none"

	return (
		<div
			id="MyElement"
			className={props.headerMenu + " " + showHeader}>
			{/* Preloader Start */}
			{/* <div id="preloader">
				<div className="preload-content">
					<div id="sonar-load"></div>
				</div>
			</div> */}
			{/* Preloader End */}

			{/* <!-- Grids --> */}
			{/* <div className="grids d-flex justify-content-between">
				<div className="grid1"></div>
				<div className="grid2"></div>
				<div className="grid3"></div>
				<div className="grid4"></div>
				<div className="grid5"></div>
				<div className="grid6"></div>
				<div className="grid7"></div>
				<div className="grid8"></div>
				<div className="grid9"></div>
			</div> */}

			{/* <!-- ***** Header Area Start ***** --> */}
			<header
				id="header-area"
				className="header-area">
				<div className="container-fluid">
					<div className="row">
						<div className="col-12">
							<div className="menu-area d-flex justify-content-between alignt-items-center my-1">
								<div className="d-flex align-items-center">
									{/* <!-- Logo Area  --> */}
									<div className="logo-area mb-2">
										<Link
											to="/"
											className="text-white">
											<LogoSVG />
										</Link>
									</div>
								</div>

								<div className="menu-content-area d-flex align-items-center">
									{/* <!-- Header Social Area --> */}
									<div className="header-social-area d-flex align-items-center">
										<a
											href="tel:0700364446"
											data-toggle="tooltip"
											data-placement="bottom"
											title="Phone">
											<i
												className="fa fa-phone"
												aria-hidden="true"></i>
										</a>
										<a
											href="sms:0700364446"
											data-toggle="tooltip"
											data-placement="bottom"
											title="SMS">
											<i
												className="fa fa-comment-o"
												aria-hidden="true"></i>
										</a>
										<a
											href="https://wa.me/+2540700364446"
											data-toggle="tooltip"
											data-placement="bottom"
											title="WhatsApp">
											<i
												className="fa fa-whatsapp"
												aria-hidden="true"></i>
										</a>
										<a
											href="mailto:alphaxardgacuuru47@gmail.com?subject=Photography&body=Enquiry"
											data-toggle="tooltip"
											data-placement="bottom"
											title="Email">
											<i
												className="fa fa-envelope-o"
												aria-hidden="true"></i>
										</a>
										<a
											href="https://www.instagram.com/alphaxard_gacuuru"
											data-toggle="tooltip"
											data-placement="bottom"
											title="Instagram">
											<i
												className="fa fa-instagram"
												aria-hidden="true"></i>
										</a>
										<a
											href="https://www.facebook.com/alphaxard.gacuuru"
											data-toggle="tooltip"
											data-placement="bottom"
											title="Facebook">
											<i
												className="fa fa-facebook"
												aria-hidden="true"></i>
										</a>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</header>
			{/* <!-- ***** Header Area End ***** --> */}

			{/* <!-- ***** Main Menu Area Start ***** --> */}
			<div className="mainMenu d-flex align-items-center justify-content-between">
				<div className="d-flex">
					{/* <!-- Logo Area --> */}
					<div className="logo-area mx-4">
						<Link
							to="/"
							className="fs-1 text-white">
							<LogoSVG />
						</Link>
					</div>
					{/* <!-- Close Icon --> */}
					<div
						className="closeIcon"
						onClick={(e) => {
							e.preventDefault()
							// Open Header Menu
							props.setHeaderMenu(props.headerMenu ? "" : "menu-open")
						}}>
						<CloseSVG />
					</div>
				</div>
			</div>
			{/* <!-- ***** Main Menu Area End ***** --> */}

			{props.children}
		</div>
	)
}

export default Header
