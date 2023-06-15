import { useDispatch, useSelector } from "react-redux";
import { getProducts, clearErrors } from "../../actions/prouductActions";
import { Fragment, useEffect, useState } from "react";
import "./home.css";
import Loader from "../loader/Loader";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Pagination from "react-js-pagination";
import { useParams } from "react-router-dom";
import Product from "./Product";
const Home = () => {
	const [category, setCategory] = useState("");
	const [rating, setRating] = useState(0);

	const categories = [
		"Electronics",
		"Cameras",
		"Laptops",
		"Accessories",
		"Headphones",
		"Food",
		"Books",
		"Clothes/Shoes",
		"Beauty/Health",
		"Sports",
		"Outdoor",
		"Home",
	];

	const dispatch = useDispatch();
	const [currentPage, setCurrentPage] = useState(1);
	const { loading, products, error, productsCount, resPerPage } = useSelector(
		(state) => state.products
	);
	const { keyword } = useParams();
	useEffect(() => {
		dispatch(getProducts(keyword, currentPage, category, rating));
		if (error) {
			alert("something went wrong");
			dispatch(clearErrors());
		}
	}, [dispatch, currentPage, keyword, category, rating]);
	// const prouductList = prouducts.prouducts
	// console.log(prouductList)
	// const deleteProuduct = prouduct => {
	//     dispatch(getProduts(prouduct))
	// }
	function setCurrentPageNo(pageNumber) {
		setCurrentPage(pageNumber);
	}

	let count = productsCount;
	// if (keyword) {
	//     count = filteredProductsCount
	// }
	return (
		<>
			{loading ? (
				<Loader />
			) : (
				<div className="container home">
					<div className="row w-100 ">
						<div className="col-md-3 bg-white">
							<h4 className="mb-3">Categories</h4>
							<ul className="pl-0">
								{categories.map((category) => (
									<li
										style={{
											cursor: "pointer",
											listStyleType: "none",
										}}
										key={category}
										onClick={() => setCategory(category)}
									>
										{category}
									</li>
								))}
							</ul>
							<hr />
							<h4 className="mb-3">Ratings</h4>

							<ul className="pl-0">
								{[5, 4, 3, 2, 1].map((star) => (
									<li
										style={{
											cursor: "pointer",
											listStyleType: "none",
										}}
										key={star}
										onClick={() => setRating(star)}
									>
										<div className="rating-outer">
											<div
												className="rating-inner"
												style={{
													width: `${star * 20}%`,
												}}
											></div>
										</div>
									</li>
								))}
							</ul>
						</div>
						<div className="col-md-9">
							<div className="row ">
								{products &&
									products.map((product) => (
										<Product key={product._id} product={product} />
									))}
							</div>
							<div>
							{resPerPage < count && (
                        <div className="d-flex justify-content-center my-5 ">
                            <Pagination
                                activePage={currentPage}
                                itemsCountPerPage={resPerPage}
                                totalItemsCount={productsCount}
                                onChange={setCurrentPageNo}
                                nextPageText={'Next'}
                                prevPageText={'Prev'}
                                firstPageText={'First'}
                                lastPageText={'Last'}
                                itemClass="page-item"
                                linkClass="page-link"
                            />
                        </div>
                    )}
							</div>
						</div>
					</div>
				</div>
			)}
		</>
	);
};

export default Home;
