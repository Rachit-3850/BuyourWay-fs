import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./layouts/Header";
import Footer from "./layouts/footer/Footer";
import Home from "./components/home/Home";
import ProductDetails from "./components/productDetails/ProductDetails";

function App() {
	return (
		<BrowserRouter>
			<div className="App">
				<Header />
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/product/:id" element={<ProductDetails />} />
				</Routes>
				<Footer />
			</div>
		</BrowserRouter>
	);
}

export default App;
