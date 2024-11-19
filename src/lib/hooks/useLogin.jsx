import { useState } from "react";
import { fetchUserEmailByUsername } from "../services/userService"; // Renamed function for clarity
import { loginWithEmailAndPassword } from "../services/authService";
import { useAuth } from "../providers/AuthCOntext";

export const useLogin = (username, password) => {
    const [error, setError] = useState('');
    const { login } = useAuth()
    
    const handleLogin = async () => {
        try {
            setError('');  // Reset error state before attempting login

            // Fetch the email for the provided username from Firestore
            const fetchedEmail = await fetchUserEmailByUsername(username);

            if (!fetchedEmail) {
                setError('Invalid username');
                return;
            }

            // Authenticate the user with the fetched email and provided password
            await loginWithEmailAndPassword(fetchedEmail, password);
            login()

            // Set lastLoginTime in localStorage to current timestamp (in milliseconds)
            const currentTime = Date.now(); // Get the current time in milliseconds
            localStorage.setItem("lastLoginTime", currentTime);

            console.log('User logged in successfully');

        } catch (err) {
            if (err.message === 'Invalid username') {
                setError('Invalid username');
                
            } else if (err.message === 'Firebase: Error (auth/wrong-password).') {
                setError('Incorrect password');
            } else {
                setError('An error occurred. Please try again.');
            }
            console.error(err);  // Log error for debugging
        }
    };

    return { error, handleLogin };
};
