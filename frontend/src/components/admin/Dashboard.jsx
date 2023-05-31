import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../loader/Loader";
import Sidebar from "./Sidebar";
import { Link } from "react-router-dom";
import { getAdminProducts , clearErrors} from "../../actions/prouductActions";
import { allOrders } from '../../actions/orderActions'

const Dashboard = () => {
	const {  error, products } = useSelector(state => state.products);
    const { orders, totalAmount, loading } = useSelector(state => state.allOrders)
	const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getAdminProducts());
		dispatch(allOrders())

        if (error) {
            alert.error(error);
            dispatch(clearErrors())
        }
    }, [dispatch , error])
	let outOfStock = 0;
	products.forEach(element => {
		if(element.stock === 0) {
			outOfStock++;
		}
	});
	return (
		<>
			<div className="row w-100">
				<div className="col-12 col-md-2">
					<Sidebar />
				</div>
				<div class="col-md-10">
					<div className="row">
						<div class="my-5">
							<div class="card l-bg-orange-dark">
								<div class="card-statistic-3 p-4">
									<div class="card-icon card-icon-large">
										<i class="fas fa-dollar-sign"></i>
									</div>
									<div class="mb-4">
										<h5 class="card-title mb-0">Total Amount</h5>
									</div>
									<div class="row align-items-center mb-2 d-flex">
										<div class="col-8">
											<h2 class="d-flex align-items-center mb-0">Rs{" "}{totalAmount && totalAmount.toFixed(2)}</h2>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div class="row ">
						<div class="col-xl-3 col-lg-6 my-5">
							<div class="card l-bg-cherry">
								<div class="card-statistic-3 p-4">
									<div class="card-icon card-icon-large">
										<i class="fas fa-shopping-cart"></i>
									</div>
									<div class="mb-4">
										<h5 class="card-title mb-0">Orders</h5>
									</div>
									<div class="row align-items-center mb-2 d-flex">
										<div class="col-8">
											<h2 class="d-flex align-items-center mb-0">{orders?.length}</h2>
										</div>
									</div>
                                    <hr />
									<Link
										class=" mt-1 text-decoration-none text-white"
										data-height="8"
										style={{ height: "8px" }}
										to={"/admin/orders"}
									>
										<div className="text-decoration-none">
											<span className="text-decoration-none">
												<strong>{"<>"}</strong>
											</span>
											<span className="text-decoration-none">
												{" "}
												view Details
											</span>
										</div>
									</Link>
								</div>
							</div>
						</div>
						<div class="col-xl-3 col-lg-6 my-5">
							<div class="card l-bg-blue-dark">
								<div class="card-statistic-3 p-4">
									<div class="card-icon card-icon-large">
										<i class="fas fa-users"></i>
									</div>
									<div class="mb-4">
										<h5 class="card-title mb-0">Customers</h5>
									</div>
									<div class="row align-items-center mb-2 d-flex">
										<div class="col-8">
											<h2 class="d-flex align-items-center mb-0">15.07k</h2>
										</div>
									</div>
                                    <hr />
									<Link
										class=" mt-1 text-decoration-none text-white"
										data-height="8"
										style={{ height: "8px" }}
									>
										<div className="text-decoration-none">
											<span className="text-decoration-none">
												<strong>{"<>"}</strong>
											</span>
											<span className="text-decoration-none">
												{" "}
												view Details
											</span>
										</div>
									</Link>
								</div>
							</div>
						</div>
						<div class="col-xl-3 col-lg-6 my-5">
							<div class="card l-bg-green-dark">
								<div class="card-statistic-3 p-4">
									<div class="card-icon card-icon-large">
										<i class="fas fa-ticket-alt"></i>
									</div>
									<div class="mb-4">
										<h5 class="card-title mb-0">Products</h5>
									</div>
									<div class="row align-items-center mb-2 d-flex">
										<div class="col-8">
											<h2 class="d-flex align-items-center mb-0">{products.length}</h2>
										</div>
									</div>
									<hr />
									<Link
										class=" mt-1 text-decoration-none text-white"
										data-height="8"
										to={"/admin/products"}
										style={{ height: "8px" }}
									>
										<div className="text-decoration-none">
											<span className="text-decoration-none">
												<strong>{"<>"}</strong>
											</span>
											<span className="text-decoration-none">
												{" "}
												view Details
											</span>
										</div>
									</Link>
								</div>
							</div>
						</div>
						<div class="col-xl-3 col-lg-6 my-5">
							<div class="card l-bg-orange-dark">
								<div class="card-statistic-3 p-4">
									<div class="card-icon card-icon-large">
										<i class="fas fa-dollar-sign"></i>
									</div>
									<div class="mb-4">
										<h5 class="card-title mb-0">Stock</h5>
									</div>
									<div class="row align-items-center mb-2 d-flex">
										<div class="col-8">
											<h2 class="d-flex align-items-center mb-0">{outOfStock}</h2>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default Dashboard;
