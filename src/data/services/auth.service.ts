import { jwtDecode } from "../../components/auth/utils";
import axios from "../axios";
const controller='https://localhost:58030/api/LogIn'

export const signin = async (name: string, password: string) => {
    console.log('signin')
    const response = await axios.post<string>(`${controller}/SignIn`, { name, password })
    console.log('אחרי האקסיוס, ממש לפני ההחזרה, הרספונס היא', response)
    const token = response.data
    const decodedToken = jwtDecode(token) as { [key: string]: any }
    console.log(decodedToken)
    const roleClaimKey = "http://schemas.microsoft.com/ws/2008/06/identity/claims/role";
    const role = decodedToken[roleClaimKey];
    console.log('Role:', role);

    return { token, role };
};
