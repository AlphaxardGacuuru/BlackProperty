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
		(!location.pathname.match("/instructor/") &&
			!location.pathname.match("/student/"))
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
							<div className="menu-area d-flex justify-content-between my-3">
								{/* <!-- Logo Area  --> */}
								<div className="logo-area">
									<Link
										to="/"
										className="fs-1 text-white">
										<LogoSVG />
									</Link>
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
									{/* <!-- Left Menu Icon --> */}
									<a
										href="#"
										id="menuIcon"
										className="text-white me-3"
										onClick={(e) => {
											e.preventDefault()
											// Open Admin Menu
											props.setHeaderMenu(props.headerMenu ? "" : "menu-open")
										}}>
										<MenuSVG />
									</a>
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

				<div
					className="sonarNav wow fadeInUp"
					data-wow-delay="1s">
					<nav>
						<ul>
							<li className="nav-item active">
								<Link
									className="nav-link"
									to="/"
									style={{ opacity: location.pathname == "/" ? 1 : 0.4 }}
									onClick={close}>
									Home
								</Link>
							</li>
							<li className="nav-item">
								<Link
									className="nav-link"
									to="/about"
									style={{ opacity: location.pathname == "/about" ? 1 : 0.4 }}
									onClick={close}>
									About Me
								</Link>
							</li>
							<li className="nav-item">
								<Link
									className="nav-link"
									to="/services"
									style={{
										opacity: location.pathname == "/services" ? 1 : 0.4,
									}}
									onClick={close}>
									Services
								</Link>
							</li>
							<li className="nav-item">
								<Link
									className="nav-link"
									to="/portfolio"
									style={{
										opacity: location.pathname == "/portfolio" ? 1 : 0.4,
									}}
									onClick={close}>
									Portfolio
								</Link>
							</li>
							<li className="nav-item">
								<Link
									className="nav-link"
									to="/contact"
									style={{ opacity: location.pathname == "/contact" ? 1 : 0.4 }}
									onClick={close}>
									Contact
								</Link>
							</li>
							<li className="nav-item">
								<Link
									className="nav-link"
									to="/contract"
									style={{
										opacity: location.pathname == "/contract" ? 1 : 0.4,
									}}
									onClick={close}>
									Contract
								</Link>
							</li>
						</ul>
					</nav>
				</div>
				{/* <!-- Copwrite Text --> */}
				<div className="copywrite-text">
					<p>
						{/* <!-- Link back to Colorlib can't be removed. Template is licensed under CC BY 3.0. --> */}
						Copyright &copy;
						<script>document.write(new Date().getFullYear());</script> All
						rights reserved | This template is made with{" "}
						<i
							className="fa fa-heart-o"
							aria-hidden="true"></i>{" "}
						by{" "}
						<a
							href="https://colorlib.com"
							target="_blank">
							Colorlib
						</a>
						{/* <!-- Link back to Colorlib can't be removed. Template is licensed under CC BY 3.0. --> */}
					</p>
				</div>
			</div>
			{/* <!-- ***** Main Menu Area End ***** --> */}

			{props.children}
		</div>
	)
}

export default Header
