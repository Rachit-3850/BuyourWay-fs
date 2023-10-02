import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../loader/Loader";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import Cookies from 'js-cookie'
import { addItemToCart , removeItemFromCart} from "../../actions/cartActions";
import {
	MDBBtn,
	MDBCard,
	MDBCardBody,
	MDBCardHeader,
	MDBCardImage,
	MDBCol,
	MDBContainer,
	MDBIcon,
	MDBInput,
	MDBListGroup,
	MDBListGroupItem,
	MDBRipple,
	MDBRow,
	MDBTooltip,
	MDBTypography,
} from "mdb-react-ui-kit";

const Cart = () => {
	const dispatch = useDispatch();
	const cart = useSelector((state) => state.cart);
	const { cartItems } = cart;
 
	const navigate = useNavigate();

    const increaseQty = (id , quantity , stock) => {
		
		if(quantity + 1 > stock) {
			return ;
		}
        const qty = quantity + 1;
        
        dispatch(addItemToCart(id , qty))
	}
	const decreaseQty = (id , quantity ) => {
		
		if(quantity - 1 < 1) {
			return ;
		}
        const qty = quantity - 1;
        dispatch(addItemToCart(id , qty))
    }

    const removeItem = (id) => {
            dispatch(removeItemFromCart(id))
    }

    const goToShipping = () => {
        if (Cookies.get()) {
            return navigate('/shipping');
        } else {
            return navigate('/login');
        }
    }


	return (
		<div>
			{cartItems.length === 0 ? (
                <div className="height">
				    <h2 className="text-center my-5">Your Cart is Empty</h2>
                </div>
            ) : (
				<section className="h-100 gradient-custom">
					<MDBContainer className="py-5 h-100">
						<MDBRow className="justify-content-center my-4">
							<MDBCol md="8">
								<MDBCard className="mb-4">
									<MDBCardHeader className="py-3">
										<MDBTypography tag="h5" className="mb-0">
											Cart - {cartItems.length} items
										</MDBTypography>
									</MDBCardHeader>
									<MDBCardBody>
										{cartItems.map((item) => (
											<MDBRow>
												<MDBCol lg="3" md="12" className="mb-4 mb-lg-0">
													<MDBRipple
														rippleTag="div"
														rippleColor="light"
														className="bg-image rounded hover-zoom hover-overlay"
													>
														<img
															src={item.image}
															className="w-100"
														/>
														<a href="#!">
															<div
																className="mask"
																style={{
																	backgroundColor: "rgba(251, 251, 251, 0.2)",
																}}
															></div>
														</a>
													</MDBRipple>
												</MDBCol>

												<MDBCol lg="5" md="6" className=" mb-4 mb-lg-0">
													<p>
														<strong>{item.name}</strong>
													</p>
													<br />
													<br />
													<br />
													<br />

													<button
														type="button"
														class="btn btn-primary btn-sm me-1 mb-2"
														onClick={() => removeItem(item.product)}
														title="Remove item"
													>
														<i class="fas fa-trash"></i>
													</button>
													
												</MDBCol>
												<MDBCol lg="4" md="6" className="mb-4 mb-lg-0">
													<div
														className="d-flex mb-4"
														style={{ maxWidth: "300px" }}
													>
														<div class="measure my-3">
											<span class="input-group-btn">
												<button
													type="button"
													className="btn btn-danger btn-number"
													data-type="minus"
													data-field="quant[2]"
													onClick={() => decreaseQty(item.product , item.quantity)}
												>
													<i className="fa-solid fa-minus"></i>
												</button>
											</span>
											<span>
												<input
													type="type"
													className="form-control count input-number"
													min={1}
													value={item.quantity}
												/>
											</span>
											<span class="input-group-btn">
												<button
													type="button"
													className="btn btn-success btn-number"
													data-type="plus"
													data-field="quant[2]"
													onClick={() => increaseQty(item.product , item.quantity , item.stock)}
												>
													<i className="fa-solid fa-plus"></i>
												</button>
											</span>
										</div>
													</div>

													<p className="text-start text-md-center">
														<strong>Rs {item.price}</strong>
													</p>
												</MDBCol>
												<hr className="my-4" />
											</MDBRow>
										))}
									</MDBCardBody>
								</MDBCard>
							</MDBCol>
							<MDBCol md="4">
								<MDBCard className="mb-4">
									<MDBCardHeader>
										<MDBTypography tag="h5" className="mb-0">
											Summary
										</MDBTypography>
									</MDBCardHeader>
									<MDBCardBody>
										<ul class="list-group list-group-flush">
											<li class="list-group-item d-flex justify-content-between align-items-center border-0 px-0 pb-0">
												Quantity
												<span>{cartItems.reduce((acc, item) => (acc + Number(item.quantity)), 0)} (Units)</span>
											</li>
											<li class="list-group-item d-flex justify-content-between align-items-center border-0 px-0 pb-0">
												Products
												<span>Rs {cartItems.reduce((acc, item) => acc + item.quantity * item.price, 0).toFixed(2)}</span>
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
													<strong>Rs {cartItems.reduce((acc, item) => acc + item.quantity * item.price, 0).toFixed(2)}</strong>
												</span>
											</li>
										</ul>

										<button
											type="button"
											class="btn btn-primary btn-lg btn-block"
                                            onClick={goToShipping}
										>
											Go to checkout
										</button>
									</MDBCardBody>
								</MDBCard>
							</MDBCol>
						</MDBRow>
					</MDBContainer>
				</section>
			)}
		</div>
	);
};

export default Cart;
