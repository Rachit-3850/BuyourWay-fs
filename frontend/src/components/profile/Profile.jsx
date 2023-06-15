import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "./index.css";
import Loader from "../loader/Loader";
import React from "react";
import UpdateProfile from "./UpdateProfile";
import UpdatePassword from "./UpdatePassword";

const Profile = () => {
	const { user, loading } = useSelector((state) => state.auth);
	return (
		<div>
			{/* {console.log(user)} */}
			{loading ? (
				<Loader />
			) : (
				<div class="container rounded bg-white mt-5 mb-5">
					<div class="row gap-4">
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
						<div class="col-md-5 border-right ">
							<UpdateProfile />
						</div>

						<div class="col-md-3">
							<UpdatePassword />
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default Profile;
