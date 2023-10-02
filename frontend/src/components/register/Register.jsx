import React from "react";
import "./index.css";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import Loader from "../loader/Loader";
import { register, clearErrors } from "../../actions/userActions";

const Register = () => {
	const [user, setUser] = useState({
		name: "",
		email: "",
		password: "",
	});
	const { name, email, password } = user;

	const [avatar, setAvatar] = useState("");
	const [avatarPreview, setAvatarPreview] = useState("/images/default.png");
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const { isAuthenticated, error, loading } = useSelector(
		(state) => state.auth
	);

	useEffect(() => {
		
		if (error) {
			alert("Something went wrong");
			dispatch(clearErrors());
		}

		// if (isAuthenticated) {
		// 	navigate("/login");
		// }
	}, [dispatch, error, isAuthenticated]);

	const submitHandler = (e) => {
		e.preventDefault();
		console.log("submit");
		if(!(name && email && password && avatar)) {
			alert("All Fields are required");
			return;
		}
		if(password.length < 6) {
			alert("Password should be greater than 5 digits");
			return;
		}
		const formData = new FormData();
		formData.set("name", name);
		formData.set("email", email);
		formData.set("password", password);
		formData.set("avatar", avatar);

		dispatch(register(formData));
		if(!error) {
			navigate("/login");
		}
	};

    const onChange = e => {
        if (e.target.name === 'avatar') {

            const reader = new FileReader();

            reader.onload = () => {
                if (reader.readyState === 2) {
                    setAvatarPreview(reader.result)
                    setAvatar(reader.result)
                }
            }
            // 0 means created
            // 1 means in processing
            // 2 means done
            
            reader.readAsDataURL(e.target.files[0])

        } else {
            setUser({ ...user, [e.target.name]: e.target.value })
        }
    }

	return (
		<div>
			<div className="form-container">
				<form className="card p-4 form" onSubmit={submitHandler} encType='multipart/form-data'>
					<div className="text-center">
						<h1>Register</h1>
					</div>
					<div class="form-group m-2">
						<label>Username</label>
						<input
							type="text"
							className="form-control"
                            name='name'
                            value={name}
                            onChange={onChange}
						/>
					</div>
					<div class="form-group m-2">
						<label for="exampleInputEmail1">Email</label>
						<input
							type="email"
							className="form-control"
							placeholder="Enter email"
                            name='email'
                            value={email}
                            onChange={onChange}
						/>
					</div>
					<div class="form-group m-2">
						<label for="exampleInputPassword1">Password</label>
						<input
							type="password"
							className="form-control"
							id="exampleInputPassword1"
							placeholder="Password"
                            name='password'
                            value={password}
                            onChange={onChange}
						/>
					</div>
					<div className="form-group">
						<label htmlFor="avatar_upload">Avatar</label>
						<div className="d-flex align-items-center">
							<div>
								<figure className="avatar mr-3 item-rtl">
									<img
										src={avatarPreview}
										className="rounded-circle"
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
									accept="iamges/*"
									onChange={onChange}
								/>
								<label className="custom-file-label" htmlFor="customFile">
									Choose Avatar
								</label>
							</div>
						</div>
					</div>
					<div className="button">
						<button
							type="submit"
							className="btn btn-primary w-100"
							disabled={loading ? true : false}
						>
							Register
						</button>
						<div className="text-center">
							<Link to="/login" className="link">
								Already have an Account? Login
							</Link>
						</div>
					</div>
				</form>
			</div>
		</div>
	);
};

export default Register;
