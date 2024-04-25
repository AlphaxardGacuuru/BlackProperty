import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom/cjs/react-router-dom.min"
import ReactQuill from "react-quill"
import "react-quill/dist/quill.snow.css"

import Btn from "@/components/Core/Btn"
import MyLink from "@/components/Core/MyLink"

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

const edit = (props) => {
	var { id } = useParams()

	const [material, setMaterial] = useState({})
	const [title, setTitle] = useState()
	const [description, setDescription] = useState()
	const [week, setWeek] = useState("")
	const [startsAt, setStartsAt] = useState()
	const [endsAt, setEndsAt] = useState()
	const [type, setType] = useState()
	const [richText, setRichText] = useState("")
	const [media, setMedia] = useState("")
	const [loading, setLoading] = useState()

	// Get Faculties and Departments
	useEffect(() => {
		// Set page
		props.setPage({
			name: "Edit Learning Resource",
			path: ["courses", "create"],
		})

		// Fetch Material
		Axios.get(`/api/materials/${id}`)
			.then((res) => {
				setMaterial(res.data.data)
				setRichText(res.data.data.richText)
				// Set page
				props.setPage({
					name: "Edit Learning Resource",
					path: ["courses", `units/${res.data.data.unitId}/show`, "create"],
				})
			})
			.catch((err) => props.getErrors(err))
	}, [])

	/*
	 * Types
	 */
	const titles = [
		"Learning Guide",
		"Discussion Forum",
		"Written Assignment",
		"Learning Reflection",
		"Self-Quiz",
		"CAT 1",
		"CAT 2",
		"Review Quiz",
		"Final Exam",
	]

	/*
	 * Submit Form
	 */
	const onSubmit = (e) => {
		e.preventDefault()

		setLoading(true)

		Axios.put(`/api/materials/${id}`, {
			title: title,
			description: description,
			week: week,
			startsAt: startsAt,
			endsAt: endsAt,
			type: type,
			richText: richText,
			media: media,
		})
			.then((res) => {
				setLoading(false)
				// Show messages
				props.setMessages([res.data.message])
				// Reload page
				window.location.reload()
			})
			.catch((err) => {
				setLoading(false)
				// Get Errors
				props.getErrors(err)
			})
	}

	return (
		<div className="row">
			<div className="col-sm-2"></div>
			<div className="col-sm-8">
				<form
					onSubmit={onSubmit}
					className="mb-5">
					<select
						type="text"
						name="title"
						defaultValue="Title"
						className="form-control mb-2 me-2"
						onChange={(e) => setTitle(e.target.value)}>
						<option value="">Choose Learning Resource</option>
						{titles.map((title, key) => (
							<option
								key={key}
								value={title}
								selected={material.title == title && true}>
								{title}
							</option>
						))}
					</select>

					<input
						type="text"
						name="description"
						defaultValue={material.description}
						className="form-control mb-2 me-2"
						onChange={(e) => setDescription(e.target.value)}
					/>

					<input
						type="number"
						name="week"
						defaultValue={material.week}
						className="form-control mb-2 me-2"
						onChange={(e) => setWeek(e.target.value)}
					/>

					<label
						htmlFor=""
						className="ms-1">
						Week Start Date
					</label>
					<input
						type="date"
						name="startsAt"
						defaultValue={material.startsAt}
						className="form-control mb-2 me-2"
						onChange={(e) => setStartsAt(e.target.value)}
					/>

					<label
						htmlFor=""
						className="ms-1">
						Week End Date
					</label>
					<input
						type="date"
						name="endsAt"
						defaultValue={material.endsAt}
						className="form-control mb-2 me-2"
						onChange={(e) => setEndsAt(e.target.value)}
					/>

					<select
						type="text"
						name="type"
						className="form-control mb-2 me-2"
						onChange={(e) => setType(e.target.value)}>
						<option value="">Choose Type</option>
						<option
							value="Multi-Choice"
							selected={material.title == "Multi-Choice" && true}>
							Multi-Choice
						</option>
					</select>

					<div className="bg-white">
						<ReactQuill
							theme="snow"
							value={richText}
							onChange={setRichText}
						/>
					</div>

					<h6 className="p-2">Add Media</h6>
					<div className="card shadow-sm p-2">
						<FilePond
							name="filepond-thumbnail"
							labelIdle='Drag & Drop your Image or <span class="filepond--label-action text-dark"> Browse </span>'
							imageCropAspectRatio="16:9"
							// acceptedFileTypes={["*"]}
							// stylePanelAspectRatio="16:9"
							allowRevert={true}
							server={{
								url: `${props.url}/api/filepond`,
								process: {
									url: "/materials",
									onload: (res) => setMedia(res),
									onerror: (err) => console.log(err.response.data),
								},
								revert: {
									url: `/materials/${media.substr(17)}`,
									onload: (res) => props.setMessages([res]),
								},
							}}
						/>
					</div>
					<br />
					<br />

					<div className="d-flex justify-content-end mb-2">
						<Btn
							btnText="update learning resource"
							loading={loading}
						/>
					</div>
					<div className="d-flex justify-content-center">
						<MyLink
							linkTo={`/units/${material.unitId}/show`}
							text="back to unit"
						/>
					</div>
					<div className="col-sm-2"></div>
				</form>
			</div>
		</div>
	)
}

export default edit
