import React from "react";
import "./index.css";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import Loader from "../loader/Loader";
import { login, clearErrors } from "../../actions/userActions";

const Login = () => {
	const dispatch = useDispatch();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const navigate = useNavigate();

	const { isAuthenticated, error, loading } = useSelector(
		(state) => state.auth
	);

	useEffect(() => {

		if (error) {
			alert("Invalid User or Password");
			dispatch(clearErrors());
		}
		if (isAuthenticated) {
			navigate("/");
		}
	}, [dispatch, error, isAuthenticated]);

	const loginHandler = (e) => {
		e.preventDefault();
		if(!(email && password)) {
			alert("All Fields are required");
			return;
		}
		if(password.length < 6) {
			alert("Password should be greater than 5 digits");
			return;
		}
		dispatch(login(email, password));
		// navigate("/");
	};
	return (
		<>
			{loading ? (
				<Loader />
			) : (
				<div className="form-container ">
					<form className="card p-4 form" onSubmit={loginHandler}>
						<div className="text-center">
							<h1>Login</h1>
						</div>

						<div class="form-group m-2">
							<label for="exampleInputEmail1">Email</label>
							<input
								type="email"
								className="form-control"
								placeholder="Enter email"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
							/>
						</div>
						<div class="form-group m-2">
							<label for="exampleInputPassword1" >Password</label>
							<input
								type="password"
								className="form-control"
								id="exampleInputPassword1"
								placeholder="Password"
								value={password}
								onChange={(e) => setPassword(e.target.value)}
							/>
						</div>
						<div className="d-flex flex-row-reverse mx-3">
                            <div>
							<Link to="/password/forgot" className="text-decoration-none link">
								Forgot Password?
							</Link>
                            </div>
						</div>
						<div className="button">
							<button type="submit" className="btn login w-100 ">
								Login
							</button>
							<div>
								<div>
									<Link to="/register" className="text-decoration-none link">
										Not have an Account? Register
									</Link>
								</div>
							</div>
							<div className=""></div>
						</div>
					</form>
				</div>
			)}
		</>
	);
};

export default Login;
