// Function to fetch user details from the backend
import ApiService from "./axios/ApiService";

export const fetchUserDetails = async (token, setUserName, setUserRole) => {
    try {
        const response = await ApiService.fetchUserDetails(token);
        if (!response.ok) {
            throw new Error('User details not found');
        }
        const userData = await response.json();
        setUserName(userData.username);
        setUserRole(userData.role);
        return userData;
    } catch (error) {
        console.error('Error fetching user details:', error);
        throw error;
    }
};

// Function to handle user login
export const handleLogin = (setIsLoggedIn) => {
    const token = 'your_token_value'; // Replace with actual token value
    localStorage.setItem('token', token);
    setIsLoggedIn(true);
};

// Function to handle user logout
export const handleLogout = (setIsLoggedIn, setUserName, setUserRole) => {
    localStorage.removeItem('token'); // Clear token from local storage
    setIsLoggedIn(false);
    setUserName(''); // Clear userName on logout
    setUserRole('visitor'); // Reset user role to visitor
};
