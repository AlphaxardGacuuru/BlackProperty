import React from "react"

import MyLink from "@/components/Core/MyLink"

import CourseSVG from "@/svgs/CourseSVG"
import HeroIcon from "../Core/HeroIcon"

const CourseList = (props) => {
	return (
		<div className={props.activeTab}>
			{/* Data */}
			<div className="card shadow-sm p-2">
				<div className="d-flex justify-content-between">
					{/* Total */}
					<div className="d-flex justify-content-between w-100 align-items-center mx-4">
						<div>
							<span className="fs-4">{props.courses.length}</span>
							<h4>Total Courses</h4>
						</div>
						<HeroIcon>
							<CourseSVG />
						</HeroIcon>
					</div>
					{/* Total End */}
				</div>
			</div>
			{/* Data End */}

			<br />

			{/* Table */}
			<div className="table-responsive">
				<table className="table table-hover">
					<thead>
						<tr>
							<th>#</th>
							<th>Name</th>
							<th>Description</th>
							<th>Faculty</th>
							<th>Department</th>
							<th>Duration (Months)</th>
							<th>Price (KES)</th>
							<th>Action</th>
						</tr>
					</thead>
					<tbody>
						{props.courses.map((course, key) => (
							<tr key={key}>
								<td>{key + 1}</td>
								<td>{course.name}</td>
								<td>{course.description}</td>
								<td>{course.facultyName}</td>
								<td>{course.departmentName}</td>
								<td>{course.duration}</td>
								<td className="text-success">{course.price}</td>
								<td className="text-end">
									<div className="d-flex">
										<MyLink
											linkTo={`/courses/${course.id}/show`}
											text="view"
											className="btn-sm me-2"
										/>
									</div>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
			{/* Table End */}
		</div>
	)
}

export default CourseList
