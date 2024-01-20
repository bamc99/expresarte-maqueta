import { Route, Routes } from 'react-router-dom'
import { PrivateRoute } from './PrivateRoute'

export const AppRouter = () => {
  return (
    <>
        <Routes>
            <Route path="/*" element={
              <PrivateRoute />
            } />
        </Routes>
    </>
  )
}
