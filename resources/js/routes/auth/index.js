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
	{
		path: "/forgot-password",
		component: "ForgotPassword",
	},
	{
		path: "/reset-password/:token",
		component: "ResetPassword",
	},
]

export default authRoutes
