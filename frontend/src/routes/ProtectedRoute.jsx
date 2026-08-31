import useAuthStore from "../features/auth/useAuthStore"

export default ({ children }) => {
    const token = useAuthStore((state) => state.token)

    if (!token) return <Navigate to="/Login"/>

    return children
}