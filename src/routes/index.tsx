
import { BrowserRouter } from "react-router";
import { AuthRoutes } from "./auth-routes";
import { AccountRoutes } from "./account-routes";
import { useAuth } from "../hooks/useAuth";

export function Routes() {
    const { isLoggedIn } = useAuth();

    return (
        <BrowserRouter>
            {isLoggedIn ? <AccountRoutes /> : <AuthRoutes />}
        </BrowserRouter>
    );
}