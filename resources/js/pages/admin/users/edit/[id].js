import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom/cjs/react-router-dom.min"

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
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css"

// Register the plugins
registerPlugin(
	FilePondPluginImageExifOrientation,
	FilePondPluginImagePreview,
	FilePondPluginFileValidateType,
	FilePondPluginImageCrop,
	FilePondPluginImageTransform
)

const edit = (props) => {
	var { id } = useParams()

	const [user, setUser] = useState({})

	const [name, setName] = useState()
	const [email, setEmail] = useState()
	const [phone, setPhone] = useState()
	const [gender, setGender] = useState()
	const [loading, setLoading] = useState()
	const [updateLoading, setUpdateLoading] = useState(false)

	const [invoicesGeneratedNotification, setInvoicesGeneratedNotification] =
		useState()
	const [invoiceReminderNotification, setInvoiceReminderNotification] =
		useState()

	// Get Faculties and Departments
	useEffect(() => {
		// Set page
		props.setPage({
			name: "Edit User",
			path: ["dashboard", `users/${props.auth.id}/edit`],
		})

		// Fetch User
		Axios.get(`api/users/${id}`).then((res) => {
			setUser(res.data.data)
			setInvoicesGeneratedNotification(
				res.data.data.settings?.invoicesGeneratedNotification ?? false
			)
			setInvoiceReminderNotification(
				res.data.data.settings?.invoiceReminderNotification ?? false
			)
		})
	}, [])

	// Handle Notifications Update with debounce
	useEffect(() => {
		if (user.id) {
			setUpdateLoading(true)

			Axios.put(`/api/users/${user.id}`, {
				settings: {
					...user.settings,
					invoicesGeneratedNotification: invoicesGeneratedNotification,
					invoiceReminderNotification: invoiceReminderNotification,
				},
			})
				.then((res) => {
					setUpdateLoading(false)
					// Show messages
					props.setMessages([res.data.message])
					// Update Auth
					props.get("auth", props.setAuth, "auth")
				})
				.catch((err) => {
					setUpdateLoading(false)
					// Get Errors
					props.getErrors(err)

					// Revert states on error
					setInvoicesGeneratedNotification(
						user.settings?.invoicesGeneratedNotification ?? false
					)
					setInvoiceReminderNotification(
						user.settings?.invoiceReminderNotification ?? false
					)
				})
		}
	}, [invoicesGeneratedNotification, invoiceReminderNotification])

	/*
	 * Submit Form
	 */
	const onSubmit = (e) => {
		e.preventDefault()

		setLoading(true)
		Axios.put(`/api/users/${id}`, {
			name: name,
			email: email,
			phone: phone,
			gender: gender,
		})
			.then((res) => {
				setLoading(false)
				// Show messages
				props.setMessages([res.data.message])
			})
			.catch((err) => {
				setLoading(false)
				// Get Errors
				props.getErrors(err)
			})
	}
	console.info(user.settings)

	return (
		<div className="row">
			<div className="col-sm-4"></div>
			<div className="col-sm-4">
				<form onSubmit={onSubmit}>
					<div className="card shadow p-4 mb-4 text-center">
						<div className="m-3">
							<div className="avatar-container">
								<FilePond
									name="filepond-avatar"
									labelIdle='Drag & Drop your Profile Picture or <span class="filepond--label-action text-dark"> Browse </span>'
									stylePanelLayout="compact circle"
									imageCropAspectRatio="1:1"
									acceptedFileTypes={["image/*"]}
									stylePanelAspectRatio="1:1"
									allowRevert={false}
									server={{
										url: `/api/filepond`,
										process: {
											url: `/avatar/${user.id}`,
											onload: (res) => {
												props.setMessages([res])
												// Update Auth
												props.get("auth", props.setAuth, "auth")
											},
											onerror: (err) => console.log(err.response),
										},
									}}
								/>
							</div>
						</div>
					</div>

					<label htmlFor="">Name</label>
					<input
						type="text"
						name="name"
						placeholder="John Doe"
						defaultValue={user.name}
						className="form-control mb-2 me-2"
						onChange={(e) => setName(e.target.value)}
					/>

					<label htmlFor="">Email</label>
					<input
						type="text"
						placeholder="johndoe@gmail.com"
						defaultValue={user.email}
						className="form-control mb-2 me-2"
						onChange={(e) => setEmail(e.target.value)}
					/>

					<label htmlFor="">Phone</label>
					<input
						type="tel"
						placeholder="0722123456"
						defaultValue={user.phone}
						className="form-control mb-2 me-2"
						onChange={(e) => setPhone(e.target.value)}
					/>

					<label htmlFor="">Gender</label>
					<select
						name="gender"
						className="form-control mb-3 me-2"
						onChange={(e) => setGender(e.target.value)}>
						<option value="">Select Gender</option>
						<option
							value="male"
							selected={user.gender == "male"}>
							Male
						</option>
						<option
							value="female"
							selected={user.gender == "female"}>
							Female
						</option>
					</select>

					<div className="d-flex justify-content-end mb-2">
						<Btn
							text="update"
							loading={loading}
						/>
					</div>

					<h4 className="text-center my-4">Notifications</h4>

					{/* Invoices Generated Notification Switch Start */}
					<div className="d-flex justify-content-between align-items-center mx-2 mb-4">
						<div className="form-check-label">
							Invoices Generated Notification
						</div>
						<div className="form-check form-switch">
							{user.id && (
								<input
									id="invoices-generated"
									className="form-check-input"
									type="checkbox"
									role="switch"
									onChange={(e) => {
										setInvoicesGeneratedNotification(e.target.checked)
									}}
									disabled={updateLoading}
									style={{
										width: "2rem",
										height: "1rem",
										transform: "scale(1.2)",
										cursor: "pointer",
									}}
									defaultChecked={
										user.settings?.invoicesGeneratedNotification ?? false
									}
								/>
							)}
						</div>
					</div>
					{/* Invoices Generated Notification Switch End */}

					{/* Invoice Reminder Notification Switch Start */}
					<div className="d-flex justify-content-between align-items-center mx-2 mb-4">
						<div className="form-check-label">
							Invoice Reminder Notification
						</div>
						<div className="form-check form-switch">
							{user.id && (
								<input
									id="invoice-reminder"
									className="form-check-input"
									type="checkbox"
									role="switch"
									onChange={(e) => {
										setInvoiceReminderNotification(e.target.checked)
									}}
									disabled={updateLoading}
									style={{
										width: "2rem",
										height: "1rem",
										transform: "scale(1.2)",
										cursor: "pointer",
									}}
									defaultChecked={
										user.settings?.invoiceReminderNotification ?? false
									}
								/>
							)}
						</div>
					</div>
					{/* Invoice Reminder Notification Switch End */}

					<div className="col-sm-4"></div>
				</form>
			</div>
		</div>
	)
}

export default edit
