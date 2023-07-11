import logo from "./logo.svg";
import "./App.css";
import { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./layouts/Header";
import Footer from "./layouts/footer/Footer";
import Home from "./components/home/Home";
import ProductDetails from "./components/productDetails/ProductDetails";
import Login from "./components/login/Login";
import Register from "./components/register/Register";
import { loadUser } from "./actions/userActions";
import store from "./store";
import Profile from "./components/profile/Profile";
import ProtectedRoute from "./components/route/ProtectedRoute";
import ForgotPassword from "./components/register/ForgotPassword";
import UpdatePassword from "./components/profile/UpdatePassword";
import ResetPassword from "./components/register/ResetPassword";
import Cart from "./components/cart/Cart";
import Shipping from "./components/cart/Shipping";
import ConfirmOrder from "./components/cart/ConfirmOrder";
import OrderSuccess from "./components/cart/OrderSuccess";
import ListOrder from "./components/order/ListOrder";
import OrderDetails from "./components/order/OrderDetails";
import Dashboard from "./components/admin/Dashboard";
import AdminRoute from "./components/route/AdminRoute";
import ProductsList from "./components/admin/ProductsList";
import NewProuduct from "./components/admin/NewProuduct";
import UpdateProfile from "./components/profile/UpdateProfile";
import UpdateProduct from "./components/admin/UpdateProduct";
import OrdersList from "./components/admin/OrdersList";
import UpdateOrder from "./components/admin/UpdateOrder";
import UsersList from "./components/admin/UsersList";
import UpdateUser from "./components/admin/UpdateUser";
import ProductReviews from "./components/admin/ProductReviews";
import axios from "axios";
// axios.defaults.baseURL = "https://buyourway.onrender.com";
axios.defaults.baseURL = "http://localhost:5000";
axios.defaults.withCredentials = true;

function App() {
	useEffect(() => {
		store.dispatch(loadUser());
	}, []);
	
	return (
		<BrowserRouter>
			<div className="App">
				<Header />
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/search/:keyword" element={<Home />} />
					<Route path="/product/:id" element={<ProductDetails />} />

					<Route path="/login" element={<Login />} />
					<Route path="/register" element={<Register />} />
					<Route path="/password/forgot" element={<ForgotPassword />} />
					<Route path="/password/reset/:token" element={<ResetPassword />} />
					<Route
						path="/me"
						element={
							<ProtectedRoute>
								<Profile />
							</ProtectedRoute>
						}
					/>
					<Route
						path="/shipping"
						element={
							<ProtectedRoute>
								<Shipping />
							</ProtectedRoute>
						}
					/>
					<Route
						path="/confirm-order"
						element={
							<ProtectedRoute>
								<ConfirmOrder />
							</ProtectedRoute>
						}
					/>
					<Route
						path="/success"
						element={
							<ProtectedRoute>
								<OrderSuccess />
							</ProtectedRoute>
						}
					/>
					<Route
						path="/orders/me"
						element={
							<ProtectedRoute>
								<ListOrder />
							</ProtectedRoute>
						}
					/>
					<Route
						path="/order/:id"
						element={
							<ProtectedRoute>
								<OrderDetails />
							</ProtectedRoute>
						}
					/>
					<Route
						path="/dashboard"
						element={
							<ProtectedRoute isAdmin={true}>
								<Dashboard />
							</ProtectedRoute>
						}
					/>
					<Route
						path="/admin/products"
						element={
							<ProtectedRoute >
								<ProductsList />
							</ProtectedRoute>
						}
					/>
					<Route
						path="/admin/product/:productId"
						element={
							<ProtectedRoute >
								<UpdateProduct />
							</ProtectedRoute>
						}
					/>
					<Route
						path="/admin/product"
						element={
							<ProtectedRoute >
								<NewProuduct />
							</ProtectedRoute>
						}
					/>
					<Route
						path="/admin/orders"
						element={
							<ProtectedRoute >
								<OrdersList />
							</ProtectedRoute>
						}
					/>
					<Route
						path="/admin/order/:orderId"
						element={
							<ProtectedRoute >
								<UpdateOrder />
							</ProtectedRoute>
						}
					/>
					<Route
						path="/admin/users"
						element={
							<ProtectedRoute >
								<UsersList />
							</ProtectedRoute>
						}
					/>
					<Route
						path="/admin/user/:userId"
						element={
							<ProtectedRoute >
								<UpdateUser />
							</ProtectedRoute>
						}
					/>
					<Route
						path="/admin/reviews"
						element={
							<ProtectedRoute >
								<ProductReviews />
							</ProtectedRoute>
						}
					/>

					<Route path="/cart" element={<Cart />} />
				</Routes>
				<Footer />
			</div>
		</BrowserRouter>
	);
}

export default App;
