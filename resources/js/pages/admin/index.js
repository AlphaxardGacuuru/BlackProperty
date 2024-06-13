import React, { useEffect, useState } from "react"

import MyLink from "@/components/Core/MyLink"
import Btn from "@/components/Core/Btn"
import Img from "@/components/Core/Img"

import StudentSVG from "@/svgs/StudentSVG"
import PeopleSVG from "@/svgs/PeopleSVG"

import Bar from "@/components/Charts/Bar"
import Doughnut from "@/components/Charts/Doughnut"
import ChartBox from "@/components/Core/ChartBox"

import StaffSVG from "@/svgs/StaffSVG"
import ArrowUpSVG from "@/svgs/ArrowUpSVG"
import ArrowDownSVG from "@/svgs/ArrowDownSVG"
import Line from "@/components/Charts/Line"
import PropertySVG from "@/svgs/PropertySVG"
import MoneySVG from "@/svgs/MoneySVG"

const index = (props) => {
	const [dashboard, setDashboard] = useState({})
	const [instructors, setInstructors] = useState([])
	const [students, setStudents] = useState([])
	const [staff, setStaff] = useState([])

	useEffect(() => {
		// Set page
		props.setPage({ name: "Dashboard", path: ["/dashboard"] })

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

	var propertyLineGraphDatasets = [
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
						{/* Chart Box */}
						{instructors.map(() => <ChartBox />)}
						{/* Chart Box End */}
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
