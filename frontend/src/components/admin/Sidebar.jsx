import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./index.css";
const Sidebar = () => {
	const [isActive, setIsActive] = useState(false);

	const handleClick = (event) => {
		// 👇️ toggle isActive state on click
		setIsActive((current) => !current);
	};
	return (
		<div className="sidebar-wrapper">
			<nav id="sidebar">
				<ul className="list-unstyled components">
					<li>
						<Link to="/dashboard">
							<i className="fa fa-tachometer"></i> Dashboard
						</Link>
					</li>

					<li>
						{/* <a href="#productSubmenu" data-toggle="collapse" aria-expanded="false" className="dropdown-toggle"><i
                            className="fa fa-product-hunt"></i> Products</a>
                        <ul className="collapse list-unstyled" id="productSubmenu">
                            <li>
                                <Link to="/admin/products"><i className="fa fa-clipboard"></i> All</Link>
                            </li>

                            <li>
                                <Link to="/admin/product"><i className="fa fa-plus"></i> Create</Link>
                            </li>
                        </ul> */}
						<button class="dropdown-btn " onClick={handleClick}>
							<i className="fa fa-product-hunt"></i><span className="px-3">
							Products
                            </span>
							<i class="fa fa-caret-down"></i>
						</button>
						<ul
							className={
								isActive ? "list-unstyled" : "dropdown-container list-unstyled"
							}
						>
							<li>
								{" "}
								<li className="li-bg">
									<Link to="/admin/products">
										<i className="fa fa-clipboard"></i> All
									</Link>
								</li>
							</li>
							<li className="li-bg">
								<Link to="/admin/product">
									<i className="fa fa-plus"></i> Create
								</Link>
							</li>
							{/* <a href="#">Link 3</a> */}
						</ul>
					</li>

					<li>
						<Link to="/admin/orders">
							<i className="fa fa-shopping-basket"></i> Orders
						</Link>
					</li>

					<li>
						<Link to="/admin/users">
							<i className="fa fa-users"></i> Users
						</Link>
					</li>

					<li>
						<Link to="/admin/reviews">
							<i className="fa fa-star"></i> Reviews
						</Link>
					</li>
				</ul>
			</nav>
		</div>
	);
};

export default Sidebar;
