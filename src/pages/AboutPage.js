import React from "react"
import Navbar from '../components/Navbar'

function AboutPage() {

	const AboutStyle = {
		backgroundSize: 'cover',
		backgroundRepeat: 'no-repeat',
		height: '100vh',
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: "grey"
	};

	return (

		<div style={AboutStyle}>
			<div>
				<Navbar></Navbar>
				<div className="logo">About</div>
			</div>
		</div>
	)
}

export default AboutPage
