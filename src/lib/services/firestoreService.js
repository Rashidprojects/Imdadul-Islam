import { setDoc, doc, addDoc, collection, getDocs, deleteDoc, query, orderBy } from "firebase/firestore";
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

export const initializeCounter = async () => {
    try {
        await setDoc(doc(db, "counters", "fundCollectionCounter"), { value: 0 });
        console.log("Counter initialized successfully");
    } catch (error) {
        console.error("Error initializing counter:", error);
    }
};

// Service function to submit data
export const submitFundData = async (data) => {
    try {
      const fundCollection = collection(db, "fundCollectionData");
  
      // Query to fetch the highest siNo
      const fundQuery = query(fundCollection, orderBy("siNo", "desc"));
      const querySnapshot = await getDocs(fundQuery);
  
      // Determine the new siNo
      const highestSiNo = querySnapshot.docs.length > 0 
        ? querySnapshot.docs[0].data().siNo 
        : 0;
      const newSiNo = highestSiNo + 1;
  
      // Add new document with the calculated siNo
      await addDoc(fundCollection, { ...data, siNo: newSiNo });
  
      console.log(`Document added successfully with siNo: ${newSiNo}`);
      return newSiNo;
    } catch (error) {
      throw new Error("Error adding document: " + error.message);
    }
  };

// Function to fetch data from the fundCollectionData collection
export const fetchFundData = async () => {
    try {
      const fundQuery = query(collection(db, "fundCollectionData"), orderBy("siNo", "asc"));
      const querySnapshot = await getDocs(fundQuery);
  
      const data = querySnapshot.docs.map((doc) => ({
        id: doc.id, // Include document ID
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
