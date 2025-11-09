import React, { useState } from "react"

import MyLink from "@/components/Core/MyLink"
import Btn from "@/components/Core/Btn"
import Img from "@/components/Core/Img"
import DeleteModal from "@/components/Core/DeleteModal"
import NoData from "@/components/Core/NoData"

import PaginationLinks from "@/components/Core/PaginationLinks"

import HeroHeading from "@/components/Core/HeroHeading"
import HeroIcon from "@/components/Core/HeroIcon"

import ReferralSVG from "@/svgs/ReferralSVG"
import CheckSVG from "@/svgs/CheckSVG"
import ClipboardSVG from "@/svgs/ClipboardSVG"
import MoneySVG from "@/svgs/MoneySVG"
import BalanceSVG from "@/svgs/BalanceSVG"

const ReferralList = (props) => {
	const [clicked, setClicked] = useState()
	const referralLink = `property.black.co.ke/#/admin/dashboard?referer=${props.auth.email}`

	const onReferralLinkClick = () => {
		setClicked(true)

		// Trigger Share Api
		if (navigator.share) {
			navigator
				.share({
					title: "Black Property - Property Management System",
					text: "Join Black Property, a Manage your Properties efficiently with our modern Property Management Software that leaves nothing out of the picture, from tenant onboarding, billing to exit.",
					url: referralLink,
				})
				.then(() => setClicked(false))
				.catch((error) => setClicked(false))
		} else {
			props.setErrors([
				"Your browser does not support the share api. Please copy the link manually.",
			])
		}
	}

	return (
		<div className={props.activeTab}>
			{/* Data */}
			<div className="card shadow-sm p-2">
				<div className="d-flex justify-content-between">
					{/* Total */}
					<div className="col-sm-4">
						<div className="d-flex justify-content-between w-100 align-items-center mx-2">
							<HeroHeading
								heading="Total Referrals"
								data={props.referrals.meta?.total}
							/>
							<HeroIcon>
								<ReferralSVG />
							</HeroIcon>
						</div>
					</div>
					{/* Total End */}
					{/* Total Income */}
					<div className="col-sm-4">
						<div className="d-flex justify-content-between w-100 align-items-center mx-2">
							<HeroHeading
								heading="Total Income"
								data={props.referrals.paid}
							/>
							<HeroIcon>
								<MoneySVG />
							</HeroIcon>
						</div>
					</div>
					{/* Total Income End */}
					{/* Total Balance */}
					<div className="col-sm-4">
						<div className="d-flex justify-content-between w-100 align-items-center mx-2">
							<HeroHeading
								heading="Total Balance"
								data={props.referrals.balance}
							/>
							<HeroIcon>
								<BalanceSVG />
							</HeroIcon>
						</div>
					</div>
					{/* Total Balance End */}
				</div>
			</div>
			{/* Data End */}

			<br />

			{/* Referral Link Start */}
			<div className="card shadow-sm p-4">
				{/* Copy to Clipboard Start */}
				<div className="d-flex">
					{/* <input
						type="text"
						className="form-control me-2"
						value={referralLink}
						readOnly
					/> */}
					<Btn
						text={clicked ? "Copied" : "Copy Referral Link"}
						icon={clicked ? <CheckSVG /> : <ClipboardSVG />}
						onClick={onReferralLinkClick}
						loading={clicked}
					/>
				</div>
				{/* Copy to Clipboard End */}
			</div>
			{/* Referral Link End */}

			<br />

			{/* Filters */}
			<div className="card shadow-sm p-4">
				<div className="d-flex flex-wrap">
					{/* Name */}
					<div className="flex-grow-1 me-2 mb-2">
						<input
							type="text"
							name="name"
							placeholder="Search by Name"
							className="form-control"
							onChange={(e) => props.setNameQuery(e.target.value)}
						/>
					</div>
					{/* Name End */}
					{/* Email */}
					<div className="flex-grow-1 me-2 mb-2">
						<input
							type="email"
							name="email"
							placeholder="Search by Email"
							className="form-control"
							onChange={(e) => props.setEmailQuery(e.target.value)}
						/>
					</div>
					{/* Email End */}
					{/* Phone */}
					<div className="flex-grow-1 me-2 mb-2">
						<input
							type="text"
							name="phone"
							placeholder="Search by Phone"
							className="form-control"
							onChange={(e) => props.setPhoneQuery(e.target.value)}
						/>
					</div>
					{/* Phone End */}
				</div>
			</div>
			{/* Filters End */}

			<br />

			<div className="table-responsive mb-5">
				<table className="table table-hover">
					<thead>
						<tr>
							<th>#</th>
							<th></th>
							<th>Name</th>
							<th>Email</th>
							<th>Phone</th>
							<th>Commission</th>
							<th>Total Income</th>
							<th>Balance</th>
							<th>Registered On</th>
						</tr>
					</thead>
					{props.referrals.data?.length > 0 ? (
						<tbody>
							{props.referrals.data?.map((referral, key) => (
								<tr key={key}>
									<td>{props.iterator(key, props.referrals)}</td>
									<td>
										<Img
											src={referral.refereeAvatar}
											className="rounded-circle"
											style={{ minWidth: "3em", height: "3em" }}
											alt="Avatar"
										/>
									</td>
									<td>{referral.refereeName}</td>
									<td>{referral.refereeEmail}</td>
									<td>{referral.refereePhone}</td>
									<td>{referral.commission}%</td>
									<td className="text-success">
										<small>KES</small> {referral.totalIncome.toLocaleString()}
									</td>
									<td className="text-success">
										<small>KES</small> {referral.balance.toLocaleString()}
									</td>
									<td>{referral.createdAt}</td>
								</tr>
							))}
						</tbody>
					) : (
						<tbody>
							<tr>
								<td
									colSpan="9"
									className="p-0">
									<NoData />
								</td>
							</tr>
						</tbody>
					)}
				</table>
				{/* Pagination Links */}
				<PaginationLinks
					list={props.referrals}
					getPaginated={props.getPaginated}
					setState={props.setReferrals}
				/>
				{/* Pagination Links End */}
			</div>
		</div>
	)
}

export default ReferralList
