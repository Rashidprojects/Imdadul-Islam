import { setDoc, doc } from "firebase/firestore";
import { db } from "../../config/firebase";

// Function to add user data to Firestore
export const addUserToFirestore = async (uid, userData) => {
    try {
        // Save the user data under the 'users' collection using the user UID as the document ID
        await setDoc(doc(db, 'users', uid), userData);
        console.log('User data saved successfully');
    } catch (error) {
        console.error('Error saving user data to Firestore:', error);
        throw error;  // Rethrow the error to be handled by the caller
    }
};
