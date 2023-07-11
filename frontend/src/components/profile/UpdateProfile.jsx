import {
	updateProfile,
	loadUser,
	clearErrors,
} from "../../actions/userActions";
import React, { Fragment, useState, useEffect } from "react";
import { UPDATE_PROFILE_RESET } from "../../constants/userConstants";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "./index.css";
import { toast, ToastContainer } from "react-toastify";

import Loader from "../loader/Loader";

const UpdateProfile = () => {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [avatar, setAvatar] = useState("/images/default.png");
	const [avatarPreview, setAvatarPreview] = useState("/images/default.png");

	const dispatch = useDispatch();

	const { user } = useSelector((state) => state.auth);
	const { error, isUpdated, loading } = useSelector((state) => state.user);

	useEffect(() => {
		if (user) {
			setName(user.name);
			setEmail(user.email);
			console.log(user?.avatar?.url)
			setAvatarPreview(user?.avatar?.url);
		}

		if (error) {
			toast.error(error);
			dispatch(clearErrors());
		}

		if (isUpdated) {
            toast.success("update successfully")
			dispatch(loadUser());

			dispatch({
				type: UPDATE_PROFILE_RESET,
			});
		}
	}, [dispatch, error, , isUpdated]);

	const submitHandler = (e) => {
		e.preventDefault();

		const formData = new FormData();
		formData.set("name", name);
		formData.set("email", email);
		formData.set("avatar", avatar);

		dispatch(updateProfile(formData));
	};
	const onChange = (e) => {
		const reader = new FileReader();

		reader.onload = () => {
			if (reader.readyState === 2) {
				setAvatarPreview(reader.result);
				setAvatar(reader.result);
			}
		};

		reader.readAsDataURL(e.target.files[0]);
	};
	return (
		<div>
			<div class="p-3 py-5">
				<form onSubmit={submitHandler} encType="multipart/form-data">
					<div class="d-flex justify-content-between align-items-center mb-3">
						<h4 class="text-right">Profile Settings</h4>
					</div>
					<div class="row mt-2">
						<div class="col-md-12">
							<label class="labels">Name</label>
							<input
								type="text"
								class="form-control"
								placeholder="first name"
								value={name}
								onChange={(e) => setName(e.target.value)}
							/>
						</div>
					</div>
					<div class="row mt-3">
						<div class="col-md-12">
							<label class="labels">Email ID</label>
							<input
								type="text"
								class="form-control"
								placeholder="enter email id"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
							/>
						</div>
					</div>
					<div class="row mt-3">
						<div class="col-md-12">
							<label class="labels">Avatar</label>
							<div className="d-flex align-items-center">
								<div>
									<figure className="avatar mr-3 item-rtl">
										<img
											src={avatarPreview}
											className=""
											style={{
												height: "50px",
												
											}}
											alt="Avatar Preview"
										/>
									</figure>
								</div>
								<div className="custom-file">
									<input
										type="file"
										name="avatar"
										className="custom-file-input"
										id="customFile"
										accept="image/*"
										onChange={onChange}
									/>
									<label className="custom-file-label" htmlFor="customFile">
										Choose Avatar
									</label>
								</div>
							</div>
						</div>
					</div>

					<div class="row mt-3"></div>
					<div class="mt-5 text-center">
						<button class="btn btn-primary profile-button" type="submit"  disabled={loading ? true : false}>
							Update Profile
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default UpdateProfile;
