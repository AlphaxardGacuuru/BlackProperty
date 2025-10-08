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
	const [subscriptionPlans, setSubscriptionPlans] = useState(
		props.getLocalStorage("subscriptionPlans")
	)

	const [nameQuery, setNameQuery] = useState("")

	useEffect(() => {
		// Set page
		props.setPage({ name: "Subscription Plans", path: ["subscription-plans"] })
	}, [])

	useEffect(() => {
		props.getPaginated(
			`subscription-plans?name=${nameQuery}`,
			setSubscriptionPlans,
			"subscriptionPlans"
		)
	}, [nameQuery])
	/*
	 * Delete SubscriptionPlan
	 */
	const onDeleteSubscriptionPlan = (subscriptionPlanId) => {
		Axios.delete(`/api/subscription-plans/${subscriptionPlanId}`)
			.then((res) => {
				props.setMessages([res.data.message])
				// Remove row
				setSubscriptionPlans({
					meta: subscriptionPlans.meta,
					links: subscriptionPlans.links,
					data: subscriptionPlans.data.filter(
						(subscriptionPlan) => subscriptionPlan.id != subscriptionPlanId
					),
				})
				// Fetch Subscription Plans
				props.getPaginated(`subscription-plans`, setSubscriptionPlans)
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
									data={subscriptionPlans.meta?.total}
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
									<th colSpan="8"></th>
									<th className="text-end">
										<MyLink
											linkTo={`/subscription-plans/create`}
											icon={<PlusSVG />}
											text="add subscription plan"
										/>
									</th>
								</tr>
								<tr>
									<th className="align-top">#</th>
									<th className="align-top">Name</th>
									<th className="align-top">Description</th>
									<th className="align-top">Price</th>
									<th className="align-top">Billing Cycle</th>
									<th className="align-top">Max Properties</th>
									<th className="align-top">Max Units</th>
									<th className="align-top">Max Users</th>
									<th className="text-center">Action</th>
								</tr>
							</thead>
							{subscriptionPlans.data?.length > 0 ? (
								<tbody>
									{subscriptionPlans.data?.map((subscriptionPlan, key) => (
										<tr key={key}>
											<td>{props.iterator(key, subscriptionPlans)}</td>
											<td className="text-nowrap">{subscriptionPlan.name}</td>
											<td className="text-nowrap">
												{subscriptionPlan.description}
											</td>
											<td className="text-success">
												<div className="d-flex align-items-center text-nowrap">
													{/* On Boarding Fee Start */}
													<div className="text-nowrap">
														<small>KES</small>{" "}
														{Number(
															subscriptionPlan.price?.onboarding_fee
														)?.toLocaleString()}
													</div>
													{/* On Boarding Fee End */}
													<div className="fs-4 mx-1">|</div>
													{/* Montly Start */}
													<div className="text-nowrap">
														<small>KES</small>{" "}
														{Number(
															subscriptionPlan.price?.monthly
														)?.toLocaleString()}
													</div>
													{/* Montly End */}
													<div className="fs-4 mx-1">|</div>
													{/* Yearly Start */}
													<div className="text-nowrap">
														<small>KES</small>{" "}
														{Number(
															subscriptionPlan.price?.yearly
														)?.toLocaleString()}
													</div>
													{/* Yearly End */}
												</div>
											</td>
											<td className="text-capitalize">
												{subscriptionPlan.billingCycle}
											</td>
											<td>{subscriptionPlan.maxProperties}</td>
											<td>{subscriptionPlan.maxUnits}</td>
											<td>{subscriptionPlan.maxUsers}</td>
											<td>
												<div className="d-flex justify-content-center">
													<MyLink
														linkTo={`/subscription-plans/${subscriptionPlan.id}/edit`}
														icon={<EditSVG />}
														// text="edit"
														className="me-1"
													/>

													<div className="mx-1">
														<DeleteModal
															index={`subscriptionPlan${key}`}
															model={subscriptionPlan}
															modelName="Subscription Plan"
															onDelete={onDeleteSubscriptionPlan}
														/>
													</div>
												</div>
											</td>
										</tr>
									))}
								</tbody>
							) : (
								<tbody>
									<tr>
										<td
											colSpan="12"
											className="p-0">
											<NoData />
										</td>
									</tr>
								</tbody>
							)}
						</table>
						{/* Pagination Links */}
						<PaginationLinks
							list={subscriptionPlans}
							getPaginated={props.getPaginated}
							setState={setSubscriptionPlans}
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
