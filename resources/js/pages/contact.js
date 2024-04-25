import React from "react"
import { Link } from "react-router-dom/cjs/react-router-dom.min"

const contact = (props) => {
	return (
		<div>
			{/* Page Preloder */}
			{/* <div id="preloder">
				<div className="loader"></div>
			</div> */}

			{/* Page info */}
			<div
				className="page-info-section set-bg"
				style={{ background: `url("/storage/img/page-bg/4.jpg")` }}>
				<div className="container">
					<div className="site-breadcrumb">
						<a href="#">Home</a>
						<span>Contact</span>
					</div>
				</div>
			</div>
			{/* Page info end */}

			{/* search section */}
			<section className="search-section ss-other-page">
				<div className="container">
					<div className="search-warp">
						<div className="section-title text-white">
							<h2>
								<span>Search your course</span>
							</h2>
						</div>
						<div className="row">
							<div className="col-lg-10 offset-lg-1">
								{/* search form */}
								<form className="course-search-form">
									<input
										type="text"
										placeholder="Course"
									/>
									<input
										type="text"
										className="last-m"
										placeholder="Category"
									/>
									<button className="site-btn btn-dark">Search Couse</button>
								</form>
							</div>
						</div>
					</div>
				</div>
			</section>
			{/* search section end */}

			{/* Page */}
			<section className="contact-page spad pb-0">
				<div className="container">
					<div className="row">
						<div className="col-lg-8">
							<div className="contact-form-warp">
								<div className="section-title text-white text-left">
									<h2>Get in Touch</h2>
									<p>
										Lorem ipsum dolor sit amet, consectetur adipiscing elit.
										Donec malesuada lorem maximus mauris scelerisque, at rutrum
										nulla dictum. Ut ac ligula sapien.{" "}
									</p>
								</div>
								<form className="contact-form">
									<input
										type="text"
										placeholder="Your Name"
									/>
									<input
										type="text"
										placeholder="Your E-mail"
									/>
									<input
										type="text"
										placeholder="Subject"
									/>
									<textarea placeholder="Message"></textarea>
									<button className="site-btn">Sent Message</button>
								</form>
							</div>
						</div>
						<div className="col-lg-4">
							<div className="contact-info-area">
								<div className="section-title text-left p-0">
									<h2>Contact Info</h2>
									<p>
										Donec malesuada lorem maximus mauris scelerisque, at rutrum
										nulla dictum. Ut ac ligula sapien. Suspendi sse cursus
										faucibus finibus.
									</p>
								</div>
								<div className="phone-number">
									<span>Direct Line</span>
									<h2>+53 345 7953 32453</h2>
								</div>
								<ul className="contact-list">
									<li>
										1481 Creekside Lane <br />
										Avila Beach, CA 931
									</li>
									<li>+53 345 7953 32453</li>
									<li>yourmail@gmail.com</li>
								</ul>
								<div className="social-links">
									<a href="#">
										<i className="fa fa-pinterest"></i>
									</a>
									<a href="#">
										<i className="fa fa-facebook"></i>
									</a>
									<a href="#">
										<i className="fa fa-twitter"></i>
									</a>
									<a href="#">
										<i className="fa fa-dribbble"></i>
									</a>
									<a href="#">
										<i className="fa fa-behance"></i>
									</a>
									<a href="#">
										<i className="fa fa-linkedin"></i>
									</a>
								</div>
							</div>
						</div>
					</div>
					<div id="map-canvas"></div>
				</div>
			</section>
			{/* Page end */}

			{/* banner section */}
			<section className="banner-section spad">
				<div className="container">
					<div className="section-title mb-0 pb-2">
						<h2>Join Our Community Now!</h2>
						<p>
							Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
							malesuada lorem maximus mauris scelerisque, at rutrum nulla
							dictum. Ut ac ligula sapien. Suspendisse cursus faucibus finibus.
						</p>
					</div>
					<div className="text-center pt-5">
						<Link
							to="/login"
							className="site-btn">
							Register Now
						</Link>
					</div>
				</div>
			</section>
			{/* banner section end */}

			{/* load for map */}
			<script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyCWTIlluowDL-X4HbYQt3aDw_oi2JP0Krc&sensor=false"></script>
			<script src="js/map.js"></script>
		</div>
	)
}

export default contact
