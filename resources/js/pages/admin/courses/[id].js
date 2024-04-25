import React, { useEffect, useState } from "react"
import {
	useParams,
} from "react-router-dom/cjs/react-router-dom.min"

import Btn from "@/components/Core/Btn"
import UnitList from "@/components/Units/UnitList"
import InstructorList from "@/components/Instructors/InstructorList"
import StudentList from "@/components/Students/StudentList"
import BillableList from "@/components/Billables/BillableList"

const show = (props) => {
	var { id } = useParams()

	const [course, setCourse] = useState({})
	const [session, setSession] = useState({})
	const [tab, setTab] = useState("units")
	const [hasBalance, setHasBalance] = useState()
	const [loading, setLoading] = useState()
	
	const getCourse = () => {
		Axios.get(`api/courses/${id}`)
			.then((res) => {
				setCourse(res.data.data)

				// Set Payment Details
				props.setPaymentTitle("Fee Payment")
				props.setPaymentDescription(`Payment of Fees for ${res.data.data.name}`)
				props.setPaymentAmount(res.data.data.price)
			})
			.catch((err) => props.getErrors(err))
	}

	const getCurrentSession = () => {
		Axios.get(`api/sessions/by-course-id/${id}`)
			.then((res) => setSession(res.data.data))
			.catch((err) => props.getErrors(err))
	}

	const getFeeStatement = () => {
		Axios.get(`api/fee-statements/${props.auth.id}`)
			.then((res) => {
				setHasBalance(res.data.data.statement[0].balance)
				props.setPaymentAmount(res.data.data.statement[0].balance)
			})
			.catch((err) => props.getErrors(err))
	}

	useEffect(() => {
		// Set page
		props.setPage({ name: "View Course", path: ["courses", "view"] })

		// Fetch Course
		getCourse()

		// Fetch Current Session
		getCurrentSession()

		// Fetch Fee Statement
		getFeeStatement()

		// Close Pay Menu
		return () => props.setShowPayMenu("")
	}, [])

	/*
	 * Self Enroll
	 */
	const selfEnrollCourse = () => {
		// Show loader
		setLoading(true)

		Axios.put(`/api/students/${props.auth.id}`, {
			courseId: id,
		})
			.then((res) => {
				setLoading(false)
				props.setMessages([res.data.message])
				// Fetch Auth
				props.get("auth", props.setAuth, "auth")
			})
			.catch((err) => {
				setLoading(false)
				props.getErrors(err)
			})
	}

	const active = (activeTab) => {
		return activeTab == tab ? "bg-light" : "bg-secondary-subtle"
	}

	const activeTab = (activeTab) => {
		return activeTab == tab ? "d-block" : "d-none"
	}

	return (
		<div className="row">
			<div className="col-sm-4">
				<div className="card mb-2 p-4 text-center shadow">
					<h4>{course.name}</h4>
					{props.auth.accountType == "student" && session.id && (
						<React.Fragment>
							{!props.auth.courseApprovedBy ? (
								<Btn
									btnText={`Request enrollment @ KES ${course.admission}`}
									btnClass="btn-success mt-2"
									onClick={
										hasBalance
											? () => props.setShowPayMenu("menu-open")
											: selfEnrollCourse
									}
									loading={loading}
								/>
							) : (
								<Btn
									btnText={`self enroll @ KES ${course.price}`}
									btnClass="btn-success mt-2"
									onClick={
										hasBalance
											? () => props.setShowPayMenu("menu-open")
											: selfEnrollCourse
									}
									loading={loading}
								/>
							)}
							{hasBalance && (
								<p className="mb-0 text-warning">Balance KES {hasBalance}</p>
							)}
						</React.Fragment>
					)}
				</div>
			</div>
			<div className="col-sm-8">
				{/* Tabs */}
				<div className="d-flex justify-content-between flex-wrap mb-2">
					<div
						className={`card shadow-sm flex-grow-1 text-center me-1 mb-2 py-2 px-4 ${active(
							"units"
						)}`}
						style={{ cursor: "pointer" }}
						onClick={() => setTab("units")}>
						Units
					</div>
					<div
						className={`card shadow-sm flex-grow-1 text-center me-1 mb-2 py-2 px-4 ${active(
							"instructors"
						)}`}
						style={{ cursor: "pointer" }}
						onClick={() => setTab("instructors")}>
						Instructors
					</div>
					<div
						className={`card shadow-sm flex-grow-1 text-center me-1 mb-2 py-2 px-4 ${active(
							"students"
						)}`}
						style={{ cursor: "pointer" }}
						onClick={() => setTab("students")}>
						Students
					</div>
					<div
						className={`card shadow-sm flex-grow-1 text-center mb-2 py-2 px-4 ${active(
							"fee-statements"
						)}`}
						style={{ cursor: "pointer" }}
						onClick={() => setTab("fee-statements")}>
						Fee Structure
					</div>
				</div>
				{/* Tabs End */}

				{/* Units Tab */}
				<UnitList
					{...props}
					activeTab={activeTab("units")}
					units={course.units}
					session={session}
					courseId={id}
					setCourse={setCourse}
				/>
				{/* Units Tab End */}

				{/* Instructors Tab */}
				<InstructorList
					{...props}
					instructors={course.instructors}
					activeTab={activeTab("instructors")}
					setCourse={setCourse}
				/>
				{/* Instructors Tab End */}

				{/* Students Tab */}
				<StudentList
					{...props}
					students={course.students}
					activeTab={activeTab("students")}
					setCourse={setCourse}
				/>
				{/* Students Tab End */}

				{/* Billables Tab */}
				<BillableList
					{...props}
					billables={course.billables}
					activeTab={activeTab("fee-statements")}
					setCourse={setCourse}
				/>
				{/* Billables Tab End */}
			</div>
		</div>
	)
}

export default show
