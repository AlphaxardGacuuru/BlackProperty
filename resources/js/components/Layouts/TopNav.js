import React, { useEffect, useState } from "react"
import { Link, useLocation, useHistory, withRouter } from "react-router-dom"

import Btn from "@/components/Core/Btn"
import Img from "@/components/Core/Img"
import MyLink from "@/components/Core/MyLink"

import CloseSVG from "@/svgs/CloseSVG"
import LogoutSVG from "@/svgs/LogoutSVG"
import DownloadSVG from "@/svgs/DownloadSVG"
import MenuSVG from "@/svgs/MenuSVG"
import LogoSVG from "@/svgs/LogoSVG"

const TopNav = (props) => {
	const location = useLocation()
	const router = useHistory()

	const [menu, setMenu] = useState("")
	const [bottomMenu, setBottomMenu] = useState()
	const [avatarVisibility, setAvatarVisibility] = useState("")

	const logout = () => {
		Axios.post(`/logout`)
			.then((res) => {
				props.setMessages([res.data.message])
				// Remove phone from localStorage
				localStorage.clear()
				// Reload
				window.location.reload()
			})
			.catch((err) => {
				props.getErrors(err)
				// Remove phone from localStorage
				localStorage.clear()
				// Reload
				window.location.reload()
			})
	}

	// Show Admin Nav based on Location
	const showTopNav =
		!location.pathname.match("/student/") &&
		!location.pathname.match("/admin/") &&
		!location.pathname.match("/instructor/")
			? "d-block"
			: "d-none"

	// Function for showing active color
	const active = (check) => {
		return location.pathname.match(check) && "shadow rounded-pill py-2 px-5"
	}

	const activeStrict = (check) => {
		return location.pathname == check && "shadow rounded-pill py-2 px-5"
	}

	// Function for showing active color
	const active2 = (check) => {
		return {
			color: location.pathname.match(check) ? "#0077B6" : "#232323",
		}
	}

	// Function for showing active color
	const activeStrict2 = (check) => {
		return {
			color: location.pathname == check ? "#0077B6" : "#232323",
		}
	}

	return (
		<React.Fragment>
			<div
				id="MyElement"
				className={`${menu} ${showTopNav}`}>
				{/* <!-- ***** Header Area Start ***** --> */}
				<header
					className="header-area shadow py-1"
					style={{ backgroundColor: "#d82a4e" }}>
					<div className="container-fluid p-0">
						<div className="row">
							<div className="col-12">
								<div className="menu-area d-flex justify-content-between">
									<div className="d-flex align-items-center">
										{/* <!-- Logo Area  --> */}
										<div className="logo-area">
											<Link
												to="/"
												className="text-white fs-1">
												<Img
													src="/storage/img/android-chrome-512x512.png"
													style={{
														width: "2em",
														height: "auto",
													}}
												/>
											</Link>
										</div>
									</div>

									{/* Nav Links */}
									<div className="d-flex align-items-center justify-content-between">
										<div className="hidden">
											<Link
												to="/"
												className={`nav-link text-light mx-4 ${activeStrict(
													"/"
												)}`}
												onClick={() => setMenu("")}>
												Home
											</Link>
										</div>
										<div className="hidden">
											<Link
												to="/about"
												className={`nav-link text-light mx-4 ${activeStrict(
													"/about"
												)}`}
												onClick={() => setMenu("")}>
												About
											</Link>
										</div>
										<div className="hidden">
											<Link
												to="/courses"
												className={`nav-link text-light mx-4 ${active(
													"/courses"
												)}`}
												onClick={() => setMenu("")}>
												Courses
											</Link>
										</div>
										<div className="hidden">
											<Link
												to="/blog"
												className={`nav-link text-light mx-4 ${active(
													"/blog"
												)}`}
												onClick={() => setMenu("")}>
												Blog
											</Link>
										</div>
										<div className="hidden">
											<Link
												to="/contact"
												className={`nav-link text-light mx-4 ${active(
													"/contact"
												)}`}
												onClick={() => setMenu("")}>
												Contact
											</Link>
										</div>
									</div>
									{/* Nav Links End */}

									{/* Top Nav Links Area */}
									<div className="menu-content-area d-flex align-items-center">
										<div className="d-flex align-items-center justify-content-between">
											{/* Admin */}
											{props.auth.accountType == "staff" && (
												<Link
													to="/admin/dashboard"
													className="site-btn btn-dark dropdown-item">
													ADMIN
												</Link>
											)}
											{/* Admin End */}
											{/* Instructor */}
											{props.auth.accountType == "instructor" && (
												<Link
													to={`/instructor/${props.auth.id}/show`}
													className="site-btn btn-dark dropdown-item">
													INSTRUCTOR
												</Link>
											)}
											{/* Instructor End */}
											{/* Student */}
											{props.auth.accountType == "student" && (
												<Link
													to={`/student/${props.auth.id}/show`}
													className="site-btn btn-dark dropdown-item">
													STUDENT
												</Link>
											)}
											{/* Student End */}
										</div>

										{props.auth.name == "Guest" ? (
											<Link
												to="/login"
												className="site-btn btn-dark dropdown-item">
												LOGIN
											</Link>
										) : (
											<div className="header-social-area d-flex align-items-center">
												{/* Avatar Dropdown */}
												<div className="dropdown-center">
													{/* Avatar */}
													<a
														href="#"
														role="button"
														className="hidden"
														data-bs-toggle="dropdown"
														aria-expanded="false">
														<Img
															src={props.auth?.avatar}
															className="rounded-circle bg-light p-1"
															width="40px"
															height="40px"
															alt="Avatar"
														/>
													</a>
													{/* For small screens */}
													<span
														className="anti-hidden me-2"
														onClick={() => {
															setBottomMenu(bottomMenu ? "" : "menu-open")
															setAvatarVisibility("block")
														}}>
														<Img
															src={props.auth?.avatar}
															className="rounded-circle bg-light p-1"
															width="40px"
															height="40px"
															alt="Avatar"
														/>
													</span>
													{/* Avatar End */}
													<div className="dropdown-menu rounded-0 m-0 p-0 bg-white">
														<Link
															to={`/admin/staff/edit/${props.auth.id}`}
															className="p-2 px-3 pt-3 dropdown-item">
															<div className="d-flex">
																<div className="align-items-center">
																	<Img
																		src={props.auth?.avatar}
																		className="rounded-circle"
																		width="25px"
																		height="25px"
																		alt="Avatar"
																	/>
																</div>
																<div className="ps-2">
																	<h6 className="text-wrap fs-6">
																		{props.auth?.name}
																	</h6>
																	<p
																		className="text-wrap text-capitalize"
																		style={{ margin: "0px" }}>
																		{props.auth?.accountType}
																	</p>
																</div>
															</div>
														</Link>
														<Link
															to="/download"
															className="p-2 px-3 dropdown-item"
															style={{
																display: props.downloadLink ? "block" : "none",
															}}>
															<h6>
																<span className="me-2">
																	<DownloadSVG />
																</span>
																Get App
															</h6>
														</Link>
														<Link
															to="#"
															className="p-2 px-3 dropdown-item"
															onClick={(e) => logout(e)}>
															<h6 className="fs-6">
																<span className="me-2">
																	<LogoutSVG />
																</span>
																Logout
															</h6>
														</Link>
													</div>
												</div>
												{/* Avatar Dropdown End */}
											</div>
										)}
										{/* Top Nav Links Area End */}
										{/* <!-- Menu Icon --> */}
										<a
											href="#"
											id="menuIcon"
											className="anti-hidden"
											onClick={(e) => {
												e.preventDefault()
												setMenu("menu-open")
											}}>
											<MenuSVG />
										</a>
										{/* <!-- Menu Icon End --> */}
									</div>
								</div>
							</div>
						</div>
					</div>
				</header>
				<br />
				{/* Remove for profile page for better background image */}
				<span>
					<br />
					<br className="hidden" />
				</span>

				{/* <!-- ***** Side Menu Area Start ***** --> */}
				<div className="mainMenu d-flex align-items-center justify-content-between">
					{/* <!-- Close Icon --> */}
					<div
						className="closeIcon text-white"
						onClick={() => setMenu("")}>
						<CloseSVG />
					</div>
					{/* <!-- Logo Area --> */}
					<div className="logo-area">
						<Link to="/">
							<Img
								src="storage/img/logo.png"
								style={{ width: "4em", height: "auto" }}
							/>
						</Link>
					</div>
					{/* <!-- Nav --> */}
					<div
						className="sonarNav wow fadeInUp"
						data-wow-delay="1s">
						<nav>
							<ul>
								<li className="nav-item active">
									<Link
										to="/"
										style={activeStrict2("/")}
										className="nav-link text-white"
										onClick={() => setMenu("")}>
										Home
									</Link>
								</li>
								<li className="nav-item active">
									<Link
										to="/about"
										style={activeStrict2("/about")}
										className="nav-link text-white"
										onClick={() => setMenu("")}>
										About Us
									</Link>
								</li>
								<li className="nav-item active">
									<Link
										to="/courses"
										style={activeStrict2("/courses")}
										className="nav-link text-white"
										onClick={() => setMenu("")}>
										Courses
									</Link>
								</li>
								<li className="nav-item active">
									<Link
										to="/news"
										style={activeStrict2("/news")}
										className="nav-link text-white"
										onClick={() => setMenu("")}>
										News
									</Link>
								</li>
								<li className="nav-item active">
									<Link
										to="/contact"
										style={activeStrict2("/contact")}
										className="nav-link text-white"
										onClick={() => setMenu("")}>
										Contact
									</Link>
								</li>
							</ul>
						</nav>
					</div>
					<br />
				</div>
				{/* <!-- ***** Side Menu Area End ***** --> */}
			</div>

			{/* Sliding Bottom Nav */}
			<div className={bottomMenu}>
				<div
					className="bottomMenu"
					style={{ backgroundColor: "#d82a4e" }}>
					<div className="d-flex align-items-center justify-content-between">
						<div></div>
						{/* <!-- Close Icon --> */}
						<div
							className="closeIcon mt-2 me-2 text-white"
							style={{ fontSize: "0.8em" }}
							onClick={() => setBottomMenu("")}>
							<CloseSVG />
						</div>
					</div>

					{/* Avatar Bottom */}
					<div
						className="m-0 p-0"
						style={{ display: avatarVisibility }}>
						<Link
							to={`/admin/staff/edit/${props.auth.id}`}
							style={{ padding: "0px", margin: "0px" }}
							className="border-bottom text-start"
							onClick={() => setBottomMenu("")}>
							<div className="d-flex text-white">
								<div className="ms-3 me-3">
									<Img
										src={props.auth?.avatar}
										className="rounded-circle"
										width="25px"
										height="25px"
										alt="Avatar"
									/>
								</div>
								<div>
									<h5>{props.auth?.name}</h5>
								</div>
							</div>
						</Link>
						<Link
							to="/download"
							className="p-2 text-start"
							style={{
								display: props.downloadLink ? "inline" : "none",
								textAlign: "left",
							}}
							onClick={() => setBottomMenu("")}>
							<h6 className="text-white">
								<span className="ms-3 me-4">
									<DownloadSVG />
								</span>
								Get App
							</h6>
						</Link>
						<Link
							to="#"
							className="p-2 text-start text-white"
							onClick={(e) => {
								e.preventDefault()
								setBottomMenu("")
								logout()
							}}>
							<h6>
								<span className="ms-3 me-4">
									<LogoutSVG />
								</span>
								Logout
							</h6>
						</Link>
					</div>
					{/* Avatar Bottom End */}
				</div>
			</div>
			{/* Sliding Bottom Nav End */}
		</React.Fragment>
	)
}

export default withRouter(TopNav)
