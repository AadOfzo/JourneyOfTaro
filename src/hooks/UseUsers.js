import { useState, useEffect } from 'react';
import api from "../configs/utilities/axios/api";

const UseUsers = (url) => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUsers = async () => {
            setLoading(true);
            try {
                const response = await api.get(url);
                setUsers(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching users:', error);
                setError('Failed to fetch users.');
                setLoading(false);
            }
        };

        fetchUsers();

    }, [url]);

    return { users, loading, error };
};

export default UseUsers;
