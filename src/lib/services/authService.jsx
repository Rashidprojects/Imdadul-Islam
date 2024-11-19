import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../config/firebase";
import { addUserToFirestore } from "./firestoreService";

// Function to log in a user with email and password
export const loginWithEmailAndPassword = async (email, password) => {
  console.log('the fetched email is : ', email + ': pass : ' + password);
  return await signInWithEmailAndPassword(auth, email, password);
};


// New function to register a user with email and password
export const registerWithEmailAndPassword = async (email, password) => {
  console.log('Registering user with email:', email, 'and password:', password);
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    console.log('User registered successfully:', userCredential.user);
    
    const user = userCredential.user;  // This is the user object containing the `uid`
    const userId = user.uid;           // The unique `uid` for the user
    console.log("User registered with UID: ", userId);

    // Now, save the user data to Firestore with userId (uid) as the document ID
    const userData = {
      email: email,  // Store email in Firestore
      // You can add more user data like name, role, etc.
    };
    await addUserToFirestore(userId, userData);

    return userCredential.user; // Return the user object if needed
  } catch (error) {
    console.error('Error registering user:', error);
    throw new Error(error.message); // Throw error to be caught in the calling function
  }
};
