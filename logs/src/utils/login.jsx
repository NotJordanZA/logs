import React from "react";
import { db, auth, provider, signInWithPopup, signOut } from "../firebase"; // Adjust path as needed
import { doc, setDoc, getDoc } from "firebase/firestore";


const Auth = () => {
    const handleSignIn = async () => {
        try {
          const result = await signInWithPopup(auth, provider);
          const user = result.user;
    
          console.log("User signed in:", user);
    
          // Check if the user document already exists in Firestore
          const userRef = doc(db, "users", user.uid);
          const userSnapshot = await getDoc(userRef);
    
          if (!userSnapshot.exists()) {
            // Create a new document only if it doesn't exist
            await setDoc(userRef, {
              uid: user.uid,
              displayName: user.displayName || "Anonymous",
              email: user.email || "No email provided",
              createdAt: new Date(),
            });
            console.log("New user document created in Firestore");
          } else {
            console.log("User already exists in Firestore, no changes made.");
          }
        } catch (error) {
          console.error("Error signing in:", error.message);
        }
    };

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      console.log("User signed out");
    } catch (error) {
      console.error("Error signing out:", error.message);
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <button onClick={handleSignIn} >
        Sign in with Google
      </button>
      {/* <button onClick={handleSignOut} style={buttonStyle}>
        Sign Out
      </button> */}
    </div>
  );
};

export default Auth;
