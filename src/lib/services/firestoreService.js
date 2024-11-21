import { setDoc, doc, addDoc, collection, getDocs, deleteDoc } from "firebase/firestore";
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

// Service function to submit data
export const submitFundData = async (data) => {
    try {
        const docRef = await addDoc(collection(db, "fundCollectionData"), data);
        return docRef.id; // Returning the document ID (if needed)
    } catch (error) {
        throw new Error("Error adding document: " + error.message);
    }
};

// Function to fetch data from the fundCollectionData collection
export const fetchFundData = async () => {
    try {
        const querySnapshot = await getDocs(collection(db, "fundCollectionData"));
        const data = querySnapshot.docs.map((doc) => ({
            id: doc.id, // Add document ID if needed
            ...doc.data(),
        }));
        return data;
    } catch (error) {
        throw new Error("Error fetching fund data: " + error.message);
    }
};

// Function to update data in the fundCollectionData collection
export const updateFundData = async (id, updatedData) => {
    try {
        await setDoc(doc(db, 'fundCollectionData', id), updatedData);
        console.log("Document updated successfully");
    } catch (error) {
        throw new Error("Error updating document: " + error.message);
    }
};

// Function to delete data from the fundCollectionData collection
export const deleteFundData = async (id) => {
    try {
        await deleteDoc(doc(db, 'fundCollectionData', id));
        console.log("Document deleted successfully");
    } catch (error) {
        throw new Error("Error deleting document: " + error.message);
    }
};
