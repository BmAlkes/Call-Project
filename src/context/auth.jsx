import { useState, createContext, useEffect } from "react";
import { auth, db } from "../config/dbfirebase";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { toast } from "react-toastify";
import { createUserWithEmailAndPassword } from "firebase/auth";

export const AuthContext = createContext({});

// eslint-disable-next-line react/prop-types
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loadingAuth, setLoadingAuth] = useState(false);

  const signIn = (email, password) => {
    console.log(email, password);
  };

  async function signUp(email, password, name) {
    setLoadingAuth(true);
    console.log(email, password, name);
    await createUserWithEmailAndPassword(auth, email, password)
      .then(async (value) => {
        let uid = value.user.uid;

        await setDoc(doc(db, "users", uid), {
          nome: name,
          avatarUrl: null,
          email,
        }).then(() => {
          let data = {
            uid: uid,
            nome: name,
            email: value.user.email,
            avatarUrl: null,
          };

          setUser(data);

          setLoadingAuth(false);
        });
      })
      .catch((error) => {
        console.log(error);
        setLoadingAuth(false);
      });
  }
  return (
    <AuthContext.Provider
      value={{
        signed: !!user,
        user,
        signIn,
        signUp,
        loadingAuth,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
