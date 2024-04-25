import React, { useEffect, useState } from "react"

import MyLink from "@/components/Core/MyLink"
import Btn from "@/components/Core/Btn"
import Img from "@/components/Core/Img"

import StudentSVG from "@/svgs/StudentSVG"
import PeopleSVG from "@/svgs/PeopleSVG"

import Bar from "@/components/Charts/Bar"
import StaffSVG from "@/svgs/StaffSVG"
import ArrowUpSVG from "@/svgs/ArrowUpSVG"
import ArrowDownSVG from "@/svgs/ArrowDownSVG"
import Line from "@/components/Charts/Line"
import FacultySVG from "@/svgs/FacultySVG"
import DepartmentSVG from "@/svgs/DepartmentSVG"
import CourseSVG from "@/svgs/CourseSVG"
import Doughnut from "@/components/Charts/Doughnut"
import MoneySVG from "@/svgs/MoneySVG"

const index = (props) => {
	const [dashboard, setDashboard] = useState({})
	const [instructors, setInstructors] = useState([])
	const [students, setStudents] = useState([])
	const [staff, setStaff] = useState([])

	useEffect(() => {
		// Set page
		props.setPage({ name: "Dashboard", path: ["/"] })

		Axios.get("/api/admin").then((res) => setDashboard(res.data))
		props.get("instructors", setInstructors)
		props.get("students", setStudents)
		props.get("staff", setStaff)
	}, [])

	var barGraphDatasets1 = [
		{
			label: "Instructors this month",
			data: dashboard.instructors?.lastMonth?.data,
			backgroundColor: "rgba(220, 53, 69, 1)",
			borderColor: "rgba(220, 53, 69, 1)",
			borderWidth: 1,
			borderRadius: "50",
			barThickness: "20",
		},
		{
			label: "Students this month",
			data: dashboard.students?.lastMonth?.data,
			backgroundColor: "rgba(40, 167, 69, 1)",
			borderColor: "rgba(40, 167, 69, 1)",
			borderWidth: 1,
			borderRadius: "50",
			barThickness: "20",
		},
		{
			label: "Staff this month",
			data: dashboard.staff?.lastMonth?.data,
			backgroundColor: "rgba(54, 162, 235, 1)",
			borderColor: "rgba(54, 162, 235, 1)",
			borderWidth: 1,
			borderRadius: "50",
			barThickness: "20",
		},
	]

	var instructorLineGraphDatasets = [
		{
			label: "Last Week",
			data: dashboard.instructors?.lastWeek,
			backgroundColor: "rgba(220, 53, 69, 1)",
			borderColor: "rgba(220, 53, 69, 1)",
			// borderWidth: 1,
		},
	]

	var studentLineGraphDatasets = [
		{
			label: "Last Week",
			data: dashboard.students?.lastWeek,
			backgroundColor: "rgba(40, 167, 69, 1)",
			borderColor: "rgb(40, 167, 69)",
			// borderWidth: 1,
		},
	]

	var staffLineGraphDatasets = [
		{
			label: "Last Week",
			data: dashboard.staff?.lastWeek,
			backgroundColor: "rgba(54, 162, 235, 1)",
			borderColor: "rgba(54, 162, 235, 1)",
			// borderWidth: 1,
		},
	]

	var facultyLineGraphDatasets = [
		{
			label: "Last Week",
			data: dashboard.staff?.lastWeek,
			backgroundColor: "rgba(255, 205, 86, 1)",
			borderColor: "rgba(255, 205, 86, 1)",
			// borderWidth: 1,
		},
	]

	var departmentLineGraphDatasets = [
		{
			label: "Last Week",
			data: dashboard.staff?.lastWeek,
			backgroundColor: "rgba(75, 192, 192, 1)",
			borderColor: "rgba(75, 192, 192, 1)",
			// borderWidth: 1,
		},
	]

	var staffLineGraphDatasets = [
		{
			label: "Last Week",
			data: dashboard.staff?.lastWeek,
			backgroundColor: "rgba(153, 102, 255, 1)",
			borderColor: "rgba(153, 102, 255, 1)",
			// borderWidth: 1,
		},
	]

	var feeLineGraphDatasets = [
		{
			label: "Card Last Week",
			data: dashboard.fees?.cardsLastWeek,
			backgroundColor: "rgba(54, 162, 235, 1)",
			borderColor: "rgba(54, 162, 235, 1)",
			// borderWidth: 1,
		},
		{
			label: "Mpesa Last Week",
			data: dashboard.fees?.mpesaLastWeek,
			backgroundColor: "rgba(40, 167, 69, 1)",
			borderColor: "rgba(40, 167, 69, 1)",
			// borderWidth: 1,
		},
	]

	var doughnutGraphDatasets1 = [
		{
			label: "Last Week",
			data: [
				dashboard.instructors?.total,
				dashboard.students?.total,
				dashboard.staff?.total,
			],
			backgroundColor: [
				"rgba(220, 53, 69, 1)",
				"rgba(40, 167, 69, 1)",
				"rgba(54, 162, 235, 1)",
			],
			borderColor: [
				"rgba(220, 53, 69, 1)",
				"rgba(40, 167, 69, 1)",
				"rgba(54, 162, 235, 1)",
			],
			// borderWidth: 1,
		},
	]

	return (
		<>
			<div className="row">
				<div className="col-sm-12">
					<div className="d-flex flex-wrap justify-content-start">
						{/* Instructors */}
						<div className="border-top-0 border-end-0 border-bottom-0 border-5 border-primary rounded m-1 me-4 p-2 card" style={{ width: "19.5em", height: "auto" }}>
							<div className="d-flex justify-content-between align-items-center">
								<div className="px-4">
									<h4>Instructors</h4>
									<h6>{dashboard.instructors?.total}</h6>
								</div>
								<div className="px-4 fs-2 bg-primary-subtle text-primary rounded">
									<PeopleSVG />
								</div>
							</div>
							<div className="d-flex justify-content-end align-items-center">
								<div className="">
									<h6>
										{dashboard.instructors?.growth > 0 && (
											<span className="text-success">
												<ArrowUpSVG />
												{dashboard.instructors?.growth}
											</span>
										)}
										{dashboard.instructors?.growth == 0 && (
											<span className="text-secondary">
												{dashboard.instructors?.growth}
											</span>
										)}
										{dashboard.instructors?.growth < 0 && (
											<span className="text-danger">
												<ArrowDownSVG />
												{dashboard.instructors?.growth}
											</span>
										)}
									</h6>
								</div>
							</div>
							<div className="d-flex justify-content-end align-items-center">
								{dashboard.instructors && (
									<Line
										labels={[1, 2, 3, 4, 5, 6, 7]}
										datasets={instructorLineGraphDatasets}
									/>
								)}
							</div>
						</div>
						{/* Customers End */}
						{/* Students */}
						<div className="border-top-0 border-end-0 border-bottom-0 border-5 border-primary rounded m-1 me-4 p-2 card" style={{ width: "19.5em", height: "auto" }}>
							<div className="d-flex justify-content-between align-items-center">
								<div className="px-4">
									<h4>Students</h4>
									<h6>{dashboard.students?.total}</h6>
								</div>
								<div className="px-4 fs-2 bg-primary-subtle text-primary rounded">
									<StudentSVG />
								</div>
							</div>
							<div className="d-flex justify-content-end align-items-center">
								<div className="">
									<h6>
										{dashboard.students?.growth > 0 && (
											<span className="text-success">
												<ArrowUpSVG />
												{dashboard.students?.growth}
											</span>
										)}
										{dashboard.students?.growth == 0 && (
											<span className="text-secondary">
												{dashboard.students?.growth}
											</span>
										)}
										{dashboard.students?.growth < 0 && (
											<span className="text-danger">
												<ArrowDownSVG />
												{dashboard.students?.growth}
											</span>
										)}
									</h6>
								</div>
							</div>
							<div className="d-flex justify-content-end align-items-center">
								{dashboard.students && (
									<Line
										labels={[1, 2, 3, 4, 5, 6, 7]}
										datasets={studentLineGraphDatasets}
									/>
								)}
							</div>
						</div>
						{/* Students End */}
						{/* Staff */}
						<div className="border-top-0 border-end-0 border-bottom-0 border-5 border-primary rounded m-1 me-4 p-2 card" style={{ width: "19.5em", height: "auto" }}>
							<div className="d-flex justify-content-between align-items-center">
								<div className="px-4">
									<h4>Staff</h4>
									<h6>{dashboard.staff?.total}</h6>
								</div>
								<div className="px-4 fs-2 bg-primary-subtle text-primary rounded">
									<StaffSVG />
								</div>
							</div>
							<div className="d-flex justify-content-end align-items-center">
								<div className="">
									<h6>
										{dashboard.staff?.growth > 0 && (
											<span className="text-success">
												<ArrowUpSVG />
												{dashboard.staff?.growth}
											</span>
										)}
										{dashboard.staff?.growth == 0 && (
											<span className="text-secondary">
												{dashboard.staff?.growth}
											</span>
										)}
										{dashboard.staff?.growth < 0 && (
											<span className="text-danger">
												<ArrowDownSVG />
												{dashboard.instructors?.growth}
											</span>
										)}
									</h6>
								</div>
							</div>
							<div className="d-flex justify-content-end align-items-center">
								{dashboard.staff && (
									<Line
										labels={[1, 2, 3, 4, 5, 6, 7]}
										datasets={staffLineGraphDatasets}
									/>
								)}
							</div>
						</div>
						{/* Staff End */}
						{/* Faculties */}
						<div className="border-top-0 border-end-0 border-bottom-0 border-5 border-primary rounded m-1 me-4 p-2 card" style={{ width: "19.5em", height: "auto" }}>
							<div className="d-flex justify-content-between align-items-center">
								<div className="px-4">
									<h4>Faculties</h4>
									<h6>{dashboard.faculties?.total}</h6>
								</div>
								<div className="px-4 fs-2 bg-primary-subtle text-primary rounded">
									<FacultySVG />
								</div>
							</div>
							<div className="d-flex justify-content-end align-items-center">
								<div className="">
									<h6>
										{dashboard.faculties?.growth > 0 && (
											<span className="text-success">
												<ArrowUpSVG />
												{dashboard.faculties?.growth}
											</span>
										)}
										{dashboard.faculties?.growth == 0 && (
											<span className="text-secondary">
												{dashboard.faculties?.growth}
											</span>
										)}
										{dashboard.faculties?.growth < 0 && (
											<span className="text-danger">
												<ArrowDownSVG />
												{dashboard.faculties?.growth}
											</span>
										)}
									</h6>
								</div>
							</div>
							<div className="d-flex justify-content-end align-items-center">
								{dashboard.faculties && (
									<Line
										labels={[1, 2, 3, 4, 5, 6, 7]}
										datasets={facultyLineGraphDatasets}
									/>
								)}
							</div>
						</div>
						{/* Faculties End */}
						{/* Departments */}
						<div className="border-top-0 border-end-0 border-bottom-0 border-5 border-primary rounded m-1 me-4 p-2 card" style={{ width: "19.5em", height: "auto" }}>
							<div className="d-flex justify-content-between align-items-center">
								<div className="px-4">
									<h4>Departments</h4>
									<h6>{dashboard.departments?.total}</h6>
								</div>
								<div className="px-4 fs-2 bg-primary-subtle text-primary rounded">
									<DepartmentSVG />
								</div>
							</div>
							<div className="d-flex justify-content-end align-items-center">
								<div className="">
									<h6>
										{dashboard.departments?.growth > 0 && (
											<span className="text-success">
												<ArrowUpSVG />
												{dashboard.departments?.growth}
											</span>
										)}
										{dashboard.departments?.growth == 0 && (
											<span className="text-secondary">
												{dashboard.departments?.growth}
											</span>
										)}
										{dashboard.departments?.growth < 0 && (
											<span className="text-danger">
												<ArrowDownSVG />
												{dashboard.departments?.growth}
											</span>
										)}
									</h6>
								</div>
							</div>
							<div className="d-flex justify-content-end align-items-center">
								{dashboard.departments && (
									<Line
										labels={[1, 2, 3, 4, 5, 6, 7]}
										datasets={departmentLineGraphDatasets}
									/>
								)}
							</div>
						</div>
						{/* Departments End */}
						{/* Courses */}
						<div className="border-top-0 border-end-0 border-bottom-0 border-5 border-primary rounded m-1 me-4 p-2 card" style={{ width: "19.5em", height: "auto" }}>
							<div className="d-flex justify-content-between align-items-center">
								<div className="px-4">
									<h4>Courses</h4>
									<h6>{dashboard.staff?.total}</h6>
								</div>
								<div className="px-4 fs-2 bg-primary-subtle text-primary rounded">
									<CourseSVG />
								</div>
							</div>
							<div className="d-flex justify-content-end align-items-center">
								<div className="">
									<h6>
										{dashboard.courses?.growth > 0 && (
											<span className="text-success">
												<ArrowUpSVG />
												{dashboard.courses?.growth}
											</span>
										)}
										{dashboard.courses?.growth == 0 && (
											<span className="text-secondary">
												{dashboard.courses?.growth}
											</span>
										)}
										{dashboard.courses?.growth < 0 && (
											<span className="text-danger">
												<ArrowDownSVG />
												{dashboard.courses?.growth}
											</span>
										)}
									</h6>
								</div>
							</div>
							<div className="d-flex justify-content-end align-items-center">
								{dashboard.courses && (
									<Line
										labels={[1, 2, 3, 4, 5, 6, 7]}
										datasets={staffLineGraphDatasets}
									/>
								)}
							</div>
						</div>
						{/* Courses End */}
						{/* Fees */}
						<div className="border-top-0 border-end-0 border-bottom-0 border-5 border-primary rounded m-1 me-4 p-2 card" style={{ width: "19.5em", height: "auto" }}>
							<div className="d-flex justify-content-between align-items-center">
								<div className="px-4">
									<h4>Fees</h4>
									<h6>KES {dashboard.fees?.total}</h6>
								</div>
								<div className="px-4 pb-2 fs-2 bg-primary-subtle text-primary rounded">
									<MoneySVG />
								</div>
							</div>
							<div className="d-flex justify-content-end align-items-center">
								<div className="">
									<h6>
										{dashboard.fees?.growth > 0 && (
											<span className="text-success">
												<ArrowUpSVG />
												{dashboard.fees?.growth}
											</span>
										)}
										{dashboard.fees?.growth == 0 && (
											<span className="text-secondary">
												{dashboard.fees?.growth}
											</span>
										)}
										{dashboard.fees?.growth < 0 && (
											<span className="text-danger">
												<ArrowDownSVG />
												{dashboard.fees?.growth}
											</span>
										)}
									</h6>
								</div>
							</div>
							<div className="d-flex justify-content-end align-items-center">
								{dashboard.fees && (
									<Line
										labels={[1, 2, 3, 4, 5, 6, 7]}
										datasets={feeLineGraphDatasets}
									/>
								)}
							</div>
						</div>
						{/* Fees End */}
					</div>
				</div>
			</div>

			<div className="row">
				<h4 className="my-3">Users This Month</h4>
				<div className="col-sm-8">
					{/* Users Bar Graph*/}
					<div className="card rounded hidden-scroll">
						{dashboard.instructors && (
							<Bar
								labels={dashboard.instructors?.lastMonth.labels}
								datasets={barGraphDatasets1}
							/>
						)}
					</div>
					{/* Users Bar Graph End */}
				</div>
				<div className="col-sm-4">
					<div className="card p-4">
						<center>
							<h5>
								{dashboard.instructors?.total +
									dashboard.students?.total +
									dashboard.staff?.total}
							</h5>
							<h5>Total Users</h5>
							{dashboard.instructors && (
								<Doughnut
									labels={["Instructors", "Students", "Staff"]}
									datasets={doughnutGraphDatasets1}
								/>
							)}
						</center>
					</div>
				</div>

				<div className="row">
					<div className="col-sm-8">
						<h4 className="my-3">Recent Students</h4>

						{/* Recent Students Table */}
						<div className="table-responsive">
							<table className="table table-hover">
								<thead>
									<tr>
										<th></th>
										<th>Name</th>
										<th>Gender</th>
										<th>Date Joined</th>
									</tr>
								</thead>
								<tbody>
									{students.map((student, key) => (
										<tr key={key}>
											<td>
												<Img
													src={student.avatar}
													className="rounded-circle"
													width="25px"
													height="25px"
													alt="Avatar"
												/>
											</td>
											<td>{student.name}</td>
											<td className="text-capitalize">{student.gender}</td>
											<td>{student.createdAt}</td>
										</tr>
									))}
									<tr>
										<td colSpan="5">
											<MyLink
												linkTo="/students"
												text="view more"
											/>
										</td>
									</tr>
								</tbody>
							</table>
						</div>
						{/* Recent Students Table End */}
					</div>

					<div className="col-sm-4">
						<h4 className="my-3">Recent Intructors</h4>

						{/* Recent Instructors Table */}
						<div className="table-responsive">
							<table className="table table-hover">
								<thead>
									<tr>
										<th></th>
										<th>Name</th>
										<th>Date Joined</th>
									</tr>
								</thead>
								<tbody>
									{instructors.map((instructor, key) => (
										<tr key={key}>
											<td>
												<Img
													src={instructor.avatar}
													className="rounded-circle"
													width="25px"
													height="25px"
													alt="Avatar"
												/>
											</td>
											<td>{instructor.name}</td>
											<td>{instructor.createdAt}</td>
										</tr>
									))}
									<tr>
										<td colSpan="4">
											<MyLink
												linkTo="/instructors"
												text="view more"
											/>
										</td>
									</tr>
								</tbody>
							</table>
						</div>
						{/* Recent Instructors Table End */}
					</div>
				</div>
			</div>
		</>
	)
}

export default index
