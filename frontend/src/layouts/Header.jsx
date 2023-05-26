import React from "react";
import "./styles.css";
const Header = () => {
	return (
		<>
			<nav class="navbar navbar-expand-lg navbar-light bg-light">
				<div class="d-flex justify-content-between w-100">
					<div class="heading" id="navbarSupportedContent">
						<div class="navbar-brand">
							<span className="heading-name"> <span className="pink">B</span>uyour<span className="pink">W</span>ay</span>
						</div>
					</div>
					<div>
						<div class="input-group">
							<input
								type="search"
								class="rounded search form-control"
								placeholder="Search"
								aria-label="Search"
								aria-describedby="search-addon"
							/>
							<button type="button" class="btn search-btn">
								search
							</button>
						</div>
					</div>
					<div class="d-flex align-items-center btn_logout">
						<div class="text-reset me-3" >
							<i class="fas fa-shopping-cart"></i>
						</div>
						<button type="button" class="btn logout">
                        <i class="fa fa-sign-out btn_logout" aria-hidden="true"></i>
                            logout
                        </button>
					</div>
				</div>
			</nav>
		</>
	);
};

export default Header;
