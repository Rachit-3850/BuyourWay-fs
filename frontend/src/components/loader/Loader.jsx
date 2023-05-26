import React from "react";
import "./loader.css";

import { InfinitySpin } from "react-loader-spinner";

const Loader = () => {
	return (
		<div className="loader">
			<InfinitySpin width="200" color="#FF4B8B" />
		</div>
	);
};

export default Loader;
