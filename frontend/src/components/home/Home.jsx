import { useDispatch, useSelector } from "react-redux";
import { getProducts , clearErrors } from "../../actions/prouductActions";
import { useEffect } from "react";
import './home.css'
import Cards from "../card";
import Loader from "../loader/Loader";
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
const Home = () => {
	const dispatch = useDispatch();
	const {loading , products, error, productsCount } = useSelector(
		(state) => state.products
	);
	useEffect(() => {
		dispatch(getProducts());
		if(error) {
			toast.error(error);
			dispatch(clearErrors());
		}

	}, [dispatch]);
	// const prouductList = prouducts.prouducts
	// console.log(prouductList)
	// const deleteProuduct = prouduct => {
	//     dispatch(getProduts(prouduct))
	// }
	return (
		<div className="container">
			{loading ? (
				<Loader />
			) : (
				
				<div>
					<div className="row">
						
						{products &&
							products.map((product) => (
								<div className="col-md-6 col-lg-4 col-xxl-3"> 
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
				</div>
			)}
		</div>
	);
};

export default Home;
