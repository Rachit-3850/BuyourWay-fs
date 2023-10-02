import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../loader/Loader";
import { countries } from "countries-list";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { saveShippingInfo } from "../../actions/cartActions";

const Shipping = () => {
	const { shippingInfo, cartItems } = useSelector((state) => state.cart);
	const { user } = useSelector((state) => state.auth);

	const navigate = useNavigate();

	const [name, setName] = useState(user?.name);
	const [address, setAddress] = useState(shippingInfo?.address);
	const [city, setCity] = useState(shippingInfo?.city);
	const [postalCode, setPostalCode] = useState(shippingInfo?.postalCode);
	const [phoneNo, setPhoneNo] = useState(shippingInfo?.phoneNo);
	const [country, setCountry] = useState(shippingInfo?.country);
	const countriesList = Object.values(countries);
	const submitHandler = (e) => {
		e.preventDefault();
    if(name === undefined || address === undefined || city === undefined || postalCode === undefined || country === undefined || phoneNo === undefined) {
      alert("All fields are required");
      return ;
    }
		dispatch(saveShippingInfo({name , address, city, phoneNo, postalCode, country }));
		navigate("/confirm-order");
	};

	const dispatch = useDispatch();
	return (
		<div className="container my-5">
      
			<div class="row w-100">
				<div class="col-md-8 mb-4">
					<div class="card mb-4 ">
						<div class="card-header py-3">
							<h5 class="mb-0">Billing details</h5>
						</div>
						<div class="card-body">
							
								<div class="row mb-4">
									<div class="col">
										<div class="form-outline">
											<input
												type="text"
												id="form7Example1"
												class="form-control"
												value={name}
												onChange={(e) => setName(e.target.value)}
												required
											/>
											<label class="form-label" for="form7Example1">
												Name
											</label>
										</div>
									</div>
								</div>

								<div class="form-outline mb-4">
									<input
										type="text"
										id="form7Example3"
										class="form-control"
										value={city}
										onChange={(e) => setCity(e.target.value)}
										required
									/>
									<label class="form-label" for="form7Example3">
										City
									</label>
								</div>

								<div class="form-outline mb-4">
									<input
										type="text"
										id="form7Example4"
										class="form-control"
										value={address}
										onChange={(e) => setAddress(e.target.value)}
										required
									/>
									<label class="form-label">Address</label>
								</div>

								<div class="form-outline mb-4">
									<input
										type="email"
										id="form7Example5"
										class="form-control"
										value={postalCode}
										onChange={(e) => setPostalCode(e.target.value)}
										required
									/>
									<label class="form-label" for="form7Example5">
										Postal Code
									</label>
								</div>

								<div class="form-outline mb-4">
									<input
										type="text"
										id="form7Example6"
										class="form-control"
										value={phoneNo}
										onChange={(e) => setPhoneNo(e.target.value)}
										required
									/>
									<label class="form-label" for="form7Example6">
										Phone
									</label>
								</div>
								<div class="form-outline mb-4">
									<select
										type="number"
										id="form7Example6"
										class="form-control"
										value={country}
										onChange={(e) => setCountry(e.target.value)}
										required
									>
										{countriesList.map((country) => (
											<option key={country.name} value={country.name}>
												{country.name}
											</option>
										))}
									</select>
									<label class="form-label" for="form7Example6">
										Country
									</label>
								</div>
							
						</div>
					</div>
				</div>

				<div class="col-md-4 mb-4">
					<div class="card mb-4">
						<div class="card-header py-3">
							<h5 class="mb-0">Summary</h5>
						</div>
						<div class="card-body">
							<ul class="list-group list-group-flush">
								<li class="list-group-item d-flex justify-content-between align-items-center border-0 px-0 pb-0">
									Quantity
									<span>
										{cartItems.reduce(
											(acc, item) => acc + Number(item.quantity),
											0
										)}{" "}
										(Units)
									</span>
								</li>
								<li class="list-group-item d-flex justify-content-between align-items-center border-0 px-0 pb-0">
									Products
									<span>
										Rs{" "}
										{cartItems
											.reduce(
												(acc, item) => acc + item.quantity * item.price,
												0
											)
											.toFixed(2)}
									</span>
								</li>
								<li class="list-group-item d-flex justify-content-between align-items-center px-0">
									Shipping
									<span>Rs {(cartItems.reduce((acc, item) => acc + item.quantity * item.price, 0).toFixed(2)) > 499 ? 0 : 50}</span>
								</li>
								<li class="list-group-item d-flex justify-content-between align-items-center border-0 px-0 mb-3">
									<div>
										<strong>Total Amount</strong>
										
									</div>
									<span>
										<strong>
											Rs{" "}
											{(cartItems
												.reduce(
													(acc, item) => acc + item.quantity * item.price,
													0
												)
												.toFixed(2)) }
										</strong>
									</span>
								</li>
							</ul>

							<button type="button" class="btn btn-primary btn-lg btn-block" onClick={submitHandler} >
								Check Out
							</button>
						</div>
					</div>
				</div>
			</div>
      
		</div>
	);
};

export default Shipping;
