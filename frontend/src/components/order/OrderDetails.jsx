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
import React, { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./index.css";
import { Link, useNavigate } from "react-router-dom";
import { getOrderDetails, clearErrors } from "../../actions/orderActions";
import Loader from "../loader/Loader";
import { useParams } from "react-router-dom";

const OrderDetails = () => {
	const dispatch = useDispatch();
	const { loading, error, order } = useSelector((state) => state.orderDetails);
	const { id } = useParams();
	// console.log(id);
	// const { shippingInfo, orderItems , user, totalPrice, orderStatus } = order
	console.log(order);
	useEffect(() => {
		dispatch(getOrderDetails(id));

		if (error) {
			alert(error);
			dispatch(clearErrors());
		}
	}, [dispatch, error, id]);
	return (
		<Fragment>
			{loading ? (
				<Loader />
			) : (
				<Fragment>
					<section
						className="h-100 gradient-custom"
						
					>
						<MDBContainer className="py-5 h-100">
							<MDBRow className="justify-content-center align-items-center h-100">
								<MDBCol lg="10" xl="8">
									<MDBCard style={{ borderRadius: "10px" }}>
										<MDBCardHeader className="px-4 py-5">
											<MDBTypography tag="h5" className="text-muted mb-0">
												id <span style={{ color: "#a8729a" }}>{id}</span>
											</MDBTypography>
										</MDBCardHeader>
										<MDBCardBody className="p-4">
											<div className="d-flex justify-content-between align-items-center mb-4">
												<p
													className="lead fw-normal mb-0"
													style={{ color: "#a8729a" }}
												>
													Receipt
												</p>
											</div>

                                            {order?.orderItems.map((item) => (
										<MDBCard className="shadow-0 border mb-4">
											<MDBCardBody>
												<MDBRow>
													<MDBCol md="2">
														<MDBCardImage
															src="https://mdbcdn.b-cdn.net/img/Photos/Horizontal/E-commerce/Products/1.webp"
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

											

											<div className="d-flex justify-content-between pt-2">
												<p className="fw-bold mb-0">Order Details</p>
											</div>

											<div className="d-flex justify-content-between pt-2">
												<p className="text-muted mb-0">
													<strong>Name</strong>: {order?.user?.name}
												</p>
												<p className="text-muted mb-0">
													<span className="fw-bold me-2">Paid At</span>{" "}
													{order?.paidAt.substring(0, 10)}
												</p>
											</div>

											<div className="d-flex justify-content-between pt-2">
												<p className="text-muted mb-0">
													<strong>Phone</strong>: {order?.shippingInfo?.phoneNo}
												</p>
												<p className="text-muted mb-0">
													<span className="fw-bold me-2">status</span>{" "}
													{order?.orderStatus === "Processing" ? (
														<span className="text-danger">
															{order?.orderStatus}
														</span>
													) : (
														<span className="text-success">
															{order?.orderStatus}
														</span>
													)}
												</p>
											</div>

											<div className="d-flex justify-content-between pt-2">
												<p className="text-muted mb-0">
													<strong>Address</strong>:{" "}
													{`${order?.shippingInfo?.address}, ${order?.shippingInfo?.postalCode}, ${order?.shippingInfo?.country}`}
												</p>
											</div>
											<hr
												className="mb-4"
												style={{ backgroundColor: "#e0e0e0", opacity: 1 }}
											/>
											<MDBRow className="align-items-center">
												<MDBCol md="2">
													<p className="text-muted mb-0 small">Track Order</p>
												</MDBCol>
												<MDBCol md="10">
													<MDBProgress
														style={{ height: "6px", borderRadius: "16px" }}
													>
														<MDBProgressBar
															style={{
																borderRadius: "16px",
																backgroundColor: "#a8729a",
															}}
															width={order?.orderStatus === "Processing" ? (
                                                               65
                                                            ) : (
                                                                100
                                                            )}
															valuemin={0}
															valuemax={100}
														/>
													</MDBProgress>
													<div className="d-flex justify-content-around mb-1">
														<p className="text-muted mt-1 mb-0 small ms-xl-5">
															Out for delivary
														</p>
														<p className="text-muted mt-1 mb-0 small ms-xl-5">
															Delivered
														</p>
													</div>
												</MDBCol>
											</MDBRow>
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
												className="d-flex align-items-center justify-content-end text-white text-uppercase mb-0"
											>
												Total paid:{" "}
												<span className="h2 mb-0 ms-2">
													{order?.totalPrice}
												</span>
											</MDBTypography>
										</MDBCardFooter>
									</MDBCard>
								</MDBCol>
							</MDBRow>
						</MDBContainer>
					</section>
				</Fragment>
			)}
		</Fragment>
	);
};

export default OrderDetails;
