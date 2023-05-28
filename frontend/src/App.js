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

				</Routes>
				<Footer />
			</div>
		</BrowserRouter>
	);
}

export default App;
