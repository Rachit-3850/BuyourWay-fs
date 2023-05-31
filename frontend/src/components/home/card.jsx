import React from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";
import ReactStars from 'react-stars'

const Cards = ({ name, price, url, ratings, noOfReviews , product }) => {
	return (
		<Card style={{ width: "18rem" }}>
			<Card.Img
				variant="top"
				src={url}
			/>
			<Card.Body>
				<Card.Title>{name}</Card.Title>
				<div className="d-flex flex-row justify-content-evenly align-items-center">
					<ReactStars size={24} value={ratings} edit= {false} />
					<Card.Text >({noOfReviews}  Reviews)</Card.Text>
				</div>
				<Card.Text>Rs {price}</Card.Text>
				<Link to={`/product/${product._id}`}>
					<Button variant="primary">View Details</Button>
				</Link>
			</Card.Body>
		</Card>
	);
};

export default Cards;
