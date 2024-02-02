import { Route, Routes } from "react-router-dom"
import { EditClientProfilePage } from "../pages/clients/edit/EditClientProfilePage"
import { EditClientAccountPage } from "../pages/clients/edit/EditClientAccountPage"

export const ClientRoutes = () => {
  return (
    <Routes>
      <Route path="account/:clientId" element={<EditClientAccountPage />} />
      <Route path="profile/:clientId" element={<EditClientProfilePage />} />
    </Routes>
  )
}
