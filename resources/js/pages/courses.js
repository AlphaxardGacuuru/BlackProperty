import React from "react"
import { Link } from "react-router-dom/cjs/react-router-dom.min"

import Img from "@/components/Core/Img"

const courses = (props) => {
	return (
		<div>
			{/*  Page Preloder */}
			{/* <div id="preloder">
				<div className="loader"></div>
			</div> */}

			{/*  Page info */}
			<div
				className="page-info-section set-bg"
				style={{ background: `url("/storage/img/page-bg/1.jpg")` }}>
				<div className="container">
					<div className="site-breadcrumb">
						<a href="#">Home</a>
						<span>Courses</span>
					</div>
				</div>
			</div>
			{/*  Page info end */}

			{/*  search section */}
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
								{/*  search form */}
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
			{/*  search section end */}

			{/*  course section */}
			<section className="course-section spad pb-0">
				<div className="course-warp">
					<ul className="course-filter controls">
						<li
							className="control active"
							data-filter="all">
							All
						</li>
						<li
							className="control"
							data-filter=".finance">
							Finance
						</li>
						<li
							className="control"
							data-filter=".design">
							Design
						</li>
						<li
							className="control"
							data-filter=".web">
							Web Development
						</li>
						<li
							className="control"
							data-filter=".photo">
							Photography
						</li>
					</ul>
					<div className="row course-items-area">
						{/*  course */}
						<div className="mix col-lg-3 col-md-4 col-sm-6 finance">
							<div className="course-item">
								<div
									className="course-thumb set-bg"
									style={{ background: `url("/storage/img/courses/1.jpg")` }}>
									<div className="price">Price: $15</div>
								</div>
								<div className="course-info">
									<div className="course-text">
										<h5>Art & Crafts</h5>
										<p>Lorem ipsum dolor sit amet, consectetur</p>
										<div className="students">120 Students</div>
									</div>
									<div className="course-author">
										<div
											className="ca-pic set-bg"
											style={{
												background: `url("/storage/img/authors/1.jpg")`,
											}}></div>
										<p>
											William Parker, <span>Developer</span>
										</p>
									</div>
								</div>
							</div>
						</div>
						{/*  course */}
						<div className="mix col-lg-3 col-md-4 col-sm-6 design">
							<div className="course-item">
								<div
									className="course-thumb set-bg"
									style={{ background: `url("/storage/img/courses/2.jpg")` }}>
									<div className="price">Price: $15</div>
								</div>
								<div className="course-info">
									<div className="course-text">
										<h5>IT Development</h5>
										<p>Lorem ipsum dolor sit amet, consectetur</p>
										<div className="students">120 Students</div>
									</div>
									<div className="course-author">
										<div
											className="ca-pic set-bg"
											style={{
												background: `url("/storage/img/authors/2.jpg")`,
											}}></div>
										<p>
											William Parker, <span>Developer</span>
										</p>
									</div>
								</div>
							</div>
						</div>
						{/*  course */}
						<div className="mix col-lg-3 col-md-4 col-sm-6 web">
							<div className="course-item">
								<div
									className="course-thumb set-bg"
									style={{ background: `url("/storage/img/courses/3.jpg")` }}>
									<div className="price">Price: $15</div>
								</div>
								<div className="course-info">
									<div className="course-text">
										<h5>Graphic Design</h5>
										<p>Lorem ipsum dolor sit amet, consectetur</p>
										<div className="students">120 Students</div>
									</div>
									<div className="course-author">
										<div
											className="ca-pic set-bg"
											style={{
												background: `url("/storage/img/authors/3.jpg")`,
											}}></div>
										<p>
											William Parker, <span>Developer</span>
										</p>
									</div>
								</div>
							</div>
						</div>
						{/*  course */}
						<div className="mix col-lg-3 col-md-4 col-sm-6 photo">
							<div className="course-item">
								<div
									className="course-thumb set-bg"
									style={{ background: `url("/storage/img/courses/4.jpg")` }}>
									<div className="price">Price: $15</div>
								</div>
								<div className="course-info">
									<div className="course-text">
										<h5>IT Development</h5>
										<p>Lorem ipsum dolor sit amet, consectetur</p>
										<div className="students">120 Students</div>
									</div>
									<div className="course-author">
										<div
											className="ca-pic set-bg"
											style={{
												background: `url("/storage/img/authors/4.jpg")`,
											}}></div>
										<p>
											William Parker, <span>Developer</span>
										</p>
									</div>
								</div>
							</div>
						</div>
						{/*  course */}
						<div className="mix col-lg-3 col-md-4 col-sm-6 finance">
							<div className="course-item">
								<div
									className="course-thumb set-bg"
									style={{ background: `url("/storage/img/courses/5.jpg")` }}>
									<div className="price">Price: $15</div>
								</div>
								<div className="course-info">
									<div className="course-text">
										<h5>IT Development</h5>
										<p>Lorem ipsum dolor sit amet, consectetur</p>
										<div className="students">120 Students</div>
									</div>
									<div className="course-author">
										<div
											className="ca-pic set-bg"
											style={{
												background: `url("/storage/img/authors/5.jpg")`,
											}}></div>
										<p>
											William Parker, <span>Developer</span>
										</p>
									</div>
								</div>
							</div>
						</div>
						{/*  course */}
						<div className="mix col-lg-3 col-md-4 col-sm-6 design">
							<div className="course-item">
								<div
									className="course-thumb set-bg"
									style={{ background: `url("/storage/img/courses/6.jpg")` }}>
									<div className="price">Price: $15</div>
								</div>
								<div className="course-info">
									<div className="course-text">
										<h5>Socia Media</h5>
										<p>Lorem ipsum dolor sit amet, consectetur</p>
										<div className="students">120 Students</div>
									</div>
									<div className="course-author">
										<div
											className="ca-pic set-bg"
											style={{
												background: `url("/storage/img/authors/6.jpg")`,
											}}></div>
										<p>
											William Parker, <span>Developer</span>
										</p>
									</div>
								</div>
							</div>
						</div>
						{/*  course */}
						<div className="mix col-lg-3 col-md-4 col-sm-6 web">
							<div className="course-item">
								<div
									className="course-thumb set-bg"
									style={{ background: `url("/storage/img/courses/7.jpg")` }}>
									<div className="price">Price: $15</div>
								</div>
								<div className="course-info">
									<div className="course-text">
										<h5>IT Development</h5>
										<p>Lorem ipsum dolor sit amet, consectetur</p>
										<div className="students">120 Students</div>
									</div>
									<div className="course-author">
										<div
											className="ca-pic set-bg"
											style={{
												background: `url("/storage/img/authors/7.jpg")`,
											}}></div>
										<p>
											William Parker, <span>Developer</span>
										</p>
									</div>
								</div>
							</div>
						</div>
						{/*  course */}
						<div className="mix col-lg-3 col-md-4 col-sm-6 photo">
							<div className="course-item">
								<div
									className="course-thumb set-bg"
									style={{ background: `url("/storage/img/courses/8.jpg")` }}>
									<div className="price">Price: $15</div>
								</div>
								<div className="course-info">
									<div className="course-text">
										<h5>HTML 5</h5>
										<p>Lorem ipsum dolor sit amet, consectetur</p>
										<div className="students">120 Students</div>
									</div>
									<div className="course-author">
										<div
											className="ca-pic set-bg"
											style={{
												background: `url("/storage/img/authors/8.jpg")`,
											}}></div>
										<p>
											William Parker, <span>Developer</span>
										</p>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div className="featured-courses">
						<div className="featured-course course-item">
							<div
								className="course-thumb set-bg"
								style={{ background: `url("/storage/img/courses/f-1.jpg")` }}>
								<div className="price">Price: $15</div>
							</div>
							<div className="row">
								<div className="col-lg-6 offset-lg-6 pl-0">
									<div className="course-info">
										<div className="course-text">
											<div className="fet-note">Featured Course</div>
											<h5>HTNL5 & CSS For Begginers</h5>
											<p>
												Lorem ipsum dolor sit amet, consectetur. Phasellus
												sollicitudin et nunc eu efficitur. Sed ligula nulla,
												molestie quis ligula in, eleifend rhoncus ipsum. Donec
												ultrices, sem vel efficitur molestie, massa nisl posuere
												ipsum, ut vulputate mauris ligula a metus. Aenean vel
												congue diam, sed bibendum ipsum. Nunc vulputate aliquet
												tristique. Integer et pellentesque urna
											</p>
											<div className="students">120 Students</div>
										</div>
										<div className="course-author">
											<div
												className="ca-pic set-bg"
												style={{
													background: `url("/storage/img/authors/1.jpg")`,
												}}></div>
											<p>
												William Parker, <span>Developer</span>
											</p>
										</div>
									</div>
								</div>
							</div>
						</div>
						<div className="featured-course course-item">
							<div
								className="course-thumb set-bg"
								style={{ background: `url("/storage/img/courses/f-2.jpg")` }}>
								<div className="price">Price: $15</div>
							</div>
							<div className="row">
								<div className="col-lg-6 pr-0">
									<div className="course-info">
										<div className="course-text">
											<div className="fet-note">Featured Course</div>
											<h5>HTNL5 & CSS For Begginers</h5>
											<p>
												Lorem ipsum dolor sit amet, consectetur. Phasellus
												sollicitudin et nunc eu efficitur. Sed ligula nulla,
												molestie quis ligula in, eleifend rhoncus ipsum. Donec
												ultrices, sem vel efficitur molestie, massa nisl posuere
												ipsum, ut vulputate mauris ligula a metus. Aenean vel
												congue diam, sed bibendum ipsum. Nunc vulputate aliquet
												tristique. Integer et pellentesque urna
											</p>
											<div className="students">120 Students</div>
										</div>
										<div className="course-author">
											<div
												className="ca-pic set-bg"
												style={{
													background: `url("/storage/img/authors/2.jpg")`,
												}}></div>
											<p>
												William Parker, <span>Developer</span>
											</p>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>
			{/*  course section end */}

			{/*  banner section */}
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
			{/*  banner section end */}
		</div>
	)
}

export default courses
