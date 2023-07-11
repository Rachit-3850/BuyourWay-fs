import React from "react";
import "./Footer.css";
import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookIcon from "@mui/icons-material/Facebook";
import YouTubeIcon from "@mui/icons-material/YouTube";
import TwitterIcon from "@mui/icons-material/Twitter";
import waves from "./wave.svg";

const Footer = () => {
	return (
		<div className="d-flex flex-wrap flex-col justify-content-center w-100">
			<img src={waves} alt="waves" className="w-100" />
			<div className="footer-bg w-100">
				<div className="container d-flex flex-wrap">
					<div className="d-flex flex-column align-items-start ">
						<h1 className="heading-name "> <span className="pink">B</span>uyour<span className="pink">W</span>ay</h1>
						<input
							className="py-1 p-2 text-sm bg-white rounded shadow-lg border border-gray-300  mb-3 w-full text-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-200 focus:border-transparent "
							type="email"
							placeholder="Enter your email"
						/>
						<button className=" w-2/4 bg-white text-gray-600 hover:bg-gray-500 hover:text-gray-100 font-semibold py-1 px-1 border border-gray-400 rounded shadow">
							Suscribe
						</button>
					</div>

					<div className="m-5 d-flex flex-column align-items-start">
						<h2 className="font-bold text-xl">Contact Us</h2>
						<div className="">
							<ul className="list-unstyled d-flex flex-column align-items-start">
								<li className="">Phone: 7007944905</li>
								<li className="">Email: buyourWay@gmail.com</li>
								<li className="">Address: 4/17 triveni nagar cantt , kanpur</li>
							</ul>
						</div>
					</div>

					{/* {} */}
					<div className="d-flex flex-column m-5 justify-content-center ">
						<p className="yt">
							<a href="https://www.youtube.com/" className="  px-3 py-2">
								<YouTubeIcon fontSize="large" sx={{ color: "black" }} />
							</a>

							<a href="https://www.facebook.com/" className=" px-3 py-2 ">
								<FacebookIcon fontSize="large" sx={{ color: "black" }} />
							</a>

							<a href="http://www.instagram.com/" className="px-3 py-2">
								<InstagramIcon fontSize="large" sx={{ color: "black" }} />
							</a>

							<a href="https://wwww.twitter.com" className=" px-3 py-2 ">
								<TwitterIcon fontSize="large" sx={{ color: "black" }} />
							</a>
						</p>
					</div>
				</div>
				<div className="text-center   bg-pink-300 w-full">
					Copyright © Rachit Gupta All Rights Reserved
				</div>
			</div>
		</div>
	);
};

export default Footer;
