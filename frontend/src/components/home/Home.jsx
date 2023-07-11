import { useDispatch, useSelector } from "react-redux";
import { getProducts, clearErrors } from "../../actions/prouductActions";
import { Fragment, useEffect, useState } from "react";
import "./home.css";
import Loader from "../loader/Loader";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Pagination from "react-js-pagination";
import { useParams } from "react-router-dom";
import Product, { ProductCard } from "./Product";
import ReactStars from "react-stars";
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

							<div className="rating m-4">
              <ul className="p-0">
                {[5, 4, 3, 2, 1].map((stars) => (
                  <li
                    className="d-flex align-items-center py-0 my-0"
                    key={stars}
                    style={{
                      listStyle: "none",
                      cursor: "pointer",
                      height: "30px",
                    }}
                    onClick={() => {
                      setRating(stars);
                    }}
                  >
                    <ReactStars
                      count={5}
                      value={stars}
                      size={20}
                      color2={"#ffd700"}
                      edit={false}
                      half={true}
                      style={{ cursor: "pointer" }}
                    />
                    <p className=" px-1 pt-3">{stars}</p>
                  </li>
                ))}
              </ul>
            </div>
						</div>
						<div className="col-md-9">
							<div className="row">
								{products &&
									products.map((product) => (
										<ProductCard
										id={product._id}
										key={product._id}
										imgSrc={product.images[0].url}
										title={product.name}
										rating={product.ratings}
										noOfReview={product.numOfReviews}
										price={product.price}
									/>
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
											nextPageText={"Next"}
											prevPageText={"Prev"}
											firstPageText={"First"}
											lastPageText={"Last"}
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
