import React from "react"
import { Link } from "react-router-dom"

function Navbar() {
	return (
		<div className="navbar">
			<ul className="navbar">
				<li><Link to="/">Home</Link></li>
				<li><Link to="/news">Local News</Link></li>
				<li><a href="/data">Historical Data</a></li>
				<li><Link to="/advisory">Daily Advisory</Link></li>
				<li><a href="/about">About us</a></li>
				<li><a href="/API">Link to API</a></li>
			</ul>
		</div>
	)
}

export default Navbar
