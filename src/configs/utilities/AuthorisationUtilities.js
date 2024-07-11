// Fetch user details from the backend
export const fetchUserDetails = async (token, setUserName, setUserRole) => {
    try {
        const response = await fetch(`/users/userId/${token}`);
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

// Handle user login
export const handleLogin = (setIsLoggedIn, setUserName, setUserRole) => {
    // Here, you would normally get a token from your backend or a login form
    const token = 'your_token_value';
    localStorage.setItem('token', token);
    setIsLoggedIn(true);
    fetchUserDetails(token, setUserName, setUserRole);
};

// Handle user logout
export const handleLogout = (setIsLoggedIn, setUserName, setUserRole) => {
    localStorage.removeItem('token'); // Clear token from local storage
    setIsLoggedIn(false);
    setUserName(''); // Clear userName on logout
    setUserRole('visitor'); // Reset user role to visitor
};
