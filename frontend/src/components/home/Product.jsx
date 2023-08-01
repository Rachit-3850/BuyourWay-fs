import Button from "react-bootstrap/Button";
import React from 'react'
import { Link } from 'react-router-dom'
import ReactStars from "react-stars";

export const ProductCard = ({ id, imgSrc, title, rating, noOfReview, price }) => {
    return (
        <div class="card my-3 mx-auto" style={{ width: "19rem" }}>
            <img src={imgSrc} className="card-img-top" alt="..." />
            <div class="card-body">
                <h5 class="card-title">
                    <Link className="link-dark " to={`/product/${id}`}>
                        {title}
                    </Link>
                </h5>
                <div className="d-flex align-items-center">
                    <ReactStars
                        count={5}
                        value={Number(rating)}
                        size={20}
                        color2={"#ffd700"}
                        edit={false}
                        half={true}
                    />
                    <span className="ms-1 text-muted">
                        ({noOfReview} Reviews)
                    </span>
                </div>
                <p className="card-text">Rs {price}</p>

                <Link to={`/product/${id}`} className="btn btn-primary">
                    View Details
                </Link>
            </div>
        </div>
    );
};