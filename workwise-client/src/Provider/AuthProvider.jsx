import {
    GithubAuthProvider,
    GoogleAuthProvider,
      createUserWithEmailAndPassword,
      onAuthStateChanged,
      signInWithEmailAndPassword,
      signInWithPopup,
      signOut,
    } from "firebase/auth";
    import { createContext, useEffect, useState } from "react";
import auth from "../Firebase/firebase.config";
    
    
    export const AuthContext = createContext(null);
    const googleProvider = new GoogleAuthProvider();
    const gitHubProvider = new GithubAuthProvider();
    
    const AuthProvider = ({ children }) => {
      const [profileUpdate, setProfileUpdate] = useState(false)
      const [user, setUser] = useState(null);
      const [loading, setLoading] = useState(true);
    
      const CreateUser = (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password);
      };
    
      const signInUser = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
      }
  
      const googleSignIn = () => {
        setLoading(true);
        return signInWithPopup(auth, googleProvider)
      }
      const gitHubSignIn = () => {
        setLoading(true);
        return signInWithPopup(auth, gitHubProvider)
      }
    
      const SignOutUser = () => {
        setLoading(true);
        return signOut(auth)
      }
    
      useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {

          const userEmail = currentUser?.email || user?.email;
          console.log(userEmail);

          const loggedUser = {email: userEmail}

          setUser(currentUser);
          setLoading(false);
          console.log(currentUser);
          if(currentUser){
            axios.post('http://localhost:3000/jwt', loggedUser, {
              withCredentials: true
            })
            .then( res => {
              console.log("token response", res.data);
            })
          }else {
            axios
              .post("http://localhost:3000/logout", loggedUser, {
                withCredentials: true,
              })
              .then((res) => {
                console.log(res.data);
              });
          }
        });
        return () => {
          unsubscribe();
        };
      }, [profileUpdate, user?.email]);
      const AuthInfo = { user, loading, setProfileUpdate, CreateUser, googleSignIn, gitHubSignIn, signInUser, SignOutUser };
      return (
        <AuthContext.Provider value={AuthInfo}>{children}</AuthContext.Provider>
      );
    };
    
    export default AuthProvider;
    import axios from "axios";