import { Navigate, Route, Routes } from 'react-router-dom';
import { HomePage } from '../pages/HomePage';
import { DashboardLayout } from '../layouts/DashboardLayout';
import { UsersPage } from '../pages/users/UsersPage';
import { BranchesPage } from '../pages/branches/BranchesPage';
import { NewBranchPage } from '../pages/branches/NewBranchPage';
import { NewUserPage } from '../pages/users/NewUserPage';
import { UserRoutes } from './UserRoutes';
import { ClientsPage } from '../pages/clients/ClientsPage';
import { NewClientPage } from '../pages/clients/NewClientPage';
import { ClientRoutes } from './ClientRoutes';

export const DashboardRoutes = () => {

  const layout = localStorage.getItem("react-resizable-panels:layout")
  const collapsed = localStorage.getItem("react-resizable-panels:collapsed")

  const defaultLayout = layout ? JSON.parse(layout) : undefined
  const defaultCollapsed = collapsed ? JSON.parse(collapsed) : undefined

  return (
    <>
      <DashboardLayout
        sucursales={
          [
            {
              id: "1",
              label: "Paseo la fe"
            },
            {
              id: "2",
              label: "San Nicolás"
            },
            {
              id: "3",
              label: "Valle"
            },
          ]
        }
        defaultLayout={defaultLayout}
        defaultCollapsed={defaultCollapsed}
        navCollapsedSize={4}

      >
        <Routes>
          <Route path="/*" element={<Navigate to="/home" replace />} />
          <Route path="home" element={<HomePage />} />
          <Route path="users" element={<UsersPage />} />
          <Route path="users/new" element={<NewUserPage />} />
          <Route path="users/edit/*" element={<UserRoutes />} />
          <Route path="branches" element={<BranchesPage />} />
          <Route path="branches/new" element={<NewBranchPage />} />
          <Route path="clients" element={<ClientsPage />} />
          <Route path="clients/new" element={<NewClientPage />} />
          <Route path="clients/edit/*" element={<ClientRoutes />} />
        </Routes>
      </DashboardLayout>
    </>
  )
}
