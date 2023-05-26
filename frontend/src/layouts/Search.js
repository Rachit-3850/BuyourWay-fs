import React , {useState} from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";

const Search = () => {
    const [keyword, setKeyword] = useState('');
	const navigate = useNavigate();
    const searchHandler = (e) => {
        e.preventDefault()
		console.log(keyword);
        if (keyword.trim()) {
			navigate(`/search/${keyword}`)
        } else {
			navigate("/")
        }
    }
	return (
		<form onSubmit={searchHandler}>
			<div class="input-group">
				<input
					type="search"
					class="rounded search form-control"
					placeholder="Search"
					aria-label="Search"
					aria-describedby="search-addon"
                    onChange={(e) => setKeyword(e.target.value)}
				/>
				<button type="button" class="btn search-btn">
					search
				</button>
			</div>
		</form>
	);
};

export default Search;
