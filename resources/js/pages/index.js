import React from "react"
import { Link } from "react-router-dom/cjs/react-router-dom"

import Img from "@/components/Core/Img"

const index = (props) => {
	return (
		<div>
			{/* <!-- Hero section --> */}
			<section
				className="hero-section set-bg"
				style={{ background: `url("storage/img/bg.jpg")` }}>
				<div className="container">
					<div className="hero-text text-white">
						<h2>
							Ignite Your Future: Pursue Your KASNEB Vocational Certificate 100%
							Online
						</h2>
						<p>
							Are you ready to unlock your entrepreneurial spirit, safeguard
							digital landscapes, unleash your creative potential, or delve into
							the revolutionary world of blockchain? With KASNEB's 100% online
							Vocational Certificate courses, you can achieve these goals and
							more, all from the comfort of your own home.
						</p>
					</div>
				</div>
			</section>
			{/* <!-- Hero section end --> */}

			{/* <!-- categories section --> */}
			<section className="categories-section spad">
				<div className="container">
					<div className="section-title">
						<h2>Why Choose KASNEB's Online Vocational Certificate Programs?</h2>
						<p className="fs-5">
							1. Flexibility and Convenience: Our online platform allows you to
							study anytime, anywhere, fitting seamlessly into your busy
							schedule. Whether you're a full-time student, a working
							professional, or a busy parent, our flexible courses empower you
							to pursue your passions without disrupting your life.
						</p>
						<div className="text-center my-2">
							<Link
								to="/student/login"
								className="site-btn">
								Sing up here now
							</Link>
						</div>
						<p className="fs-5">
							2. Cutting-Edge Curriculum: KASNEB's Vocational Certificate
							programs are designed in collaboration with industry experts to
							ensure they are up-to-date with the latest trends, technologies,
							and best practices. Gain practical skills and knowledge that are
							directly applicable to real-world scenarios, setting you apart in
							today's competitive job market.
						</p>
						<div className="text-center my-2">
							<Link
								to="/student/login"
								className="site-btn">
								Sing up here now
							</Link>
						</div>
						<p className="fs-5">
							3. Interactive Learning Experience: Engage with dynamic course
							materials, interactive modules, and multimedia resources that
							cater to diverse learning styles. Our online platform fosters
							collaboration and peer-to-peer interaction, providing a rich
							learning environment that enhances comprehension and retention.
						</p>
						<div className="text-center my-2">
							<Link
								to="/student/login"
								className="site-btn">
								Sing up here now
							</Link>
						</div>
						<p className="fs-5">
							4. Expert Guidance and Support: Benefit from the guidance of
							experienced instructors who are dedicated to your success. Receive
							personalized feedback, participate in live Q&A sessions, and
							access comprehensive study materials in a unique delivery system
							designed to maximize your learning potential and pass your KASNEB
							exams first time.
						</p>
						<div className="text-center my-2">
							<Link
								to="/student/login"
								className="site-btn">
								Sing up here now
							</Link>
						</div>
					</div>
					<div className="row">
						{/* <!-- categorie --> */}
						<div className="col-lg-4 col-md-6">
							<div className="categorie-item">
								<div
									className="ci-thumb set-bg"
									style={{
										background: `url("/storage/img/categories/1.jpg")`,
									}}></div>
								<div className="ci-text">
									<h5>
										1. Vocational Certificate in Entrepreneurship and Innovation
										(VCEI)
									</h5>
									<p>
										Embark on a journey of discovery and creativity as you learn
										to turn innovative ideas into successful ventures. Develop
										essential entrepreneurial skills and strategies to thrive in
										today's dynamic business landscape.
									</p>
									{/* <span>120 Courses</span> */}
									<div className="text-center">
										<Link
											to="/student/login"
											className="site-btn">
											Sing up here now
										</Link>
									</div>
								</div>
							</div>
						</div>
						{/* <!-- categorie --> */}
						<div className="col-lg-4 col-md-6">
							<div className="categorie-item">
								<div
									className="ci-thumb set-bg"
									style={{
										background: `url("/storage/img/categories/2.jpg")`,
									}}></div>
								<div className="ci-text">
									<h5>
										2. Vocational Certificate in Information and Cyber Security
										(VCICS)
									</h5>
									<p>
										Safeguard digital assets and protect against cyber threats
										with our comprehensive cybersecurity program. Gain expertise
										in risk assessment, threat detection, incident response, and
										more, preparing you for a rewarding career in this critical
										field.
									</p>
									{/* <span>70 Courses</span> */}
									<div className="text-center">
										<Link
											to="/student/login"
											className="site-btn">
											Sing up here now
										</Link>
									</div>
								</div>
							</div>
						</div>
						{/* <!-- categorie --> */}
						<div className="col-lg-4 col-md-6">
							<div className="categorie-item">
								<div
									className="ci-thumb set-bg"
									style={{
										background: `url("/storage/img/categories/3.jpg")`,
									}}></div>
								<div className="ci-text">
									<h5>3. Vocational Certificate in Graphic Design (VCGD)</h5>
									<p>
										Unleash your creativity and express your vision through the
										art of graphic design. Master industry-standard tools and
										techniques while honing your artistic abilities to create
										compelling visual experiences across various media
										platforms.
									</p>
									{/* <span>55 Courses</span> */}
									<div className="text-center">
										<Link
											to="/student/login"
											className="site-btn">
											Sing up here now
										</Link>
									</div>
								</div>
							</div>
						</div>
						{/* <!-- categorie --> */}
						<div className="col-lg-4 col-md-6">
							<div className="categorie-item">
								<div
									className="ci-thumb set-bg"
									style={{
										background: `url("/storage/img/categories/4.jpg")`,
									}}></div>
								<div className="ci-text">
									<h5>
										4. Vocational Certificate in Blockchain Technology (VCBCT)
									</h5>
									<p>
										Explore the transformative potential of blockchain
										technology and its applications across industries. Dive into
										decentralized systems, smart contracts, cryptocurrency, and
										more, positioning yourself at the forefront of this rapidly
										evolving field.
									</p>
									{/* <span>40 Courses</span> */}
									<div className="text-center">
										<Link
											to="/student/login"
											className="site-btn">
											Sing up here now
										</Link>
									</div>
								</div>
							</div>
						</div>
						{/* <!-- categorie --> */}
						{/* <div className="col-lg-4 col-md-6">
							<div className="categorie-item">
								<div
									className="ci-thumb set-bg"
									style={{
										background: `url("/storage/img/categories/5.jpg")`,
									}}></div>
								<div className="ci-text">
									<h5>Photoshop</h5>
									<p>Lorem ipsum dolor sit amet, consectetur</p>
									<span>220 Courses</span>
								</div>
							</div>
						</div> */}
						{/* <!-- categorie --> */}
						{/* <div className="col-lg-4 col-md-6">
							<div className="categorie-item">
								<div
									className="ci-thumb set-bg"
									style={{
										background: `url("/storage/img/categories/6.jpg")`,
									}}></div>
								<div className="ci-text">
									<h5>Cryptocurrencies</h5>
									<p>Lorem ipsum dolor sit amet, consectetur</p>
									<span>25 Courses</span>
								</div>
							</div>
						</div> */}
					</div>
				</div>
			</section>
			{/* <!-- categories section end --> */}

			{/* <!-- banner section --> */}
			<section className="banner-section spad">
				<div className="container">
					<div className="section-title mb-0 pb-2">
						<h2>Invest in Your Future Today</h2>
						<p>
							Don't let geographical barriers or time constraints hold you back
							from achieving your dreams. Seize the opportunity to elevate your
							skills, expand your horizons, and propel your career forward with
							KASNEB's online Vocational Certificate programs. Enroll now and
							embark on a journey of personal and professional growth like never
							before.
						</p>
						<p>
							For more information and to register, visit our website or contact
							us directly. Your future starts here with us.
						</p>
					</div>
					<div className="text-center pt-5">
						<Link
							to="/student/login"
							className="site-btn">
							Sing up here now
						</Link>
					</div>
				</div>
			</section>
			{/* <!-- banner section end --> */}
		</div>
	)
}

export default index
