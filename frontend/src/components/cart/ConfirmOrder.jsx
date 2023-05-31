import {
	MDBCard,
	MDBCardBody,
	MDBCardFooter,
	MDBCardHeader,
	MDBCardImage,
	MDBCol,
	MDBContainer,
	MDBProgress,
	MDBProgressBar,
	MDBRow,
	MDBTypography,
} from "mdb-react-ui-kit";
import React, { useEffect } from "react";
import {useDispatch, useSelector } from "react-redux";
import "./index.css";
import { Link, useNavigate } from "react-router-dom";
import { createOrder  , clearErrors } from "../../actions/orderActions";

export default function OrderDetails3() {
	const { shippingInfo, cartItems } = useSelector((state) => state.cart);
	const { user } = useSelector((state) => state.auth);
	const { error } = useSelector((state) => state.newOrder);
	const dispatch = useDispatch();
	const navigate = useNavigate();

	useEffect(() => {
		if(error) {
			alert(error);
			dispatch(clearErrors());
		}
	},[error])

	const order = {
		orderItems: cartItems,
		shippingInfo: shippingInfo,
		itemsPrice:  cartItems
		.reduce((acc, item) => acc + item.quantity * item.price, 0)
		.toFixed(2),
		taxPrice:( (( cartItems
		.reduce((acc, item) => acc + item.quantity * item.price, 0)
		.toFixed(2)) * 18)/100).toFixed(2),
		shippingPrice:( cartItems
		.reduce((acc, item) => acc + item.quantity * item.price, 0)
		.toFixed(2)) > 500 ? 0 : 50,
		totalPrice:  calculateCost()
	}

	function calculateCost() {
		let cost = cartItems
			.reduce((acc, item) => acc + item.quantity * item.price, 0)
			.toFixed(2);
		let discount = (cost * 18) / 100;
		let shipping = cost >= 500 ? 0 : 50;
		// console.log(discount , shipping , cost);
		return Number(cost) + discount + shipping;
	}
	const confirmOrder = () => {
		alert("your order has confirmed")
		dispatch(createOrder(order));
		localStorage.clear();
		navigate("/success")
	}
	return (
		<>
			<section className="h-100 gradient-custom">
				<MDBContainer className="py-5 h-100">
					<MDBRow className="justify-content-center align-items-center h-100">
						<MDBCol lg="10" xl="8">
							<MDBCard style={{ borderRadius: "10px" }}>
								<MDBCardHeader className="px-4 py-5">
									<MDBTypography tag="h5" className="text-muted mb-0">
										Comfirm Order{" "}
										<span style={{ color: "#a8729a" }}>
											{shippingInfo.name}
										</span>
										!
									</MDBTypography>
								</MDBCardHeader>
								<MDBCardBody className="p-4">
									<div className="d-flex justify-content-between pt-2">
										<p className="fw-bold mb-0">Order Details</p>
										<p className="text-muted mb-0">
											<span className="fw-bold me-4">Total</span> Rs{" "}
											{cartItems
												.reduce(
													(acc, item) => acc + item.quantity * item.price,
													0
												)
												.toFixed(2)}
										</p>
									</div>

									<div className="d-flex justify-content-between pt-2">
										<p className="text-muted mb-0">
											<strong>Name</strong>: {shippingInfo.name}
										</p>
										<p className="text-muted mb-0">
											<span className="fw-bold me-4">GST 18%</span>Rs{" "}
											{(
												(cartItems
													.reduce(
														(acc, item) => acc + item.quantity * item.price,
														0
													)
													.toFixed(2) *
													18) /
												100
											).toFixed(2)}
										</p>
									</div>

									<div className="d-flex justify-content-between">
										<p className="text-muted mb-0">
											<strong>Phone No</strong>: {shippingInfo.phoneNo}
										</p>
										<p className="text-muted mb-0">
											<span className="fw-bold me-4">Delivery Charges</span>{" "}
											{cartItems
												.reduce(
													(acc, item) => acc + item.quantity * item.price,
													0
												)
												.toFixed(2) >= 500 ? (
												<span>Rs 0</span>
											) : (
												<span>Rs 50</span>
											)}
										</p>
									</div>

									<div className="d-flex justify-content-between mb-5">
										<p className="text-muted mb-0">
											<strong>Address</strong>:{" "}
											{`${shippingInfo.address}, ${shippingInfo.postalCode}, ${shippingInfo.country}`}
										</p>
										<p className="text-muted mb-0">
											<span className="fw-bold me-4">Total Sum</span>{" "}
											<span>Rs {calculateCost().toFixed(2)}</span>
										</p>
									</div>

									{cartItems.map((item) => (
										<MDBCard className="shadow-0 border mb-4">
											<MDBCardBody>
												<MDBRow>
													<MDBCol md="2">
														<MDBCardImage
															src={item.image}
															fluid
															alt="Phone"
														/>
													</MDBCol>
													<MDBCol
														md="6"
														className="text-center d-flex justify-content-center align-items-center"
													>
														<p className="text-muted mb-0">{item.name}</p>
													</MDBCol>

													<MDBCol
														md="4"
														className="text-center d-flex justify-content-center align-items-center"
													>
														<p className="text-muted mb-0 small">
															<span>
																{item.quantity}
																{" X "}
																{item.price}
																{" = "}{" "}
																<strong>
																	{(item.quantity * item.price).toFixed(2)}
																</strong>{" "}
															</span>
														</p>
													</MDBCol>
												</MDBRow>
											</MDBCardBody>
										</MDBCard>
									))}
								</MDBCardBody>
								<MDBCardFooter
									className="border-0 px-4 py-5"
									style={{
										backgroundColor: "#a8729a",
										borderBottomLeftRadius: "10px",
										borderBottomRightRadius: "10px",
									}}
								>
										<MDBTypography
											tag="h5"
											className="d-flex align-items-center justify-content-end text-white text-uppercase mb-0 "
											onClick={confirmOrder}
										>
											<span className="text-decoration-none">
												Confirm Order
											</span>
										</MDBTypography>
									{/* <Link to={"/success"} className="text-decoration-none">
									</Link> */}
								</MDBCardFooter>
							</MDBCard>
						</MDBCol>
					</MDBRow>
				</MDBContainer>
			</section>
		</>
	);
}
