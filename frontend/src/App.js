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

					<Route path="/cart" element={<Cart />} />
				</Routes>
				<Footer />
			</div>
		</BrowserRouter>
	);
}

export default App;
