import { createContext , useContext , useEffect, useState } from "react"
import { auth, db } from "./firebaseConfig"
import { collection, getDocs, query, where } from "firebase/firestore";


const userAuthContext = createContext();

export function UserContextProvider({children}){
    function GetCurrentUser(){
        const [user, setuser] = useState("")
        const userCollection = collection(db,"users");

        useEffect(()=>{
            auth.onAuthStateChanged(userLogged=>{
                if(userLogged){
                    const getUsers = async ()=>{
                        const q= query(userCollection,where("uid","==",userLogged.uid))
                        // console.log(q);
                        const data = await getDocs(q);
                        setuser(data.docs.map((doc)=>({...doc.data(),id: doc.id})))
                    }
                    getUsers();
                }
                else{
                    setuser(null);
                }
            })
        },[])
        return user;
    }
    const loggedUser = GetCurrentUser();
    // console.log(loggedUser)

   
    



    return(
        <userAuthContext.Provider value={{loggedUser}}>
            {children}
        </userAuthContext.Provider>
    
    )
}

export function useUserAuth(){
    return useContext(userAuthContext);
}

