import { DashboardRoutes } from "../dashboard/routes/DashboardRoutes";
import { AuthRoutes } from "../auth/routes/AuthRoutes";
import { AuthContext } from "../auth/context/AuthContext";
import { useContext } from "react";

export const PrivateRoute = () => {
    const { auth } = useContext(AuthContext);
    if (!auth) {
        return <AuthRoutes />;
    }else{
        return <DashboardRoutes />
         
    }
}
