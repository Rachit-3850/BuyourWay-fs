import Button from "react-bootstrap/Button";
import React from 'react'
import { Link } from 'react-router-dom'
import ReactStars from "react-stars";

const Product = ({ product }) => {
    return (
        <div className={`col-sm-12 col-md-6 col-lg-4 my-3`}>
            <div className="card p-3 rounded">
                <img
                    className="card_image mx-auto"
                    src={product.images[0].url}
                />
                <div className="card-body d-flex flex-column">
                    <h5 className="card-title">
                        <Link className="text-decoration-none pink" to={`/product/${product._id}`}>{product.name}</Link>
                    </h5>
                    <div className="d-flex flex-row justify-content-evenly align-items-center">
					<ReactStars size={24} value={product.ratings} edit= {false} />
					<span >({product.numOfReviews}  Reviews)</span>
				</div>
                    <p className="card-text">Rs {product.price}</p>
                    <Link to={`/product/${product._id}`}>
					<Button variant="primary">View Details</Button>
				</Link>
                </div>
            </div>
        </div>
    )
}

export default Product