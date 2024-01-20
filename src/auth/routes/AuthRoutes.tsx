import { Navigate, Route, Routes } from "react-router-dom"
import { AuthLayout } from "../layouts/AuthLayout"
import { LoginPage } from "../pages/LoginPage"
import { ForgotPasswordPage } from "../pages/ForgotPasswordPage"
import { ResetPassword } from "../pages/ResetPassword"


export const AuthRoutes = () => {
    return (
        <AuthLayout>
            <Routes>
                <Route path="/login" element={<LoginPage />} />
                <Route path="/forgot-password" element={<ForgotPasswordPage />} />
                <Route path="/reset-password/:token" element={<ResetPassword />} />
                <Route path="/*" element={<Navigate to="/login" replace />} />
            </Routes>
        </AuthLayout>
    )
}
