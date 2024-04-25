import React, { useState, useEffect, useRef } from "react"
import { Link, useParams } from "react-router-dom"

import Img from "@/components/Core/Img"

import TrashSVG from "@/svgs/TrashSVG"
import SocialMediaInput from "@/components/Core/SocialMediaInput"
import AttachmentSVG from "@/svgs/AttachmentSVG"
import StarFilledSVG from "@/svgs/StarFilledSVG"
import StarSVG from "@/svgs/StarSVG"

const DiscussionForum = (props) => {
	let { id } = useParams()

	const [chats, setChats] = useState([])
	const [user, setUser] = useState({})
	const [attachment, setAttachment] = useState()
	const [newChat, setNewChat] = useState({})
	const [rateId, setRateId] = useState()
	const [toDeleteIds, setToDeleteIds] = useState([])
	const [showOptions, setShowOptions] = useState(false)
	const [hasRated, setHasRated] = useState()
	const [deletedIds, setDeletedIds] = useState([])

	var modalBtn = useRef()

	// Fetch Chats
	const getChats = () => {
		Axios.get(
			`api/discussion-forums/${props.unitId}?sessionId=${props.sessionId}`
		)
			.then((res) => {
				setChats(res.data.data)
				// Recurse
				setTimeout(() => getChats(), 2000)
			})
			.catch((err) => props.getErrors(err))
	}

	useEffect(() => {
		// Fetch Chats
		getChats()
	}, [])

	/*
	 * Handle Showing Attachment
	 */
	const handleShowAttachment = (item) => {
		// Set attachment
		setAttachment(item)
		// Click Modal button
		modalBtn.current.click()
	}

	/*
	 * Add rating
	 */
	const onRate = (rating) => {
		Axios.post(`api/discussion-forum-ratings`, {
			discussionForumId: rateId,
			rating: rating,
		})
			.then((res) => props.setMessages([res.data.message]))
			.catch((err) => props.getErrors(err))
	}

	const ratings = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100]

	/*
	 * Show Options
	 */
	const handleShowOptions = (chat) => {
		setHasRated(chat.hasRated)
		setShowOptions(!showOptions)
		setRateId(chat.id)
	}

	/*
	 * Show Delete */
	const showDelete = (chat) => {
		// Hide Options
		setShowOptions(false)

		// Toggle Delete
		if (toDeleteIds.includes(chat.id)) {
			var newToDeleteIds = toDeleteIds.filter(
				(toDeleteId) => toDeleteId != chat.id
			)
			setToDeleteIds(newToDeleteIds)
		} else {
			setToDeleteIds([...toDeleteIds, chat.id])
		}
	}

	/*
	 * Function for deleting chat */
	const onDeleteChat = (id) => {
		// Remove item
		setDeletedIds([...deletedIds, id])

		Axios.delete(`/api/discussion-forums/${id}`)
			.then((res) => props.setMessages([res.data.message]))
			.catch((err) => props.getErrors(err))
	}

	// Ensure latest chat is always visible
	useEffect(() => {
		// Scroll to the bottom of the page
		window.scrollTo(0, document.body.scrollHeight)
	}, [chats])

	return (
		<div>
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
								src={attachment}
								style={{ width: "100%", height: "30em" }}></iframe>
						</div>
					</div>
				</div>
			</div>
			{/* View Attachment Modal End */}

			{/* <!-- ***** Chats ***** --> */}
			<div
				className="sonar-call-to-action-area section-padding-0-100"
				style={{ height: "30em", overflowY: "scroll" }}>
				{/* Options */}
				{showOptions && (
					<div className="d-flex justify-content-center bg-white shadow-sm mb-2 p-2">
						{ratings.map((rating, key) => (
							<div
								key={key}
								className="p-1"
								style={{ cursor: "pointer" }}
								onClick={() => {
									// Check if rating exists
									if (hasRated) {
										setHasRated()
									} else {
										// Change UI
										setHasRated(rating)
									}
									onRate(rating)
								}}>
								{hasRated == rating ? (
									<span className="text-primary">
										<StarFilledSVG />
										<div className="m-0">{rating}</div>
									</span>
								) : (
									<span>
										<StarSVG />
										<div className="m-0">{rating}</div>
									</span>
								)}
							</div>
						))}
					</div>
				)}
				{/* Options End */}

				{chats
					.filter((chat) => chat != {})
					.filter((chat) => chat.week == props.week)
					.filter((chat) => !deletedIds.includes(chat.id))
					.map((chatItem, key) => (
						<div
							key={key}
							className={`d-flex chat
								${chatItem.userId == props.auth.id ? "flex-row-reverse" : "text-light"}`}>
							{/* Trash */}
							{chatItem.userId == props.auth.id &&
								toDeleteIds.includes(chatItem.id) && (
									<div
										className="chat-item-trash"
										onClick={() => onDeleteChat(chatItem.id)}>
										<span>
											<TrashSVG />
										</span>
									</div>
								)}
							{/* Trash End */}
							{/* Profile pic */}
							<div
								className="p-1"
								style={{
									backgroundColor:
										chatItem.userId == props.auth.id ? "#d82a4e" : "#fff",
									borderColor:
										chatItem.userId == props.auth.id ? "#d82a4e" : "#ffffff",
								}}>
								<Img
									src={chatItem.avatar}
									className="rounded-circle"
									width="25px"
									height="25px"
									alt="Avatar"
								/>
							</div>
							{/* Profile pic End */}
							{/* Chat */}
							<div
								className={
									chatItem.userId == props.auth.id
										? "chat-item border-0"
										: "chat-item-reverse border-0"
								}
								onClick={() => {
									if (chatItem.userId == props.auth.id) {
										showDelete(chatItem)
									} else {
										handleShowOptions(chatItem)
									}
								}}>
								<small
									className={`d-block ${
										chatItem.userId == props.auth.id
											? " text-end"
											: " text-start"
									}`}>
									<i>
										{chatItem.userName}
										<span
											style={{ fontSize: "0.8em" }}
											className="text-capitalize text-danger m-1">
											{chatItem.userType == "instructor" && chatItem.userType}
										</span>
									</i>
								</small>
								{chatItem.text}

								{/* Rating */}
								<span className="d-block m-0 p-0">
									{ratings.map((rating, key) => (
										<span
											key={key}
											className="px-1"
											style={{ fontSize: "0.5em" }}>
											{chatItem.rating >= rating ? (
												<span className="text-primary">
													<StarFilledSVG />
												</span>
											) : (
												<span>
													<StarSVG />
												</span>
											)}
										</span>
									))}
								</span>
								{/* Rating End */}

								{/* Media */}
								<span className="d-block text-end mb-1">
									{chatItem.attachment && (
										<span className="d-flex justify-content-between rounded bg-dark">
											<button
												type="button"
												className="btn btn-sm rounded-pill text-white"
												onClick={() =>
													handleShowAttachment(chatItem.attachment)
												}>
												View
											</button>
											<span className="p-2">
												<AttachmentSVG />
											</span>
										</span>
									)}
								</span>
								{/* Media End */}

								{/* Created At */}
								<small
									className={
										chatItem.userId == props.auth.id
											? "text-light m-0 p-1"
											: "text-muted m-0 p-1"
									}>
									<i
										style={{ fontSize: "0.8em" }}
										className="float-end m-0 p-0">
										{chatItem.createdAt}
									</i>
								</small>
								{/* Created At End */}
							</div>
							{/* Chat End */}
						</div>
					))}
			</div>

			{/* Social Media Input */}
			<div className="bottomNav mt-2 mb-5">
				<SocialMediaInput
					{...props}
					id={props.sessionId}
					to={props.unitId}
					week={props.week}
					placeholder="Message"
					showImage={true}
					showPoll={false}
					urlTo="discussion-forums"
					editing={false}
				/>
			</div>
			{/* Social Media Input End */}
		</div>
	)
}

export default DiscussionForum
