import axios from "axios";
import { useContext, useEffect } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import { useNavigate } from "react-router-dom";

const axiosSecure = axios.create({
    baseURL: "https://workwise-server.vercel.app",
    withCredentials: true,
})


const useAxiosSecure = () => {
     const {SignOutUser} = useContext(AuthContext)
     const navigate = useNavigate()
   useEffect(() => {
    axiosSecure.interceptors.response.use(res => {
        return res;
    }, error => {
        if(error.response.status === 400) alert(error.response.data);
        console.log('error tracked in the interceptor', error.response);
        if (error.response.status === 401 || error.response.status === 403) {
            console.log('error tracked in the intercept', error.response);
            SignOutUser()
            .then( () => {
                console.log("Sign-out successful");
                navigate('/login')
            })
            .catch((error) => {
                console.log(error.message);
            });
        }
    }
)
   }, [SignOutUser, navigate])
  
    return axiosSecure;
};

export default useAxiosSecure;