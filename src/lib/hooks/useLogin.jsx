import { useState } from "react";
import { loginWithEmailAndPassword } from "../services/authService";
import { fetchUserUidByUsername, fetchUserEmailByUid } from "../services/userService";
import { useAuth } from "../providers/AuthCOntext";

export const useLogin = (username, password) => {
    const [error, setError] = useState('');
    const { login } = useAuth();

    const handleLogin = async () => {
        try {
            setError('');  // Reset error state before attempting login

            console.log('username will : ', username);

            // Step 1: Fetch the UID based on the username
            const userId = await fetchUserUidByUsername(username);
            console.log('username : ', username);
            console.log('uid is : ', userId);
            
            if (!userId) {
                setError('Invalid username');
                return;
            }

            // Step 2: Fetch the email using the UID
            const fetchedEmail = await fetchUserEmailByUid(userId);

            if (!fetchedEmail) {
                setError('Error fetching user email');
                return;
            }

            // Step 3: Authenticate the user with the fetched email and provided password
            await loginWithEmailAndPassword(fetchedEmail, password);
            login();

            // Set lastLoginTime in localStorage to current timestamp (in milliseconds)
            const currentTime = Date.now();
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
