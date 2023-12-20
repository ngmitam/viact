import { createContext, useContext, useMemo, useState } from "react";

const AuthContext = createContext<any>(null);
const AuthActionsContext = createContext<any>(null);

export const useAuth = () => {
	const context = useContext(AuthContext);
	if (!context) {
		throw new Error("useAuth must be used within a AuthProvider");
	}
	return context;
};

export const useAuthActions = () => {
	const context = useContext(AuthActionsContext);
	if (!context) {
		throw new Error("useAuthActions must be used within a AuthProvider");
	}
	return context;
};

const AuthProvider = ({ children }: any) => {
	const [accessToken, setAccessToken] = useState<any>(null);

	return (
		<AuthContext.Provider
			value={useMemo(
				() => ({
					accessToken,
				}),
				[accessToken]
			)}
		>
			<AuthActionsContext.Provider
				value={useMemo(() => ({ setAccessToken }), [setAccessToken])}
			>
				{children}
			</AuthActionsContext.Provider>
		</AuthContext.Provider>
	);
};

export default AuthProvider;
