import React , { useState } from "react";

import "./styles.css";
import { Link } from "react-router-dom";
import Search from "./Search";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../actions/userActions";
import Dropdown from "react-bootstrap/Dropdown";
import { Fragment } from "react";

const Header = () => {
	const dispatch = useDispatch();
	const { user, loading , error} = useSelector((state) => state.auth);
	console.log(user);
	const logoutHandler = () => {
        dispatch(logout());
        alert("User logged out")
    }
	return (
		<>
			<nav class="navbar navbar-expand-lg navbar-light bg-light">
				<div class="d-flex justify-content-between w-100">
					<div class="heading" id="navbarSupportedContent">
						<div class="navbar-brand">
							<span className="heading-name">
								{" "}
								<span className="pink">B</span>uyour
								<span className="pink">W</span>ay
							</span>
						</div>
					</div>
					<div>
						<Search />
					</div>
					<div class="d-flex align-items-center btn_logout">
						<Link to="/cart">
							<div class="username me-3">
								<i class="fas fa-shopping-cart"></i>
							</div>
						</Link>
						{user ? (
							<div className="ml-4 d-flex align-items-center">
								<Link
									to="#!"
									className="btn  text-white mr-4"
									type="button"
									id="dropDownMenuButton"
									data-toggle="dropdown"
									aria-haspopup="true"
									aria-expanded="false"
								>
									<figure className="avatar">
										<img
											src={user.avatar && user.avatar.url}
											alt={user && user.name}
											className="rounded-circle"
											style={{height: "2rem" , width: "2rem"}}
										/>
									</figure>
									<span className="username">{user && user.name}</span>
								</Link>
								
								<Dropdown >
									<Dropdown.Toggle variant="" id="">
									<i class="fa-solid fa-bars"></i>
									</Dropdown.Toggle>
									<Dropdown.Menu>
									<Dropdown.Item href="/">
										Home
										</Dropdown.Item>
									{user && user.role === "admin" && (
										
										<Dropdown.Item href="/dashboard">Dashboard</Dropdown.Item>
									)}
										<Dropdown.Item href="/Orders/me">
										Orders
										</Dropdown.Item>
										<Dropdown.Item href="/me">
										Profile
										</Dropdown.Item>
										<Dropdown.Item href="/" onClick={logoutHandler}>
										Logout
										</Dropdown.Item>
									</Dropdown.Menu>
								</Dropdown>
								
							</div>
						) : (
							
							!loading && (
								<Link to="/login">
									<button type="button" class="btn logout text-decoration-none">
										login
									</button>
								</Link>
							)
						)}
					</div>
				</div>
			</nav>
		</>
		
	);
};

export default Header;
