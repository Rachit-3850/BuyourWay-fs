import React, { useEffect, useState } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import "./index.css";
import { useParams } from "react-router-dom";
import ReactStars from "react-stars";
import { useDispatch, useSelector } from "react-redux";
import { getProductDetails, clearErrors } from "../../actions/prouductActions";
import { toast, ToastContainer } from "react-toastify";
import Loader from "../loader/Loader";
import { addItemToCart } from "../../actions/cartActions";

const ProductDetails = () => {
	const dispatch = useDispatch();
	const { id } = useParams();
	const [quantity , setQuantity ] = useState(1);
	const { loading, error, product } = useSelector(
		(state) => state.productDetails
	);
	useEffect(() => {
		// console.log(loading);
		dispatch(getProductDetails(id));
		if (error) {
			toast.error(error);
			dispatch(clearErrors());
		}

		// console.log(pro);
	}, [dispatch, error, id]);

	const increaseQty = () => {
		
		if(quantity + 1 > product.stock) {
			return ;
		}

        const qty = quantity + 1;
        setQuantity(qty)
	}
	const decreaseQty = () => {
		
		if(quantity - 1 < 1) {
			return ;
		}
        const qty = quantity - 1;
        setQuantity(qty)
    }

    const addToCart = () => {
		dispatch(addItemToCart(product._id, quantity));
		alert("Item added to cart")
    }

	return (
		<>
			{loading ? (
				<Loader />
			) : (
				<div className="container design">
					<div className="row ">
						<div className="col-md-6 margin-bottom">
							<Carousel>
								<div>
									<img src="https://cdn.pixabay.com/photo/2013/07/18/10/56/railroad-163518_1280.jpg" />
								</div>
								<div>
									<img src="https://cdn.pixabay.com/photo/2013/07/18/10/56/railroad-163518_1280.jpg" />
								</div>
								<div>
									<img src="https://cdn.pixabay.com/photo/2013/07/18/10/56/railroad-163518_1280.jpg" />
								</div>
							</Carousel>
							<div className="d-flex justify-content-center">
								<button type="button" class="btn logout add-to-cart" disabled={product.stock === 0} onClick={addToCart}>
									<i class="fa-solid fa-cart-shopping rounded margin-right"></i>
									<span>Add To Cart</span>
								</button>
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
					</div>
				</div>
			)}
		</>
	);
};

export default ProductDetails;
