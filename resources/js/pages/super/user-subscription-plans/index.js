import React, { useEffect, useState } from "react"

import MyLink from "@/components/Core/MyLink"
import DeleteModal from "@/components/Core/DeleteModal"

import HeroIcon from "@/components/Core/HeroIcon"
import HeroHeading from "@/components/Core/HeroHeading"
import PaginationLinks from "@/components/Core/PaginationLinks"

import SubscriptionPlanSVG from "@/svgs/SubscriptionPlanSVG"
import PlusSVG from "@/svgs/PlusSVG"
import EditSVG from "@/svgs/EditSVG"
import NoData from "@/components/Core/NoData"

const index = (props) => {
	const [userUserSubscriptionPlans, setUserSubscriptionPlans] = useState(
		props.getLocalStorage("userUserSubscriptionPlans")
	)

	const [nameQuery, setNameQuery] = useState("")

	useEffect(() => {
		// Set page
		props.setPage({
			name: "User Subscription Plans",
			path: ["user-subscription-plans"],
		})
	}, [])

	useEffect(() => {
		props.getPaginated(
			`user-subscription-plans?name=${nameQuery}`,
			setUserSubscriptionPlans,
			"userUserSubscriptionPlans"
		)
	}, [nameQuery])
	/*
	 * Delete UserSubscriptionPlan
	 */
	const onDeleteUserSubscriptionPlan = (userUserSubscriptionPlanId) => {
		Axios.delete(`/api/user-subscription-plans/${userUserSubscriptionPlanId}`)
			.then((res) => {
				props.setMessages([res.data.message])
				// Remove row
				setUserSubscriptionPlans({
					meta: userUserSubscriptionPlans.meta,
					links: userUserSubscriptionPlans.links,
					data: userUserSubscriptionPlans.data.filter(
						(userUserSubscriptionPlan) =>
							userUserSubscriptionPlan.id != userUserSubscriptionPlanId
					),
				})
				// Fetch Subscription Plans
				props.getPaginated(`user-subscription-plans`, setUserSubscriptionPlans)
			})
			.catch((err) => props.getErrors(err))
	}

	return (
		<div className="row">
			<div className="col-sm-12">
				<div>
					{/* Data */}
					<div className="card shadow-sm mb-2 p-2">
						<div className="d-flex justify-content-between">
							{/* Total */}
							<div className="d-flex justify-content-between w-100 align-items-center mx-4">
								<HeroHeading
									heading="Total Subscription Plans"
									data={userUserSubscriptionPlans.meta?.total}
								/>
								<HeroIcon>
									<SubscriptionPlanSVG />
								</HeroIcon>
							</div>
							{/* Total End */}
						</div>
					</div>
					{/* Data End */}

					<br />

					{/* Filters */}
					<div className="card shadow-sm p-4">
						<div className="d-flex flex-wrap">
							{/* Name */}
							<div className="flex-grow-1 me-2 mb-2">
								<input
									id=""
									type="text"
									name="name"
									placeholder="Search by Name"
									className="form-control"
									onChange={(e) => setNameQuery(e.target.value)}
								/>
							</div>
							{/* Name End */}
						</div>
					</div>
					{/* Filters End */}

					<br />

					{/* Table */}
					<div className="table-responsive mb-5">
						<table className="table table-hover">
							<thead>
								<tr>
									<th colSpan="10"></th>
									<th className="text-end">
										<MyLink
											linkTo={`/user-subscription-plans/create`}
											icon={<PlusSVG />}
											text="attach user to subscription plan"
										/>
									</th>
								</tr>
								<tr>
									<th className="align-top">#</th>
									<th className="align-top">User</th>
									<th className="align-top">Subscription Plan</th>
									<th className="align-top">Amount Paid</th>
									<th className="align-top">Start Date</th>
									<th className="align-top">End Date</th>
									<th className="align-top">Type</th>
									<th className="align-top">Status</th>
									<th className="align-top">Billing Cycle</th>
									<th className="align-top">Subscribed At</th>
									<th className="text-center">Action</th>
								</tr>
							</thead>
							{userUserSubscriptionPlans.data?.length > 0 ? (
								<tbody>
									{userUserSubscriptionPlans.data?.map(
										(userUserSubscriptionPlan, key) => (
											<tr key={key}>
												<td>
													{props.iterator(key, userUserSubscriptionPlans)}
												</td>
												<td>{userUserSubscriptionPlan.userName}</td>
												<td>
													{userUserSubscriptionPlan.subscriptionPlanName
														?.split("_")
														.map(
															(word) =>
																word.charAt(0).toUpperCase() + word.slice(1)
														)
														.join(" ")}
												</td>
												<td className="text-success">
													<small>KES</small>{" "}
													{Number(
														userUserSubscriptionPlan.amountPaid
													)?.toLocaleString()}
												</td>
												<td>{userUserSubscriptionPlan.startDate}</td>
												<td>{userUserSubscriptionPlan.endDate}</td>
												<td>
													{userUserSubscriptionPlan.type
														?.split("_")
														.map(
															(word) =>
																word.charAt(0).toUpperCase() + word.slice(1)
														)
														.join(" ")}
												</td>
												<td className="text-capitalize text-nowrap">
													<span
														className={`
										${
											userUserSubscriptionPlan.status == "active"
												? "bg-success-subtle"
												: userUserSubscriptionPlan.status == "pending"
												? "bg-warning-subtle"
												: userUserSubscriptionPlan.status == "cancelled"
												? "bg-warning-subtle"
												: userUserSubscriptionPlan.status == "paid"
												? "bg-success-subtle"
												: "bg-dark-subtle"
										}
									 py-1 px-3`}>
														{userUserSubscriptionPlan.status}
													</span>
												</td>
												<td className="text-capitalize">
													{userUserSubscriptionPlan.billingCycle}
												</td>
												<td>{userUserSubscriptionPlan.createdAt}</td>
												<td>
													<div className="d-flex justify-content-center">
														<MyLink
															linkTo={`/user-subscription-plans/${userUserSubscriptionPlan.id}/edit`}
															icon={<EditSVG />}
															// text="edit"
															className="me-1"
														/>

														<div className="mx-1">
															<DeleteModal
																index={`userUserSubscriptionPlan${key}`}
																model={userUserSubscriptionPlan}
																modelName="User Subscription Plan"
																onDelete={onDeleteUserSubscriptionPlan}
															/>
														</div>
													</div>
												</td>
											</tr>
										)
									)}
								</tbody>
							) : (
								<tbody>
									<tr>
										<td
											colSpan="14"
											className="p-0">
											<NoData />
										</td>
									</tr>
								</tbody>
							)}
						</table>
						{/* Pagination Links */}
						<PaginationLinks
							list={userUserSubscriptionPlans}
							getPaginated={props.getPaginated}
							setState={setUserSubscriptionPlans}
						/>
						{/* Pagination Links End */}
					</div>
					{/* Table End */}
				</div>
			</div>
		</div>
	)
}

export default index
