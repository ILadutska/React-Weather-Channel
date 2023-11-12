import React from "react"
import { Link } from "react-router-dom"

function Navbar() {
	return (
		<div className="navbar">
			<ul className="navbar">
				<li><Link to="/React-Weather-Channel">Home</Link></li>
				<li><Link to="/React-Weather-Channel/news">Local News</Link></li>
				<li><Link to="/React-Weather-Channel/data">Historical Data</Link></li>
				<li><Link to="/React-Weather-Channel/advisory">Daily Advisory</Link></li>
				<li><Link to="/React-Weather-Channel/about">About us</Link></li>
				<li><Link to="/React-Weather-Channel/API">Link to API</Link></li>
			</ul>
		</div>
	)
}

export default Navbar