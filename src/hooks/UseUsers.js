import React, {useState, useEffect} from 'react';
import axios from 'axios';
const UseUsers = (url) => {

    const [users, setUsers] = useState([]);

    useEffect(() => {
        async function fetchUsers() {
            try {
                const response = await axios.get(url);
                // Plaats alle users in de state zodat we het op de pagina kunnen gebruiken
                setUsers(response.data);
                console.log(response.data);
            } catch(e) {
                console.error(e);
            }
        }
        void fetchUsers()
    }, []);
    return { users }
};

export default UseUsers;