import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "./index.css";
import Loader from "../loader/Loader";

const Profile = () => {
	const { user, loading } = useSelector((state) => state.auth);
	return (
		<div>
			{console.log(user)}
			{loading ? (
				<Loader />
			) : (
				<div class="container rounded bg-white mt-5 mb-5">
					<div class="row">
						<div class="col-md-3 border-right">
							<div class="d-flex flex-column align-items-center text-center p-3 py-5">
								<img
									class="rounded-circle mt-5"
									width="150px"
									src={user?.avatar?.url}
									alt={user?.name}
								/>
								<span class="font-weight-bold">Edogaru</span>
								<span class="text-black-50">edogaru@mail.com.my</span>
								<br />
								<br />
								<br />
								<div className="d-flex flex-column align-items-start">
									<div class="font-weight-bold my-1">
										Name - <span class="text-black-50">{user?.name}</span>
									</div>
									<div class="font-weight-bold my-1">
										Email - <span class="text-black-50">{user?.email}</span>
									</div>
									<div class="font-weight-bold my-1">
										Joined On -{" "}
										<span class="text-black-50">
											{String(user?.createdAt).substring(0, 10)}
										</span>
									</div>
									<br />
									<br />
									{user?.role !== "admin" && (
										<Link to="/orders">
											<button
												type="button"
												class="btn btn-danger order text-decoration-none"
											>
												Orders
											</button>
										</Link>
									)}
								</div>
							</div>
						</div>
						<div class="col-md-5 border-right">
							<div class="p-3 py-5">
								<div class="d-flex justify-content-between align-items-center mb-3">
									<h4 class="text-right">Profile Settings</h4>
								</div>
								<div class="row mt-2">
									<div class="col-md-6">
										<label class="labels">Name</label>
										<input
											type="text"
											class="form-control"
											placeholder="first name"
											value=""
										/>
									</div>
									<div class="col-md-6">
										<label class="labels">Surname</label>
										<input
											type="text"
											class="form-control"
											value=""
											placeholder="surname"
										/>
									</div>
								</div>
								<div class="row mt-3">
									<div class="col-md-12">
										<label class="labels">Mobile Number</label>
										<input
											type="text"
											class="form-control"
											placeholder="enter phone number"
											value=""
										/>
									</div>
									<div class="col-md-12">
										<label class="labels">Address Line 1</label>
										<input
											type="text"
											class="form-control"
											placeholder="enter address line 1"
											value=""
										/>
									</div>
									<div class="col-md-12">
										<label class="labels">Address Line 2</label>
										<input
											type="text"
											class="form-control"
											placeholder="enter address line 2"
											value=""
										/>
									</div>
									<div class="col-md-12">
										<label class="labels">Postcode</label>
										<input
											type="text"
											class="form-control"
											placeholder="enter address line 2"
											value=""
										/>
									</div>
									<div class="col-md-12">
										<label class="labels">State</label>
										<input
											type="text"
											class="form-control"
											placeholder="enter address line 2"
											value=""
										/>
									</div>
									<div class="col-md-12">
										<label class="labels">Area</label>
										<input
											type="text"
											class="form-control"
											placeholder="enter address line 2"
											value=""
										/>
									</div>
									<div class="col-md-12">
										<label class="labels">Email ID</label>
										<input
											type="text"
											class="form-control"
											placeholder="enter email id"
											value=""
										/>
									</div>
									<div class="col-md-12">
										<label class="labels">Education</label>
										<input
											type="text"
											class="form-control"
											placeholder="education"
											value=""
										/>
									</div>
								</div>
								<div class="row mt-3">
									<div class="col-md-6">
										<label class="labels">Country</label>
										<input
											type="text"
											class="form-control"
											placeholder="country"
											value=""
										/>
									</div>
									<div class="col-md-6">
										<label class="labels">State/Region</label>
										<input
											type="text"
											class="form-control"
											value=""
											placeholder="state"
										/>
									</div>
								</div>
								<div class="mt-5 text-center">
									<button class="btn btn-primary profile-button" type="button">
										Save Profile
									</button>
								</div>
							</div>
						</div>
						<div class="col-md-4">
							<div class="p-3 py-5">
								{/* <div class="d-flex justify-content-between align-items-center experience"><span>Edit Experience</span><span class="border px-3 p-1 add-experience" /><i class="fa fa-plus"></i>&nbsp;Experience</span></div><br /> */}
								<div class="col-md-12">
									<label class="labels">Experience in Designing</label>
									<input
										type="text"
										class="form-control"
										placeholder="experience"
										value=""
									/>
								</div>{" "}
								<br />
								<div class="col-md-12">
									<label class="labels">Additional Details</label>
									<input
										type="text"
										class="form-control"
										placeholder="additional details"
										value=""
									/>
								</div>
							</div>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default Profile;
