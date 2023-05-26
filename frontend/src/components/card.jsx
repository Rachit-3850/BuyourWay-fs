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
				src="https://images.unsplash.com/photo-1597655601841-214a4cfe8b2c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bW91bnRhaW4lMjBzY2VuZXJ5fGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60"
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
