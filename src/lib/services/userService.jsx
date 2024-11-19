import { query, where, getDocs, collection } from "firebase/firestore";
import { db } from "../../config/firebase";

// Function to fetch user email from Firestore using the username
export const fetchUserEmailByUsername = async (username) => {
    try {
        // Query Firestore for a document where the username matches the provided username
        const q = query(collection(db, "users"), where("username", "==", username));
        const querySnapshot = await getDocs(q);
        
        if (querySnapshot.empty) {
            throw new Error('Invalid username'); // No user found with that username
        }

        // Assuming only one document for a username (since username should be unique)
        const userDoc = querySnapshot.docs[0];
        return userDoc.data().email; // Return the email stored in Firestore
    } catch (err) {
        console.error('Error fetching user email:', err);
        throw new Error(err.message || 'Error fetching user email');
    }
};
