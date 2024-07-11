// Fetch user details from the backend
import api from "./axios/api";

export const fetchUserDetails = async (userId, token, setUserName, setUserRole) => {
    try {
        const response = await api.get(`http://localhost:8080/users/${userId}/${token}`);
        const contentType = response.headers.get("content-type");

        if (!response.ok) {
            throw new Error('User details not found');
        }

        if (!contentType || !contentType.includes("application/json")) {
            const text = await response.text();
            throw new Error(`Unexpected response format: ${text}`);
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


// Handle user login
export const handleLogin = async (setIsLoggedIn, setUserName, setUserRole) => {
    const token = 'token'; // Replace with actual token handling logic
    localStorage.setItem('token', token);
    setIsLoggedIn(true);

    // Replace userId with the actual userId you obtain during login
    const userId = 'user_id_here'; // Replace with actual user ID
    try {
        await fetchUserDetails(userId, token, setUserName, setUserRole);
    } catch (error) {
        console.error('Error handling login:', error);
        // Handle login error if needed
    }
};

// Handle user logout
export const handleLogout = (setIsLoggedIn, setUserName, setUserRole) => {
    localStorage.removeItem('token'); // Clear token from local storage
    setIsLoggedIn(false);
    setUserName(''); // Clear userName on logout
    setUserRole('visitor'); // Reset user role to visitor
};
