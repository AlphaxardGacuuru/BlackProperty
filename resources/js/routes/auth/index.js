// Auth-related routes
const authRoutes = [
	{
		path: "/socialite/:message/:token",
		component: "Socialite",
	},
	{
		path: "/verify-email/:id/:hash",
		component: "VerifyEmail",
	},
]

export default authRoutes
