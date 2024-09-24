import {useEffect, useState} from "react";

function AuthContextProvider({ children }) {
    const [authState, setAuthState] = useState({
        user: null,
        status: 'pending',
    })

    useEffect(() => {
        // check of er nog een token in Local Storage staat
        // ZO JA: haal dan de nieuwe data op en zet deze in de state:
        setAuthState({
            user: {
                id: 2,
                username: 'Test_User_2',
                password: 'ExamplePassword2',
                roles: ['ROLE_USER'],
            },
            status: 'done',
        });

        // ZO NEE:
        setAuthState({
            user: null,
            status: 'done',
        });

    }, []);

    const login = (userData) => {
        setAuthState({
            user: userData,
            status: 'done',
        });
    };

    const logout = () => {
        setAuthState({
            user: null,
            status: 'done',
        });
    };

    const data = {
        ...authState,
        login: login,
        logout: logout,
    };

    return (
        <AuthContext.Provider value={data}>
            {authState.status === 'pending'
                ? <p>Loading...</p>
                : children
            }
        </AuthContext.Provider>
    );
}

export default AuthContextProvider;