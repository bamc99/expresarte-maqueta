import { Route, Routes } from "react-router-dom"
import { EditUserAccountPage } from "../pages/users/edit/EditUserAccountPage"
import { EditUserProfilePage } from "../pages/users/edit/EditUserProfilePage"

export const UserRoutes = () => {
  return (
    <Routes>
      <Route path="profile/:userId" element={<EditUserProfilePage />} />
      <Route path="account/:userId" element={<EditUserAccountPage />} />
    </Routes>
  )
}
