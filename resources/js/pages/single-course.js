import React from "react"

const show = (props) => {
	return (
		<div>
			{/* Page Preloder */}
			{/* <div id="preloder">
				<div className="loader"></div>
			</div> */}

			{/* Page info */}
			<div
				className="page-info-section set-bg"
				data-setbg="/storage/img/page-bg/2.jpg">
				<div className="container">
					<div className="site-breadcrumb">
						<a href="#">Home</a>
						<span>Courses</span>
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

			{/* single course section */}
			<section className="single-course spad pb-0">
				<div className="container">
					<div className="course-meta-area">
						<div className="row">
							<div className="col-lg-10 offset-lg-1">
								<div className="course-note">Featured Course</div>
								<h3>HTNL5 & CSS For Begginers</h3>
								<div className="course-metas">
									<div className="course-meta">
										<div className="course-author">
											<div
												className="ca-pic set-bg"
												data-setbg="/storage/img/authors/2.jpg"></div>
											<h6>Teacher</h6>
											<p>
												William Parker, <span>Developer</span>
											</p>
										</div>
									</div>
									<div className="course-meta">
										<div className="cm-info">
											<h6>Category</h6>
											<p>Development</p>
										</div>
									</div>
									<div className="course-meta">
										<div className="cm-info">
											<h6>Students</h6>
											<p>120 Registered Students</p>
										</div>
									</div>
									<div className="course-meta">
										<div className="cm-info">
											<h6>Reviews</h6>
											<p>
												2 Reviews{" "}
												<span className="rating">
													<i className="fa fa-star"></i>
													<i className="fa fa-star"></i>
													<i className="fa fa-star"></i>
													<i className="fa fa-star"></i>
													<i className="fa fa-star is-fade"></i>
												</span>
											</p>
										</div>
									</div>
								</div>
								<a
									href="#"
									className="site-btn price-btn">
									Price: $15
								</a>
								<a
									href="#"
									className="site-btn buy-btn">
									Buy This Course
								</a>
							</div>
						</div>
					</div>
					<Img
						src="/storage/img/courses/single.jpg"
						alt=""
						className="course-preview"
					/>
					<div className="row">
						<div className="col-lg-10 offset-lg-1 course-list">
							<div className="cl-item">
								<h4>Course Description</h4>
								<p>
									Lorem ipsum dolor sit amet, consectetur. Phasellus
									sollicitudin et nunc eu efficitur. Sed ligula nulla, molestie
									quis ligula in, eleifend rhoncus ipsum. Donec ultrices, sem
									vel efficitur molestie, massa nisl posuere ipsum, ut vulputate
									mauris ligula a metus. Aenean vel congue diam, sed bibendum
									ipsum. Nunc vulputate aliquet tristique. Integer et
									pellentesque urna. Lorem ipsum dolor sit amet, consectetur.
									Phasellus sollicitudin et nunc eu efficitur. Sed ligula nulla,
									molestie quis ligula in, eleifend rhoncus ipsum.{" "}
								</p>
							</div>
							<div className="cl-item">
								<h4>Certification</h4>
								<p>
									Phasellus sollicitudin et nunc eu efficitur. Sed ligula nulla,
									molestie quis ligula in, eleifend rhoncus ipsum. Donec
									ultrices, sem vel efficitur molestie, massa nisl posuere
									ipsum, ut vulputate mauris ligula a metus. Aenean vel congue
									diam, sed bibendum ipsum. Nunc vulputate aliquet tristique.
									Integer et pellentesque urna. Lorem ipsum dolor sit amet,
									consectetur. Phasellus sollicitudin et nunc eu efficitur. Sed
									ligula nulla, molestie quis ligula in, eleifend rhoncus ipsum.
									Donec ultrices, sem vel efficitur molestie, massa nisl posuere
									ipsum.
								</p>
							</div>
							<div className="cl-item">
								<h4>The Instructor</h4>
								<p>
									Sed ligula nulla, molestie quis ligula in, eleifend rhoncus
									ipsum. Donec ultrices, sem vel efficitur molestie, massa nisl
									posuere ipsum, ut vulputate mauris ligula a metus. Aenean vel
									congue diam, sed bibendum ipsum. Nunc vulputate aliquet
									tristique. Integer et pellentesque urna. Lorem ipsum dolor sit
									amet, consectetur. Phasellus sollicitudin et nunc eu
									efficitur. Sed ligula nulla, molestie quis ligula in, eleifend
									rhoncus ipsum. Donec ultrices, sem vel efficitur molestie,
									massa nisl posuere ipsum, ut vulputate mauris ligula a metus.{" "}
								</p>
							</div>
						</div>
					</div>
				</div>
			</section>
			{/* single course section end */}

			{/* Page */}
			<section className="realated-courses spad">
				<div className="course-warp">
					<h2 className="rc-title">Realated Courses</h2>
					<div className="rc-slider owl-carousel">
						{/* course */}
						<div className="course-item">
							<div
								className="course-thumb set-bg"
								data-setbg="/storage/img/courses/1.jpg">
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
										data-setbg="/storage/img/authors/1.jpg"></div>
									<p>
										William Parker, <span>Developer</span>
									</p>
								</div>
							</div>
						</div>
						{/* course */}
						<div className="course-item">
							<div
								className="course-thumb set-bg"
								data-setbg="/storage/img/courses/2.jpg">
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
										data-setbg="/storage/img/authors/2.jpg"></div>
									<p>
										William Parker, <span>Developer</span>
									</p>
								</div>
							</div>
						</div>
						{/* course */}
						<div className="course-item">
							<div
								className="course-thumb set-bg"
								data-setbg="/storage/img/courses/3.jpg">
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
										data-setbg="/storage/img/authors/3.jpg"></div>
									<p>
										William Parker, <span>Developer</span>
									</p>
								</div>
							</div>
						</div>
						{/* course */}
						<div className="course-item">
							<div
								className="course-thumb set-bg"
								data-setbg="/storage/img/courses/4.jpg">
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
										data-setbg="/storage/img/authors/4.jpg"></div>
									<p>
										William Parker, <span>Developer</span>
									</p>
								</div>
							</div>
						</div>
						{/* course */}
						<div className="course-item">
							<div
								className="course-thumb set-bg"
								data-setbg="/storage/img/courses/5.jpg">
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
										data-setbg="/storage/img/authors/5.jpg"></div>
									<p>
										William Parker, <span>Developer</span>
									</p>
								</div>
							</div>
						</div>
						{/* course */}
					</div>
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
						<a
							href="#"
							className="site-btn">
							Register Now
						</a>
					</div>
				</div>
			</section>
			{/* banner section end */}
		</div>
	)
}

export default show
