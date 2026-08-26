import useAuthStore from "../features/auth/useAuthStore"

export default ({ children }) => {
    const { token } = useAuthStore()

    if (!token) return <Navigate to="/Login"/>

    return children
}