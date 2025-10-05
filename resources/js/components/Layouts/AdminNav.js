import React, { useEffect, useState } from "react"
import { Link, useLocation, useHistory, withRouter } from "react-router-dom"
import CryptoJS from "crypto-js"

import SuperNavLinks from "@/components/Layouts/SuperNavLinks"
import AdminNavLinks from "@/components/Layouts/AdminNavLinks"
import TenantNavLinks from "@/components/Layouts/TenantNavLinks"

import Btn from "@/components/Core/Btn"
import Img from "@/components/Core/Img"
import MyLink from "@/components/Core/MyLink"

import CloseSVG from "@/svgs/CloseSVG"
import LogoutSVG from "@/svgs/LogoutSVG"
import DownloadSVG from "@/svgs/DownloadSVG"
import MenuSVG from "@/svgs/MenuSVG"
import ChevronRightSVG from "@/svgs/ChevronRightSVG"
import BellSVG from "@/svgs/BellSVG"
import LogoSVG from "@/svgs/LogoSVG"
import TenantSVG from "@/svgs/TenantSVG"
import PersonSVG from "@/svgs/PersonSVG"
import HomeSVG from "@/svgs/HomeSVG"

const AdminMenu = (props) => {
	const location = useLocation()
	const history = useHistory()

	const [notifications, setNotifications] = useState([])

	const [bottomMenu, setBottomMenu] = useState()
	const [avatarVisibility, setAvatarVisibility] = useState("")

	useEffect(() => {
		var isInSuperPage = location.pathname.match("/super/")

		// Handle Redirects for Super
		if (isInSuperPage) {
			// Redirect back if not super user
			if (
				!["al@black.co.ke", "alphaxardgacuuru47@gmail.com"].includes(
					props.auth.email
				)
			) {
				setTimeout(() => {
					props.setErrors(["Restricted Access"])
					history.goBack()
				}, 2000)
			}
		}
	}, [props.location, props.auth])

	useEffect(() => {
		if (props.auth.name == "Guest") {
			return
		}

		props.get("notifications", setNotifications, null, false)
	}, [])

	const onNotification = () => {
		Axios.put(`/api/notifications/update`).then((res) => {
			// Update notifications
			props.get("notifications", setNotifications)
		})
	}

	const onDeleteNotifications = (id) => {
		// Clear the notifications array
		setNotifications([])

		Axios.delete(`/api/notifications/${id}`).then((res) => {
			// Update Notifications
			props.get("notifications", setNotifications)
		})
	}

	const logout = () => {
		Axios.post(`/logout`)
			.then((res) => {
				props.setMessages([res.data.message])
				// Remove phone from localStorage
				localStorage.clear()
				// Set Auth to Guest
				props.setAuth({
					name: "Guest",
					avatar: "/storage/avatars/male-avatar.png",
					accountType: "normal",
					decos: 0,
					posts: 0,
					fans: 0,
				})
				// Redirect to Dashboard
				location.pathname.match("/admin")
					? setTimeout(() => history.push("/admin/dashboard"), 500)
					: setTimeout(() => history.push("/tenant/dashboard"), 500)
			})
			.catch((err) => {
				props.getErrors(err)
				// Remove phone from localStorage
				localStorage.clear()
				// Set Auth to Guest
				props.setAuth({
					name: "Guest",
					avatar: "/storage/avatars/male-avatar.png",
					accountType: "normal",
					decos: 0,
					posts: 0,
					fans: 0,
				})
				// Redirect to Dashboard
				setTimeout(() => history.push("/admin/dashboard"), 500)
				// Reload
				setTimeout(() => window.location.reload(), 500)
			})
	}

	// Show Admin Nav based on Location
	const showAdminNav =
		location.pathname.match("/admin/") ||
		location.pathname.match("/tenant/") ||
		(location.pathname.match("/super/") &&
			!location.pathname.match("/admin/login") &&
			!location.pathname.match("/admin/register") &&
			!location.pathname.match("/socialite"))
			? "d-block"
			: "d-none"

	const profileLink = location.pathname.match("/tenant/")
		? ""
		: `${location.pathname.match("/super/") ? "/super" : "/admin"}/user/${
				props.auth.id
		  }/edit`

	return (
		<React.Fragment>
			<div
				id="MyElement"
				className={props.adminMenu + " " + showAdminNav}>
				{/* <!-- ***** Header Area Start ***** --> */}
				<header className={`header-area shadow-lg`}>
					<div className="container-fluid p-0">
						<div className="row">
							<div className="col-12">
								<div className="menu-area d-flex justify-content-between my-1">
									<div className="d-flex align-items-center">
										{/* <!-- Left Menu Icon --> */}
										<a
											href="#"
											id="menuIcon"
											className="text-white me-3"
											onClick={(e) => {
												e.preventDefault()
												// Open Admin Menu
												props.setAdminMenu(props.adminMenu ? "" : "left-open")
											}}>
											<MenuSVG />
										</a>
										{/* <!-- Left Menu Icon End --> */}

										{/* <!-- Logo Area  --> */}
										<div className="logo-area hidden me-2 mb-2">
											<Link
												to="/admin"
												className="text-white">
												<LogoSVG />
											</Link>
										</div>
									</div>

									{/* Property List */}
									{location.pathname.match("/admin/") && (
										<div className="nav-property-dropdown">
											<select
												className="form-control mt-2"
												onChange={(e) => {
													localStorage.setItem(
														"selectedPropertyId",
														e.target.value
													)
													props.setSelectedPropertyId(e.target.value)
												}}>
												{[{ id: props.auth.propertyIds, name: "All" }]
													.concat(props.properties)
													.map((property, key) => (
														<option
															key={key}
															value={property.id}
															selected={
																property.id == props.selectedPropertyId
															}>
															{property.name}
														</option>
													))}
											</select>
											{/* List End */}
										</div>
									)}
									{/* Property List End */}

									{/* Top Nav Links Area */}
									<div className="menu-content-area d-flex align-items-center">
										<div className="header-social-area d-flex align-items-center">
											<>
												{/* Notification Dropdown */}
												<div className="dropdown-center">
													<Link
														to="#"
														role="button"
														id="dropdownMenua"
														className="text-white"
														data-bs-toggle="dropdown"
														aria-haspopup="true"
														aria-expanded="false"
														style={{
															textAlign: "center",
															fontWeight: "100",
															position: "relative",
														}}
														onClick={onNotification}>
														<BellSVG />
														<span
															className="position-absolute start-200 translate-middle badge rounded-circle bg-danger fw-lighter py-1"
															style={{ fontSize: "0.6em", top: "0.2em" }}>
															{notifications.filter(
																(notification) => !notification.readAt
															).length > 0 &&
																notifications.filter(
																	(notification) => !notification.readAt
																).length}
														</span>
													</Link>
													<div
														style={{
															borderRadius: "0",
															minWidth: "20em",
															maxWidth: "40em",
														}}
														className="dropdown-menu m-0 p-0"
														aria-labelledby="dropdownMenuButton">
														<div className="dropdown-header border border-secondary-subtle border-start-0 border-end-0">
															Notifications
														</div>
														<div
															style={{
																maxHeight: "500px",
																overflowY: "scroll",
															}}>
															{/* Get Notifications */}
															{notifications.map((notification, key) => (
																<Link
																	key={key}
																	to={notification.url ?? "#"}
																	className="p-2 dropdown-item text-dark text-wrap"
																	onClick={() =>
																		onDeleteNotifications(notification.id)
																	}>
																	<small>{notification.message}</small>
																</Link>
															))}
														</div>
														{notifications.length > 0 && (
															<div
																className="dropdown-header"
																style={{ cursor: "pointer" }}
																onClick={() => onDeleteNotifications(0)}>
																Clear notifications
															</div>
														)}
													</div>
												</div>
												{/* Notification Dropdown End */}
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
															// className="rounded-circle bg-light p-1"
															className={`avatar ${
																props.auth?.activeSubscription && "premium-user"
															}`}
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
															className={`avatar ${
																props.auth?.activeSubscription && "premium-user"
															}`}
															alt="Avatar"
														/>
													</span>
													{/* Avatar End */}
													{/* Name Start */}
													<div className="dropdown-menu rounded-0 m-0 p-0 bg-white">
														<div className="d-flex border-bottom pb-2">
															<div className="p-2">
																<Img
																	src={props.auth?.avatar}
																	className={`avatar ${
																		props.auth?.activeSubscription &&
																		"premium-user"
																	}`}
																	style={{ minWidth: "3em", minHeight: "3em" }}
																	alt="Avatar"
																/>
															</div>
															<div>
																<Link
																	to={profileLink}
																	className="p-1 px-2 pt-3 dropdown-item">
																	<h6 className="text-nowrap fs-6">
																		{props.auth?.name}
																	</h6>
																	<small className="text-nowrap">
																		{props.auth?.email}
																	</small>
																</Link>
															</div>
														</div>
														{/* Name End */}
														{/* Landing Page Start */}
														<Link
															to="/"
															className="p-2 px-3 dropdown-item">
															<h6 className="fs-6">
																<span className="me-2">
																	<HomeSVG />
																</span>
																Landing Page
															</h6>
														</Link>
														{/* Landing Page End */}
														{/* Admin Login Start */}
														{location.pathname.match("/tenant/") ||
														location.pathname.match("/super/") ? (
															<Link
																to="/admin/dashboard"
																className="p-2 px-3 dropdown-item">
																<h6 className="fs-6">
																	<span className="me-2">
																		<PersonSVG />
																	</span>
																	Admin Portal
																</h6>
															</Link>
														) : null}
														{/* Admin Login End */}
														{/* Tenant Login Start */}
														{location.pathname.match("/admin/") ||
														location.pathname.match("/super/") ? (
															<Link
																to="/tenant/dashboard"
																className="p-2 px-3 dropdown-item">
																<h6 className="fs-6">
																	<span className="me-2">
																		<TenantSVG />
																	</span>
																	Tenant Portal
																</h6>
															</Link>
														) : null}
														{/* Tenant Login End */}
														{/* Downloand Start */}
														<Link
															to="/download"
															className="p-1 px-2 dropdown-item"
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
														{/* Download End */}
														{/* Logout Start */}
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
														{/* Logout End */}
													</div>
												</div>
												{/* Avatar Dropdown End */}
											</>
										</div>
									</div>
									{/* Top Nav Links Area End */}
								</div>
							</div>
						</div>
					</div>
				</header>
				<br />

				{/* <!-- ***** Side Menu Area Start ***** --> */}
				<div
					className={`leftMenu d-flex align-items-center justify-content-start shadow-lg bg-secondary`}>
					<div
						className="sonarNav wow fadeInUp w-100 mt-4"
						data-wow-delay="1s">
						<nav>
							<ul className="m-0 p-0">
								{location.pathname.match("/super/") && (
									<SuperNavLinks {...props} />
								)}
								{location.pathname.match("/admin/") && (
									<AdminNavLinks {...props} />
								)}
								{location.pathname.match("/tenant/") && (
									<TenantNavLinks {...props} />
								)}
							</ul>
						</nav>
					</div>

					<br />
				</div>
				{/* <!-- ***** Side Menu Area End ***** --> */}
				<div className="left-main">
					<h2>{props.page.name}</h2>

					<div className="d-flex justify-content-start">
						{props.page.path.map((path, key) => (
							<div key={key}>
								{key < props.page.path.length - 1 ? (
									<MyLink
										linkTo={`/${path}`}
										className="mysonar-sm my-2"
										text={path}
									/>
								) : (
									<Btn
										className="mysonar-sm my-2"
										text={path}
									/>
								)}

								{key < props.page.path.length - 1 && (
									<span className={`text-secondary text-white`}>
										<ChevronRightSVG />
									</span>
								)}
							</div>
						))}
					</div>
					{props.children}
				</div>
			</div>

			{/* Sliding Bottom Nav */}
			<div className={bottomMenu}>
				<div className="bottomMenu">
					<div className="d-flex align-items-center justify-content-between">
						<div></div>
						{/* <!-- Close Icon --> */}
						<div
							className="closeIcon mt-2 me-2"
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
							<div className="d-flex align-items-center">
								<div className="ms-3 me-3">
									<Img
										src={props.auth?.avatar}
										// className="rounded-circle"
										className={`avatar ${
											props.auth?.activeSubscription && "premium-user"
										}`}
										width="25px"
										height="25px"
										alt="Avatar"
									/>
								</div>
								<div>
									<h5 className="text-white">{props.auth?.name}</h5>
								</div>
							</div>
						</Link>
						{/* Landing Page Start */}
						<Link
							to="/"
							className="p-2 text-start text-white"
							onClick={() => setBottomMenu("")}>
							<h6>
								<span className="ms-3 me-4">
									<HomeSVG />
								</span>
								Landing Page
							</h6>
						</Link>
						{/* Landing Page End */}
						{/* Admin Login Start */}
						{location.pathname.match("/tenant/") ||
						location.pathname.match("/super/") ? (
							<Link
								to="/admin/dashboard"
								className="p-2 text-start text-white"
								onClick={() => setBottomMenu("")}>
								<h6>
									<span className="ms-3 me-4">
										<PersonSVG />
									</span>
									Admin Portal
								</h6>
							</Link>
						) : null}
						{/* Admin Login End */}
						{/* Tenant Login Start */}
						{location.pathname.match("/admin/") ||
						location.pathname.match("/super/") ? (
							<Link
								to="/tenant/dashboard"
								className="p-2 text-start text-white"
								onClick={() => setBottomMenu("")}>
								<h6>
									<span className="ms-3 me-4">
										<TenantSVG />
									</span>
									Tenant Portal
								</h6>
							</Link>
						) : null}
						{/* Tenant Login End */}
						<Link
							to="/download"
							className="p-2 text-start text-white"
							style={{
								display: props.downloadLink ? "inline" : "none",
								textAlign: "left",
							}}
							onClick={() => setBottomMenu("")}>
							<h6>
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

export default withRouter(AdminMenu)
