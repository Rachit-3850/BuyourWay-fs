import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./index.css";
import { Link, useNavigate } from "react-router-dom";
import { myOrders, clearErrors } from "../../actions/orderActions";
import Loader from "../loader/Loader";
import { MDBDataTable } from "mdbreact";

const ListOrder = () => {
	const dispatch = useDispatch();
	const { loading, error, orders } = useSelector((state) => state.myOrders);

	useEffect(() => {
		dispatch(myOrders());

		if (error) {
			alert(error);
			dispatch(clearErrors());
		}
	}, [dispatch, error]);

	const setOrders = () => {
		const data = {
			columns: [
				{
					label: "Order ID",
					field: "id",
					sort: "asc",
				},
				{
					label: "Num of Items",
					field: "numOfItems",
					sort: "asc",
				},
				{
					label: "Amount",
					field: "amount",
					sort: "asc",
				},
				{
					label: "Status",
					field: "status",
					sort: "asc",
				},
				{
					label: "Actions",
					field: "actions",
					sort: "asc",
				},
			],
			rows: [],
		};

		orders.forEach((order) => {
			data.rows.push({
				id: order._id,
				numOfItems: order.orderItems.length,
				amount: `$${order.totalPrice}`,
				status:
					order.orderStatus &&
					String(order.orderStatus).includes("Delivered") ? (
						<p style={{ color: "green" }}>{order.orderStatus}</p>
					) : (
						<p style={{ color: "red" }}>{order.orderStatus}</p>
					),
				actions: (
					<Link to={`/order/${order._id}`} className="btn btn-primary">
						<i className="fa fa-eye"></i>
					</Link>
				),
			});
		});

		return data;
	};

	return (
		<>
			{loading ? (
				<Loader />
			) : (
				<>
					<div className="container my-5">
						<div className="card p-4  w-100">
							<h1 className="my-5">My Orders</h1>
							<MDBDataTable
								data={setOrders()}
								className="px-3"
								bordered
								striped
								hover
							/>
						</div>
					</div>
				</>
			)}
		</>
	);
};

export default ListOrder;
