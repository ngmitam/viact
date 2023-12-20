import Login from "../../components/Login/Login";
import Welcome from "../../components/Welcome/Welcome";
import { useAuth } from "../../providers/Auth";

function Auth() {
	const { accessToken } = useAuth();
	return accessToken ? <Welcome /> : <Login />;
}

export default Auth;
