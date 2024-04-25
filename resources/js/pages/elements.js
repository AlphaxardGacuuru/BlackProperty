import React from "react"

import Img from "@/components/Core/Img"

const elements = (props) => {
	return (
		<div>
			{/* Page Preloder */}
			{/* <div id="preloder">
				<div className="loader"></div>
			</div> */}

			{/* Page info */}
			<div
				className="page-info-section set-bg"
				style={{ background: `url("/storage/img/page-bg/5.jpg")` }}>
				<div className="container">
					<div className="site-breadcrumb">
						<a href="#">Home</a>
						<span>Elements</span>
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
			<section className="elements-page spad pb-0">
				<div className="container">
					<div className="element">
						<h2 className="e-title">Buttons</h2>
						<a
							href="#"
							className="site-btn mr-3 mb-3 mb-md-0">
							Send Message
						</a>
						<a
							href="#"
							className="site-btn btn-dark mr-3 mb-3 mb-md-0">
							Send Message
						</a>
						<a
							href="#"
							className="site-btn btn-fade">
							Send Message
						</a>
					</div>
					{/* Element */}
					<div className="element">
						<h2 className="e-title">Accordions & Tabs</h2>
						<div className="row">
							<div className="col-lg-6 mb-4 mb-lg-0">
								{/* Accordions */}
								<div
									id="accordion"
									className="accordion-area">
									<div className="panel">
										<div
											className="panel-header"
											id="headingOne">
											<button
												className="panel-link"
												data-toggle="collapse"
												data-target="#collapse1"
												aria-expanded="false"
												aria-controls="collapse1">
												Praesent neque metus, accumsan in sagittis eu, mattis
												vitae
											</button>
										</div>
										<div
											id="collapse1"
											className="collapse"
											aria-labelledby="headingOne"
											data-parent="#accordion">
											<div className="panel-body">
												<p>
													Lorem ipsum dolor sit amet, consectetur adipiscing
													elit. Donec malesuada lorem maximus mauris
													scelerisque, at rutrum nulla dictum. Ut ac ligula
													sapien. Suspendisse cursus faucibus finibus.
												</p>
											</div>
										</div>
									</div>
									<div className="panel">
										<div
											className="panel-header"
											id="headingTwo">
											<button
												className="panel-link"
												data-toggle="collapse"
												data-target="#collapse2"
												aria-expanded="false"
												aria-controls="collapse2">
												Neque metus, accumsan in sagittis eu, mattis
											</button>
										</div>
										<div
											id="collapse2"
											className="collapse"
											aria-labelledby="headingTwo"
											data-parent="#accordion">
											<div className="panel-body">
												<p>
													Lorem ipsum dolor sit amet, consectetur adipiscing
													elit. Donec malesuada lorem maximus mauris
													scelerisque, at rutrum nulla dictum. Ut ac ligula
													sapien. Suspendisse cursus faucibus finibus.
												</p>
											</div>
										</div>
									</div>
									<div className="panel">
										<div
											className="panel-header active"
											id="headingThree">
											<button
												className="panel-link active"
												data-toggle="collapse"
												data-target="#collapse3"
												aria-expanded="true"
												aria-controls="collapse3">
												Vivamus sollicitudin nisi sit amet dolor varius, et
												porta
											</button>
										</div>
										<div
											id="collapse3"
											className="collapse show"
											aria-labelledby="headingThree"
											data-parent="#accordion">
											<div className="panel-body">
												<p>
													Lorem ipsum dolor sit amet, consectetur adipiscing
													elit. Donec malesuada lorem maximus mauris
													scelerisque, at rutrum nulla dictum. Ut ac ligula
													sapien. Suspendisse cursus faucibus finibus.
												</p>
											</div>
										</div>
									</div>
								</div>
							</div>
							<div className="col-lg-6">
								{/* Tabs */}
								<div className="tab-element">
									<ul
										className="nav nav-tabs"
										id="myTab"
										role="tablist">
										<li className="nav-item">
											<a
												className="nav-link active"
												id="1-tab"
												data-toggle="tab"
												href="#tab-1"
												role="tab"
												aria-controls="tab-1"
												aria-selected="true">
												Praesent neque metus
											</a>
										</li>
										<li className="nav-item">
											<a
												className="nav-link"
												id="2-tab"
												data-toggle="tab"
												href="#tab-2"
												role="tab"
												aria-controls="tab-2"
												aria-selected="false">
												Neque metus
											</a>
										</li>
										<li className="nav-item">
											<a
												className="nav-link"
												id="3-tab"
												data-toggle="tab"
												href="#tab-3"
												role="tab"
												aria-controls="tab-3"
												aria-selected="false">
												Vivamus sollici
											</a>
										</li>
									</ul>
									<div
										className="tab-content"
										id="myTabContent">
										{/* single tab content */}
										<div
											className="tab-pane fade show active"
											id="tab-1"
											role="tabpanel"
											aria-labelledby="tab-1">
											<p>
												Lorem ipsum dolor sit amet, consectetur adipiscing elit.
												Donec malesuada lorem maximus mauris scelerisque, at
												rutrum nulla dictum. Ut ac ligula sapien. Suspendisse
												cursus faucibus finibus.
											</p>
										</div>
										<div
											className="tab-pane fade"
											id="tab-2"
											role="tabpanel"
											aria-labelledby="tab-2">
											<p>
												Lorem ipsum dolor sit amet, consectetur adipiscing elit.
												Donec malesuada lorem maximus mauris scelerisque, at
												rutrum nulla dictum. Ut ac ligula sapien. Suspendisse
												cursus faucibus finibus.
											</p>
										</div>
										<div
											className="tab-pane fade"
											id="tab-3"
											role="tabpanel"
											aria-labelledby="tab-3">
											<p>
												Lorem ipsum dolor sit amet, consectetur adipiscing elit.
												Donec malesuada lorem maximus mauris scelerisque, at
												rutrum nulla dictum. Ut ac ligula sapien. Suspendisse
												cursus faucibus finibus.
											</p>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
					{/* Element */}
					<div className="element">
						<h2 className="e-title">Loaders</h2>
						<div className="row">
							<div className="col-lg-3 col-sm-6 cp-item">
								<div
									className="circle-progress"
									data-cpid="id-1"
									data-cpvalue="75"
									data-cpcolor="#e82154"
									data-cptitle="New Students"></div>
							</div>
							<div className="col-lg-3 col-sm-6 cp-item">
								<div
									className="circle-progress"
									data-cpid="id-2"
									data-cpvalue="83"
									data-cpcolor="#e82154"
									data-cptitle="New Teachers"></div>
							</div>
							<div className="col-lg-3 col-sm-6 cp-item">
								<div
									className="circle-progress"
									data-cpid="id-3"
									data-cpvalue="25"
									data-cpcolor="#e82154"
									data-cptitle="Creativity"></div>
							</div>
							<div className="col-lg-3 col-sm-6 cp-item">
								<div
									className="circle-progress"
									data-cpid="id-4"
									data-cpvalue="95"
									data-cpcolor="#e82154"
									data-cptitle="Prestige"></div>
							</div>
						</div>
					</div>
					{/* Element */}
					<div className="element">
						<h2 className="e-title">Milestones</h2>
						<div className="row">
							<div className="col-lg-3 col-sm-6 fact-item">
								<h2>1200</h2>
								<p>New Students</p>
							</div>
							<div className="col-lg-3 col-sm-6 fact-item">
								<h2>15k</h2>
								<p>Grad Students</p>
							</div>
							<div className="col-lg-3 col-sm-6 fact-item">
								<h2>234</h2>
								<p>Qualified Teachers</p>
							</div>
							<div className="col-lg-3 col-sm-6 fact-item">
								<h2>3792</h2>
								<p>Amazing Courses</p>
							</div>
						</div>
					</div>
					{/* Element */}
					<div className="element">
						<h2 className="e-title">Icon Boxes</h2>
						<div className="row">
							<div className="col-lg-4 col-md-6 icon-box">
								<h5>
									<span>01.</span>Amazing Teachers
								</h5>
								<p>
									Donec molestie tincidunt tellus sit amet aliquet. Proin auctor
									nisi ut purus ele ifend, et auctor lorem.
								</p>
							</div>
							<div className="col-lg-4 col-md-6 icon-box">
								<h5>
									<span>02.</span>Training Center
								</h5>
								<p>
									Molestie tincidunt tellus sit amet aliquet. Proin auctor nisi
									ut purus ele ifend, et auctor lorem hendrerit.{" "}
								</p>
							</div>
							<div className="col-lg-4 col-md-6 icon-box">
								<h5>
									<span>03.</span>Training Center
								</h5>
								<p>
									Itincidunt tellus sit amet aliquet. Proin auctor nisi ut purus
									ele ifend, et auctor lorem hendrerit.{" "}
								</p>
							</div>
						</div>
					</div>
				</div>
			</section>
			{/* Page end */}
		</div>
	)
}

export default elements
