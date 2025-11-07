import React, { useState, useEffect, useRef } from "react"
import ReactDOM from "react-dom"
import { HashRouter } from "react-router-dom"

import ScrollToTop from "@/functions/ScrollToTop"
import LoginPopUp from "@/components/Auth/LoginPopUp"
import VerifyEmailWarning from "@/components/Auth/VerifyEmailWarning"
import Footer from "@/components/Layouts/Footer"
import Messages from "@/components/Core/Messages"
import PaymentMenu from "@/components/Payments/PaymentMenu"
import PageLoader from "@/components/Core/PageLoader"

import Routes from "@/routes"
import { random } from "lodash"

import Subscribed from "@/middleware/subscribed"
import PWABtn from "@/components/Core/PWABtn"

function App() {
	// Function for checking local storage
	const getLocalStorage = (state, string = "array") => {
		if (typeof window !== "undefined" && localStorage.getItem(state)) {
			return JSON.parse(localStorage.getItem(state))
		} else if (string == "string") {
			return ""
		} else {
			return []
		}
	}

	// Function for checking non array local storage
	const getNormalLocalStorage = (state) => {
		if (typeof window !== "undefined" && localStorage.getItem(state)) {
			return localStorage.getItem(state)
		} else {
			return ""
		}
	}

	// Function for checking local storage
	const getLocalStorageAuth = (state) => {
		if (typeof window !== "undefined" && localStorage.getItem(state)) {
			return JSON.parse(localStorage.getItem(state))
		} else {
			return {
				id: 0,
				name: "Guest",
				username: "@guest",
				avatar: "/storage/avatars/male-avatar.png",
				accountType: "normal",
				propertyIds: [],
				assignedPropertyIds: [],
				subscriptionByPropertyIds: [],
				permissions: [],
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
	const [formErrors, setFormErrors] = useState([])
	const [login, setLogin] = useState()
	const [auth, setAuth] = useState(getLocalStorageAuth("auth"))
	const [headerMenu, setHeaderMenu] = useState()
	const [adminMenu, setAdminMenu] = useState(
		window.innerWidth <= 768 ? "" : "left-open"
	)
	const [properties, setProperties] = useState(getLocalStorage("properties"))
	const [selectedPropertyId, setSelectedPropertyId] = useState(
		getNormalLocalStorage("selectedPropertyId")
			? getNormalLocalStorage("selectedPropertyId")
			: [
					...auth.propertyIds ?? [],
					...auth.subscriptionByPropertyIds ?? []
			  ]
	)
	const [page, setPage] = useState({ name: "/", path: [] })
	const [loadingItems, setLoadingItems] = useState(0)
	const [showPayMenu, setShowPayMenu] = useState("")
	const [paymentTitle, setPaymentTitle] = useState()
	const [paymentDescription, setPaymentDescription] = useState()
	const [paymentAmount, setPaymentAmount] = useState()

	const [downloadLink, setDownloadLink] = useState()
	const [downloadLinkText, setDownloadLinkText] = useState("")

	// Function for fetching data from API
	const get = (
		endpoint,
		setState,
		storage = null,
		errors = true,
		controller = {}
	) => {
		// Increment loading items for select endpoints
		if (!["notifications"].includes(endpoint)) {
			setLoadingItems((prev) => prev + 1)
		}

		Axios.get(`/api/${endpoint}`, { signal: controller.signal }) // Pass the controller signal)
			.then((res) => {
				// Decrement loading items
				if (!["notifications"].includes(endpoint)) {
					setLoadingItems((prev) => prev - 1)
				}

				// Set State
				var data = res.data ? res.data.data : []
				setState(data)
				// Set Local Storage
				storage && setLocalStorage(storage, data)
			})
			.catch((error) => {
				// Decrement loading items
				if (!["notifications"].includes(endpoint)) {
					setLoadingItems((prev) => prev - 1)
				}

				if (Axios.isCancel(error)) {
					console.log(`Request for ${endpoint} canceled`)
				} else {
					// Show Errors
					errors && setErrors([`Failed to fetch ${endpoint.split("?")[0]}`])
				}
			})
	}

	// Function for fetching data from API
	const getPaginated = (
		endpoint,
		setState,
		storage = null,
		errors = true,
		controller = {}
	) => {
		// Increment loading items for select endpoints
		if (!["notifications"].includes(endpoint)) {
			setLoadingItems((prev) => prev + 1)
		}

		Axios.get(`/api/${endpoint}`)
			.then((res) => {
				// Decrement loading items
				if (!["notifications"].includes(endpoint)) {
					setLoadingItems((prev) => prev - 1)
				}

				// Set State
				var data = res.data ? res.data : []
				setState(data)
				// Set Local Storage
				storage && setLocalStorage(storage, data)
			})
			.catch(() => {
				// Decrement loading items
				if (!["notifications"].includes(endpoint)) {
					setLoadingItems((prev) => prev - 1)
				}

				// Set Errors
				errors && setErrors([`Failed to fetch ${endpoint.split("?")[0]}`])
			})
	}

	// Function for showing iteration
	const iterator = (key, list) => {
		return key + 1 + list.meta.per_page * (list.meta.current_page - 1)
	}

	// Function for getting errors from responses
	const getErrors = (err, message = false) => {
		const validationErrors = err.response.data.errors
		var errorsAsArray = []

		for (var field in validationErrors) {
			errorsAsArray.push(validationErrors[field])
		}

		// Get Errors with keys as the field names
		var arraysWithFieldNames = []
		for (var field in validationErrors) {
			arraysWithFieldNames.push({
				field: field,
				message: validationErrors[field],
			})
		}

		// Get other errors
		message && errorsAsArray.push(err.response.data.message)
		errors && setErrors(errorsAsArray)
		formErrors && setFormErrors(arraysWithFieldNames)
	}

	const formatToCommas = (e) => {
		let value = e.target.value.toString().replace(/[^0-9.]/g, "")
		value = Number(value)
		e.target.value = value.toLocaleString("en-US")

		return e.target.value.replace(/,/g, "")
	}

	// Fetch data on page load
	useEffect(() => {
		Axios.get("api/auth")
			.then((res) => {
				setAuth(res.data.data)
				setLocalStorage("auth", res.data.data)
				setSelectedPropertyId([
					...res.data.data.propertyIds,
					...res.data.data.assignedPropertyIds,
				])
			})
			.catch((err) => {
				// setErrors(["Failed to fetch auth"])
			})
	}, [])

	useEffect(() => {
		if (auth.id) {
			get(
				`properties?
				userId=${auth.id}&
				assignedPropertyIds=${(auth.assignedPropertyIds.join(","))}`,
				setProperties,
				"properties",
				false
			)
		}
	}, [auth])

	/*
	 * Genereate Month and Year Arrays
	 */
	var currentDate = new Date()
	var currentYear = currentDate.getFullYear()
	var currentMonth = currentDate.getMonth() + 1

	const months = [
		"Select Month",
		"January",
		"February",
		"March",
		"April",
		"May",
		"June",
		"July",
		"August",
		"September",
		"October",
		"November",
		"December",
	]

	const years = []

	for (let i = currentYear; i > 2009; i--) {
		years.push(i)
	}

	const apartmentTypes = [
		{ id: "apartment", name: "Apartment" },
		{ id: "shop", name: "Shop" },
		{ id: "office", name: "Office" },
	]

	/*
	 *
	 * PWA Install button */
	var btnAdd = useRef()

	const GLOBAL_STATE = {
		getLocalStorage,
		setLocalStorage,
		url,
		messages,
		setMessages,
		errors,
		setErrors,
		formErrors,
		setFormErrors,
		get,
		getPaginated,
		iterator,
		getErrors,
		loadingItems,
		setLoadingItems,
		login,
		setLogin,
		auth,
		setAuth,
		headerMenu,
		setHeaderMenu,
		adminMenu,
		setAdminMenu,
		properties,
		setProperties,
		selectedPropertyId,
		setSelectedPropertyId,
		page,
		setPage,
		formatToCommas,

		// PWA
		btnAdd,
		downloadLink,
		setDownloadLink,
		downloadLinkText,
		setDownloadLinkText,

		// Payment
		showPayMenu,
		setShowPayMenu,
		paymentTitle,
		setPaymentTitle,
		paymentDescription,
		setPaymentDescription,
		paymentAmount,
		setPaymentAmount,

		// Date
		currentDate,
		currentYear,
		currentMonth,
		months,
		years,
		apartmentTypes,
	}

	return (
		<HashRouter>
			<ScrollToTop />
			<LoginPopUp {...GLOBAL_STATE} />
			<VerifyEmailWarning {...GLOBAL_STATE} />
			<Subscribed {...GLOBAL_STATE} />
			<PageLoader {...GLOBAL_STATE} />
			<Routes GLOBAL_STATE={GLOBAL_STATE} />
			<Footer {...GLOBAL_STATE} />
			<Messages {...GLOBAL_STATE} />
			<PaymentMenu {...GLOBAL_STATE} />
			<PWABtn {...GLOBAL_STATE} />
		</HashRouter>
	)
}

export default App

if (document.getElementById("app")) {
	ReactDOM.render(<App />, document.getElementById("app"))
}
