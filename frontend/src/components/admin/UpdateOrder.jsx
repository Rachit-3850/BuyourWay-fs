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
import React, { useEffect , useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./index.css";
import { Link, useNavigate, useParams } from "react-router-dom";
import Loader from "../loader/Loader";
import { getOrderDetails, updateOrder, clearErrors } from '../../actions/orderActions'
import { UPDATE_ORDER_RESET } from '../../constants/orderConstants'
import { Fragment } from "react";
import Sidebar from "./Sidebar";
const UpdateOrder = () => {
    const [status, setStatus] = useState('');

    const { orderId } = useParams()
    const { loading, order = {} } = useSelector(state => state.orderDetails)
    const { shippingInfo, orderItems, paymentInfo, user, totalPrice, orderStatus } = order
    const { error, isUpdated } = useSelector(state => state.order)
    const dispatch = useDispatch();
	// const { loading, order } = useSelector((state) => state.orderDetails);
	// console.log(id);
	// const { shippingInfo, orderItems , user, totalPrice, orderStatus } = order
	// console.log(order);
	
    useEffect(() => {

        dispatch(getOrderDetails(orderId))

        if (error) {
            alert("Error in updating order");
            dispatch(clearErrors())
        }

        if (isUpdated) {
            alert('Order updated successfully');
            dispatch({ type: UPDATE_ORDER_RESET })
        }

    }, [dispatch, error, isUpdated, orderId])

    // const updateOrderHandler = (id) => {
    //     const formData = new FormData();
    //     formData.set('status', status);

    //     dispatch(updateOrder(id, formData))
    // }
    const updateOrderHandler = (id) => {

        const formData = new FormData();
        formData.set('status', status);

        dispatch(updateOrder(id, formData))
    }

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
												id <span style={{ color: "#a8729a" }}>{orderId}</span>
											</MDBTypography>
										</MDBCardHeader>
                                        
										<MDBCardBody className="p-4">
                                        <div className="d-flex justify-content-between align-items-center mb-4">
												<p
													className="lead fw-normal mb-0"
													style={{ color: "#a8729a" }}
												>
													Update Order
												</p>
											</div>
                                            {order?.orderItems?.map((item) => (
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

											

											<div className="d-flex justify-content-between pt-2">
												<p className="fw-bold mb-0">Order Details</p>
											</div>

											<div className="d-flex justify-content-between pt-2">
												<p className="text-muted mb-0">
													<strong>Name</strong>: {order?.user?.name}
												</p>
												<p className="text-muted mb-0">
													<span className="fw-bold me-2">Paid At</span>{" "}
													{order?.paidAt?.substring(0, 10)}
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
                                            <div className="col-12 col-lg-3 mt-5">
                                    <h4 className="my-4">Status</h4>

                                    <div className="form-group">
                                        <select
                                            className="form-control"
                                            name='status'
                                            value={status}
                                            onChange={(e) => setStatus(e.target.value)}
                                        >
                                            <option value="Processing">Processing</option>
                                            <option value="Shipped">Shipped</option>
                                            <option value="Delivered">Delivered</option>
                                        </select>
                                    </div>

                                    <button className="btn btn-primary btn-block mt-3"
                                     onClick={() => updateOrderHandler(order._id)}
                                     >
                                        Update Status
                                    </button>
                                </div>	
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
  )
}

export default UpdateOrder
