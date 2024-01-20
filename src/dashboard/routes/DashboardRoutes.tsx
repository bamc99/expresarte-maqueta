import { Navigate, Route, Routes } from 'react-router-dom';
import { HomePage } from '../pages/HomePage';
import { DashboardLayout } from '../layouts/DashboardLayout';

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
        </Routes>
      </DashboardLayout>
    </>
  )
}
