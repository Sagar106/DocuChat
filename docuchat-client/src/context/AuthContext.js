import { useContext } from "react";
import { createContext } from "react";

const AuthContext = createContext()

export const useAuth = () => {
    useContext(AuthContext)
}

export const AuthProvider = () => {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(null)
}