import React, { useState, useEffect } from "react"
import { Link, useParams } from "react-router-dom"

import Img from "@/components/Core/Img"

import TrashSVG from "@/svgs/TrashSVG"
import BackSVG from "@/svgs/BackSVG"
import SocialMediaInput from "@/components/Core/SocialMediaInput"

const ChatThread = (props) => {
	let { id } = useParams()

	const [chats, setChats] = useState([])
	const [user, setUser] = useState({})
	const [toDeleteIds, setToDeleteIds] = useState([])
	const [deletedIds, setDeletedIds] = useState([])

	// Fetch Chats
	const getChats = () => {
		Axios.get(`api/chats/${id}`)
			.then((res) => setChats(res.data.data))
			.catch((err) => getErrors(err))
	}

	useEffect(() => {
		// Fetch User
		Axios.get(`api/users/${id}`).then((res) => {
			setUser(res.data.data)
			// Set page
			props.setPage({ name: res.data.data.name, path: ["chats"] })
		})

		// Fetch Chats
		const chatInterval = setInterval(() => getChats(), 2000)

		// Cleanup function to clear the interval on component unmount
		return () => clearInterval(chatInterval)
	}, [])

	// Ensure latest chat is always visible
	useEffect(() => {
		// Scroll to the bottom of the page
		setTimeout(() => window.scrollTo(0, document.body.scrollHeight), 2000)
		// }, [chats])
	}, [])

	/*
	 * Show Delete */
	const showDelete = (id) => {
		if (toDeleteIds.includes(id)) {
			var newToDeleteIds = toDeleteIds.filter((toDeleteId) => toDeleteId != id)
			setToDeleteIds(newToDeleteIds)
		} else {
			setToDeleteIds([...toDeleteIds, id])
		}
	}

	/*
	 * Function for deleting chat */
	const onDeleteChat = (id) => {
		// Remove item
		setDeletedIds([...deletedIds, id])

		Axios.delete(`/api/chats/${id}`)
			.then((res) => props.setMessages([res.data.message]))
			.catch((err) => props.getErrors(err))
	}

	// Check if chat is user's
	const isUser = (userId) => userId == props.auth.id

	return (
		<div className="row">
			<div className="col-sm-2"></div>
			<div className="col-sm-8">
				<div style={{ width: "100%", minHeight: "75vh" }}>
					{/* <!-- ***** Chats ***** --> */}
					{chats
						.filter((chat) => !deletedIds.includes(chat.id))
						.map((chatItem, key) => (
							<div
								key={key}
								className={`d-flex chat
								${isUser(chatItem.userId) ? "flex-row-reverse" : "text-light"}`}>
								{/* Trash */}
								{isUser(chatItem.userId) &&
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

								{/* Chat */}
								<div
									className={
										isUser(chatItem.userId) ? "chat-item" : "chat-item-reverse"
									}
									onClick={() => {
										if (isUser(chatItem.userId)) {
											showDelete(chatItem.id)
										}
									}}>
									{chatItem.text}

									{/* Media */}
									<div
										className="mb-1"
										style={{ overflow: "hidden" }}>
										{chatItem.media && (
											<Img
												src={chatItem.media}
												width="100%"
												height="auto"
												alt={"chat-media"}
											/>
										)}
									</div>
									{/* Media End */}

									{/* Created At */}
									<small
										className={
											isUser(chatItem.userId)
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
					<br />
					<br className="hidden" />
					<br className="hidden" />

					{/* Social Media Input */}
					<div className="bottomNav">
						<SocialMediaInput
							{...props}
							to={id}
							placeholder="Write Message"
							showImage={false}
							showPoll={false}
							showAttachment={false}
							urlTo="chats"
							editing={false}
						/>
					</div>
					{/* Social Media Input End */}
				</div>
			</div>
			<div className="col-sm-2"></div>
		</div>
	)
}

export default ChatThread
