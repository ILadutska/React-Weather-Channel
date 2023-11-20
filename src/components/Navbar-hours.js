import React from "react"
//import { Link } from "react-router-dom"
import '../AppContext.js';

function NavbarHours({onHourSelect}) {

	return (
		<div className="navbar-hours">
			<ul className="navbar-hours">
				<li><a href="#" onClick={() => onHourSelect(6)}>6 hours</a></li>
				<li><a href="#" onClick={() => onHourSelect(12)}>12 hours</a></li>
				<li><a href="#" onClick={() => onHourSelect(18)}>18 hours</a></li>
				<li><a href="#" onClick={() => onHourSelect(24)}>24 hours</a></li>
				<li><a href="#" onClick={() => onHourSelect(155)}>155 hours</a></li>
			</ul>
		</div>
	)
}

export default NavbarHours
