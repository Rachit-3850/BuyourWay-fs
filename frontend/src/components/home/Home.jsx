import { useDispatch, useSelector } from "react-redux";
import { getProducts , clearErrors } from "../../actions/prouductActions";
import { useEffect , useState } from "react";
import './home.css'
import Cards from "../card";
import Loader from "../loader/Loader";
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import Pagination from "react-js-pagination";
import { useParams } from "react-router-dom";
const Home = () => {
	const dispatch = useDispatch();
	const [ currentPage, setCurrentPage] = useState(1);
	const {loading , products, error, productsCount , resPerPage } = useSelector(
		(state) => state.products
	);
	const { keyword } = useParams();
	useEffect(() => {
		dispatch(getProducts(keyword , currentPage));
		if(error) {
			toast.error(error);
			dispatch(clearErrors());
		}

	}, [dispatch , currentPage , keyword]);
	// const prouductList = prouducts.prouducts
	// console.log(prouductList)
	// const deleteProuduct = prouduct => {
	//     dispatch(getProduts(prouduct))
	// }
	function setCurrentPageNo(pageNumber) {
		setCurrentPage(pageNumber);
	}
	return (
		<div className="container">
			{loading ? (
				<Loader />
			) : (
				
				<div>
					<div className="row ">
						
						{products &&
							products.map((product) => (
								<div className="col-md-6 col-lg-4 col-xxl-3 my-4 "> 
									<Cards
										name={product.name}
										price={product.price}
										url={product.images[0].url}
										noOfReviews = {product.numOfReviews}
										ratings={product.ratings}
										product={product}
										 />
								</div>
							))}
						
					</div>
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
				</div>
			)}
		</div>
	);
};

export default Home;
