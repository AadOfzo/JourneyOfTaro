// Function to fetch user details from the backend
export const fetchUserDetails = async (token, setUserName, setUserRole) => {
    try {
        const response = await fetch(`/users/apikey/${token}`); // Adjust endpoint as per your API
        if (!response.ok) {
            throw new Error('User details not found');
        }
        const userData = await response.json();
        setUserName(userData.username); // Update userName from fetched data
        setUserRole(userData.role); // Update userRole from fetched data
        return userData;
    } catch (error) {
        console.error('Error fetching user details:', error);
        // Handle error conditionally based on your application's requirements
        throw error; // Rethrow error to handle it in the caller function
    }
};

// Function to handle user login
export const handleLogin = (setIsLoggedIn) => {
    setIsLoggedIn(true);
    localStorage.setItem('token', 'your_token_value'); // Set token in local storage
};

// Function to handle user logout
export const handleLogout = (setIsLoggedIn, setUserName, setUserRole) => {
    localStorage.removeItem('token'); // Clear token from local storage
    setIsLoggedIn(false);
    setUserName(''); // Clear userName on logout
    setUserRole('visitor'); // Reset user role to visitor
};
