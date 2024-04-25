import React, { useState, useEffect, useRef } from "react"
import ReactDOM from "react-dom"
import { HashRouter } from "react-router-dom"

import ScrollToTop from "@/functions/ScrollToTop"
import TopNav from "@/components/Layouts/TopNav"
import Footer from "@/components/Layouts/Footer"
import Messages from "@/components/Core/Messages"
import PaymentMenu from "@/components/Payments/PaymentMenu"

import RouteList from "./Core/RouteList"
import { random } from "lodash"

function App() {
	// Function for checking local storage
	const getLocalStorage = (state) => {
		if (typeof window !== "undefined" && localStorage.getItem(state)) {
			return JSON.parse(localStorage.getItem(state))
		} else {
			return []
		}
	}

	// Function for checking local storage
	const getLocalStorageAuth = (state) => {
		if (typeof window !== "undefined" && localStorage.getItem(state)) {
			return JSON.parse(localStorage.getItem(state))
		} else {
			return {
				name: "Guest",
				username: "@guest",
				avatar: "/storage/avatars/male-avatar.png",
				accountType: "normal",
				decos: 0,
				posts: 0,
				fans: 0,
			}
		}
	}

	// Function to set local storage
	const setLocalStorage = (state, data) => {
		localStorage.setItem(state, JSON.stringify(data))
	}

	const url = process.env.MIX_FRONTEND_URL

	// Declare states
	const [messages, setMessages] = useState([])
	const [errors, setErrors] = useState([])
	const [login, setLogin] = useState()
	const [auth, setAuth] = useState(getLocalStorageAuth("auth"))
	const [adminMenu, setAdminMenu] = useState("left-open")
	const [instructorMenu, setInstructorMenu] = useState("left-open")
	const [studentMenu, setStudentMenu] = useState("left-open")
	const [page, setPage] = useState({ name: "/", path: [] })

	const [showPayMenu, setShowPayMenu] = useState("")
	const [paymentTitle, setPaymentTitle] = useState()
	const [paymentDescription, setPaymentDescription] = useState()
	const [paymentAmount, setPaymentAmount] = useState()

	// Function for fetching data from API
	const get = (endpoint, setState, storage = null, errors = true) => {
		Axios.get(`/api/${endpoint}`)
			.then((res) => {
				var data = res.data ? res.data.data : []
				setState(data)
				storage && setLocalStorage(storage, data)
			})
			.catch(() => errors && setErrors([`Failed to fetch ${endpoint}`]))
	}

	// Function for fetching data from API
	const getPaginated = (endpoint, setState, storage = null, errors = true) => {
		Axios.get(`/api/${endpoint}`)
			.then((res) => {
				var data = res.data ? res.data : []
				setState(data)
				storage && setLocalStorage(storage, data)
			})
			.catch(() => errors && setErrors([`Failed to fetch ${endpoint}`]))
	}

	// Function for showing iteration
	const iterator = (key, list) => {
		return key + 1 + list.meta.per_page * (list.meta.current_page - 1)
	}

	// Function for getting errors from responses
	const getErrors = (err, message = false) => {
		const resErrors = err.response.data.errors
		var newError = []
		for (var resError in resErrors) {
			newError.push(resErrors[resError])
		}
		// Get other errors
		message && newError.push(err.response.data.message)
		setErrors(newError)
	}

	// Fetch data on page load
	useEffect(() => {
		get("auth", setAuth, "auth", false)
	}, [])

	const GLOBAL_STATE = {
		getLocalStorage,
		setLocalStorage,
		url,
		messages,
		setMessages,
		errors,
		setErrors,
		get,
		getPaginated,
		iterator,
		getErrors,
		login,
		setLogin,
		auth,
		setAuth,
		adminMenu,
		setAdminMenu,
		instructorMenu,
		setInstructorMenu,
		studentMenu,
		setStudentMenu,
		page,
		setPage,
		showPayMenu,
		setShowPayMenu,
		paymentTitle,
		setPaymentTitle,
		paymentDescription,
		setPaymentDescription,
		paymentAmount,
		setPaymentAmount,
	}

	return (
		<HashRouter>
			<ScrollToTop />
			<TopNav {...GLOBAL_STATE} />
			<RouteList GLOBAL_STATE={GLOBAL_STATE} />
			<Footer {...GLOBAL_STATE} />
			<Messages {...GLOBAL_STATE} />
			<PaymentMenu {...GLOBAL_STATE} />
		</HashRouter>
	)
}

export default App

if (document.getElementById("app")) {
	ReactDOM.render(<App />, document.getElementById("app"))
}
