import {
	MDBCard,
	MDBCardBody,
	MDBCardImage,
	MDBCol,
	MDBContainer,
	MDBIcon,
	MDBRow,
	MDBTypography,
} from "mdb-react-ui-kit";
import React, { useEffect, useState } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import "./index.css";
import { useParams } from "react-router-dom";
import ReactStars from "react-stars";
import { useDispatch, useSelector } from "react-redux";
import {
	getProductDetails,
	clearErrors,
	newReview,
} from "../../actions/prouductActions";
import { toast, ToastContainer } from "react-toastify";
import Loader from "../loader/Loader";
import { addItemToCart } from "../../actions/cartActions";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { NEW_REVIEW_RESET } from "../../constants/productConstants";

const ProductDetails = () => {
	const dispatch = useDispatch();
	const { id } = useParams();

	const [quantity, setQuantity] = useState(1);
	const [rating, setRating] = useState(0);
	const [comment, setComment] = useState("");

	const { loading, error, product } = useSelector(
		(state) => state.productDetails
	);
	const { user } = useSelector((state) => state.auth);
	const { error: reviewError, success } = useSelector(
		(state) => state.newReview
	);
	const [show, setShow] = useState(false);

	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

	useEffect(() => {
		// console.log(loading);
		dispatch(getProductDetails(id));
		if (error) {
			alert(error);
			dispatch(clearErrors());
		}

		if (reviewError) {
			alert(reviewError);
			dispatch(clearErrors());
		}

		if (success) {
			alert("Reivew posted successfully");
			dispatch({ type: NEW_REVIEW_RESET });
		}
		// console.log(pro);
	}, [dispatch, error, reviewError, success, id]);

	const reviewHandler = () => {
		const formData = new FormData();

		formData.set("rating", rating);
		formData.set("comment", comment);
		formData.set("productId", id);
		setShow(false);
		dispatch(newReview(formData));
	};

	const increaseQty = () => {
		if (quantity + 1 > product.stock) {
			return;
		}

		const qty = quantity + 1;
		setQuantity(qty);
	};
	const decreaseQty = () => {
		if (quantity - 1 < 1) {
			return;
		}
		const qty = quantity - 1;
		setQuantity(qty);
	};

	const addToCart = () => {
		dispatch(addItemToCart(product._id, quantity));
		alert("Item added to cart");
	};
	// console.log(product);

	return (
		<>
			{loading ? (
				<Loader />
			) : (
				<div className="container design" id="review">
					<div className="row ">
						<div className="col-md-6 margin-bottom">
							<Carousel dynamicHeight={false} >
								{product?.images?.map(image => (
								<div >
									<img  src={image.url} />
								</div>
								))}
							</Carousel>
							<div className="d-flex justify-content-center">
								<button
									type="button"
									class="btn logout add-to-cart"
									disabled={product.stock === 0}
									onClick={addToCart}
								>
									<i class="fa-solid fa-cart-shopping rounded margin-right"></i>
									<span>Add To Cart</span>
								</button>
							</div>
							<div className="d-flex justify-content-center">
								{user ? (
									<>
										<button
											id="review_btn"
											type="button"
											className="btn btn-primary mt-4"
											data-toggle="modal"
											data-target="#ratingModal"
											onClick={handleShow}
										>
											Submit Your Review
										</button>
										<Modal show={show} onHide={handleClose}>
											<Modal.Header closeButton>
												<Modal.Title>SUBMIT REVIEW</Modal.Title>
											</Modal.Header>
											<Modal.Body>
												<form>
													<div className="form-group">
														<label>Rating</label>
														<ReactStars
															count={5}
															value={rating}
															size={24}
															onChange={(value) => setRating(value)}
														/>
													</div>
													<div className="form-group">
														<label>Comment</label>
														<textarea
															type="text"
															className="form-control"
															id="exampleFormControlTextarea1"
															rows=""
															value={comment}
															onChange={(e) => setComment(e.target.value)}
														/>
													</div>
												</form>
											</Modal.Body>
											<Modal.Footer>
												<Button variant="secondary" onClick={handleClose}>
													Close
												</Button>
												<Button variant="primary" onClick={reviewHandler}>
													Save Changes
												</Button>
											</Modal.Footer>
										</Modal>
									</>
								) : (
									<div className="alert alert-danger mt-5" type="alert">
										Login to post your review.
									</div>
								)}
							</div>
						</div>
						<div className="col-md-6 margin-bottom">
							<div className="d-flex flex-column p-4">
								<div>
									<h2>{product.name}</h2>
								</div>
								<div>id {product._id}</div>
								<div className="d-flex flex-row justify-content-start gap-3 align-items-center">
									<ReactStars size={24} value={product.ratings} edit={false} />
									<p1>({product.numOfReviews} Reviews )</p1>
								</div>
								<hr />
								<div>
									<h2>Rs {product.price}</h2>
									<p1>inclusive of all taxes</p1>
									<div>
										<div class="measure my-3">
											<span class="input-group-btn">
												<button
													type="button"
													className="btn btn-danger btn-number"
													data-type="minus"
													data-field="quant[2]"
													onClick={decreaseQty}
												>
													<i className="fa-solid fa-minus"></i>
												</button>
											</span>
											<span>
												<input
													type="type"
													className="form-control count input-number"
													min={1}
													value={quantity}
												/>
											</span>
											<span class="input-group-btn">
												<button
													type="button"
													className="btn btn-success btn-number"
													data-type="plus"
													data-field="quant[2]"
													onClick={increaseQty}
												>
													<i className="fa-solid fa-plus"></i>
												</button>
											</span>
										</div>
										{product.stock === 0 ? (
											<button type="button" class="btn btn-danger">
												Out Of Stock
											</button>
										) : (
											<button type="button" class="btn btn-warning">
												In Stock
											</button>
										)}
									</div>
									<hr />
									<h2>Discription</h2>

									<p>{product.description}</p>
									<div>
										<span className="bold">Sold By</span> {product.seller}
									</div>
								</div>
							</div>
						</div>

						<section>
							<MDBContainer className="py-5 w-100" style={{ maxWidth: "1000px" }}>
								<MDBRow className="justify-content-center w-100">
									<MDBCol md="12" lg="10">
										<MDBCard className="text-dark">
											<MDBCardBody className="p-4">
												<MDBTypography tag="h4" className="mb-0">
													Recent comments
												</MDBTypography>
												<p className="fw-light mb-4 pb-2">
													Latest Comments section by users
												</p>
												{product?.reviews &&
													product?.reviews?.length > 0 &&
													product.reviews?.map((review) => (
														<>
															<div className="d-flex flex-start mw-100">
																<div>
																	<MDBTypography
																		tag="h6"
																		className="fw-bold mb-1"
																	>
																		{review.name}
																	</MDBTypography>
																	<div className="d-flex align-items-center mb-3">
																		<p className="mb-0">{review.createdAt.substring(0,10)}</p>
																	</div>
																	<p className="mb-0">
																		{review.comment}
																	</p>
																</div>
															</div>
															<hr className="my-3" />
														</>
													))}
											</MDBCardBody>
										</MDBCard>
									</MDBCol>
								</MDBRow>
							</MDBContainer>
						</section>
					</div>
				</div>
			)}
		</>
	);
};

export default ProductDetails;
