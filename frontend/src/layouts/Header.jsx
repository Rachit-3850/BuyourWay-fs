import React, { useState } from "react";
import "./styles.css";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import Search from "./Search";
const Header = () => {
	// const [history , setHistory] = useState('/');
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
						<div class="text-reset me-3">
							<i class="fas fa-shopping-cart"></i>
						</div>
						<Link to="/login">
							<button type="button" class="btn logout">
								<i class="fa fa-sign-out btn_logout" aria-hidden="true"></i>
								login
							</button>
						</Link>
					</div>
				</div>
			</nav>
		</>
	);
};

export default Header;
