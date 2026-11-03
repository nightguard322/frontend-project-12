import { useAuthStore } from "../features/auth/useAuthStore"
import { Navigate } from "react-router-dom"

export default ({ children }) => {
    const token = useAuthStore((state) => state.token)

    if (!token) return <Navigate to="/Login"/>

    return children
}