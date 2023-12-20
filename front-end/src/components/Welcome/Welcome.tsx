import "./Welcome.styles.css";

function Welcome() {
	return (
		<div
			className="container"
			style={{
				backgroundImage: "url(auth-bg.png)",
				backgroundSize: "cover",
				backgroundColor: "#0b454f",
			}}
		>
			<h1 style={{ color: "#eb5757" }}>Welcome!</h1>
		</div>
	);
}

export default Welcome;
