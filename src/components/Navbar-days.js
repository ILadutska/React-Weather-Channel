import React from "react"
//import { Link } from "react-router-dom"
import '../AppContext.js';

function NavbarDays({onDaySelect}) {

	return (
		<div className="navbar-days">
			<ul className="navbar-days">
            <li><a href="#" onClick={() => onDaySelect(0)}>Today</a></li>
				<li><a href="#" onClick={() => onDaySelect(2)}>Tomorrow</a></li>
				<li><a href="#" onClick={() => onDaySelect(4)}>2 Days</a></li>
				<li><a href="#" onClick={() => onDaySelect(6)}>3 Days</a></li>
				<li><a href="#" onClick={() => onDaySelect(8)}>4 Days</a></li>
				<li><a href="#" onClick={() => onDaySelect(10)}>5 Days</a></li>
			</ul>
		</div>
	)
}

export default NavbarDays