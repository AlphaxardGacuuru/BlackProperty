import React, { useEffect, useRef, useState } from "react"
import { useLocation } from "react-router-dom/cjs/react-router-dom.min"

import Img from "@/components/Core/Img"
import Btn from "@/components/Core/Btn"

// Import React FilePond
import { FilePond, registerPlugin } from "react-filepond"

// Import FilePond styles
import "filepond/dist/filepond.min.css"

// Import the Image EXIF Orientation and Image Preview plugins
// Note: These need to be installed separately
import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation"
import FilePondPluginImagePreview from "filepond-plugin-image-preview"
import FilePondPluginFileValidateType from "filepond-plugin-file-validate-type"
import FilePondPluginImageCrop from "filepond-plugin-image-crop"
import FilePondPluginImageTransform from "filepond-plugin-image-transform"
import FilePondPluginFileValidateSize from "filepond-plugin-file-validate-size"
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css"

// Register the plugins
registerPlugin(
	FilePondPluginImageExifOrientation,
	FilePondPluginImagePreview,
	FilePondPluginFileValidateType,
	FilePondPluginImageCrop,
	FilePondPluginImageTransform,
	FilePondPluginFileValidateSize
)

const Submission = (props) => {
	const location = useLocation()
	const [submissions, setSubmissions] = useState([])
	const [submission, setSubmission] = useState({})
	const [grade, setGrade] = useState()
	const [comments, setComments] = useState()
	const [loading, setLoading] = useState()

	const url = `submissions/${props.sessionId}/${props.unitId}/${props.week}/${props.auth.id}/${props.materialTab}`

	var modalBtn = useRef()

	useEffect(
		() =>
			props.get(
				`submissions?
				sessionId=${props.sessionId}&
				unitId=${props.unitId}&
				week=${props.week}&
				type=${props.materialTab}`,
				setSubmissions
			),
		[props.materialTab, props.messages]
	)

	/*
	 * Handle Showing Attachment
	 */
	const handleShowAttachment = (item) => {
		// Set Submission
		setSubmission(item)
		// Click Modal button
		modalBtn.current.click()
	}

	/*
	 * Grade
	 */
	const onSubmit = (e) => {
		e.preventDefault()
		setLoading(true)

		Axios.post("/api/grades", {
			submissionId: submission.id,
			grade: grade,
			comments: comments,
		})
			.then((res) => {
				setLoading(false)
				props.setMessages([res.data.message])
			})
			.catch((err) => {
				setLoading(false)
				props.getErrors(err)
			})
	}

	return (
		<React.Fragment>
			{/* View Attachment Modal */}
			{/* Button */}
			<button
				ref={modalBtn}
				type="hidden"
				className="btn btn-sm rounded-pill text-white d-none"
				data-bs-toggle="modal"
				data-bs-target="#staticBackdrop"></button>

			{/* Modal */}
			<div
				className="modal fade"
				id="staticBackdrop"
				data-bs-backdrop="static"
				data-bs-keyboard="false"
				tabIndex="-1"
				aria-labelledby="staticBackdropLabel"
				aria-hidden="true">
				<div className="modal-dialog modal-dialog-scrollable modal-dialog-centered modal-lg">
					<div className="modal-content">
						<div className="modal-header">
							<h1
								className="modal-title fs-5"
								id="staticBackdropLabel">
								Attachment
							</h1>
							<button
								type="button"
								className="btn-close"
								data-bs-dismiss="modal"
								aria-label="Close"></button>
						</div>
						<div className="modal-body text-start">
							<iframe
								src={submission.attachment}
								style={{ width: "100%", height: "30em" }}></iframe>

							{/* Form */}
							<div
								className={`flex-grow-1 me-2 mb-1 ${
									location.pathname.match("/student/") &&
									props.materialTab == "Learning Reflection" &&
									submission.userId == props.auth.id
										? "d-none"
										: "d-block"
								}`}>
								<form onSubmit={onSubmit}>
									{/* Grade */}
									<input
										type="number"
										placeholder="Enter Grade"
										className="form-control mb-2"
										max="100"
										min="0"
										onChange={(e) => setGrade(parseInt(e.target.value))}
									/>
									{/* Grade End */}

									{/* Comments */}
									<textarea
										placeholder="Add Comments"
										className="form-control mb-2"
										rows="5"
										onChange={(e) => setComments(e.target.value)}></textarea>
									{/* Comments End */}

									<div className="text-end">
										<Btn
											btnText="submit grade"
											loading={loading}
										/>
									</div>
								</form>
							</div>
							{/* Form End */}
						</div>
					</div>
				</div>
			</div>
			{/* View Attachment Modal End */}

			{/* Filepond */}
			<div className="card shadow-sm mb-1">
				<FilePond
					name="filepond-file"
					className="m-2"
					labelIdle='Drag & Drop your File or <span class="filepond--label-action text-dark"> Browse </span>'
					acceptedFileTypes={["application/pdf"]}
					allowRevert={true}
					server={{
						url: `/api/filepond/`,
						process: {
							url: url,
							onload: (res) => props.setMessages([res]),
							onerror: (err) => console.log(err.response.data),
						},
					}}
				/>
			</div>
			{/* Filepond End */}

			{submissions
				.filter((submission) =>
					location.pathname.match("/student/") &&
					props.materialTab == "Learning Reflection"
						? submission.userId == props.auth.id
						: true
				)
				.map((submission, key) => (
					<div
						key={key}
						className="card shadow-sm p-2">
						<div className="d-flex flex-wrap">
							<div className="mb-1 p-1">{key + 1}</div>
							{/* Profile pic */}
							<div className="mb-1 p-1">
								<Img
									src={submission.userAvatar}
									className="rounded-circle"
									width="25px"
									height="25px"
									alt="Avatar"
								/>
							</div>
							{/* Profile pic End */}
							{/* Name */}
							<div className="flex-grow-1 mb-1 p-2">
								<h6>{submission.userName}</h6>
							</div>
							{/* Name End */}
							{/* Media */}
							<Btn
								btnText="view"
								btnClass={`btn-sm btn-secondary mb-1 ${
									location.pathname.match("/student/") &&
									props.materialTab == "Learning Reflection" &&
									submission.userId != props.auth.id
										? "d-none"
										: "d-block"
								}`}
								onClick={() => handleShowAttachment(submission)}
							/>
							{/* Media End */}
						</div>
					</div>
				))}
		</React.Fragment>
	)
}

export default Submission
