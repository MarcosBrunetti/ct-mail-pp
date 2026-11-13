import { Routes, Route, Navigate } from "react-router"
import { SendEmail } from "../pages/SendEmail"
import { AccountLayout } from "../components/AccountLayout"

export function AccountRoutes(){
    return(
        <Routes>
            <Route element={<AccountLayout />}>
                <Route index element={<Navigate to="/send-email" replace />} />
                <Route path="/send-email" element={<SendEmail />} />
            </Route>
        </Routes>
    )
}