import Auth from "./containers/Auth/Auth";
import "./App.css";
import AuthProvider from "./providers/Auth";

function App() {
	return (
		<div className="App">
			<AuthProvider>
				<Auth />
			</AuthProvider>
		</div>
	);
}

export default App;
