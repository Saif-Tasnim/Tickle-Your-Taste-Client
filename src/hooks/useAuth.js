import { getAuth } from "firebase/auth"
import { app } from "../utlis/firebase.config"

export const useAuth = () => {
    const auth = getAuth(app);
    return auth;
}