import React, { createContext, useState } from 'react';

export const UserContext = createContext();

export const UserContextProvider = ({ children }) => {
    // Default user state, you can modify this as needed.
    const [user, setUser] = useState ({
        teacher_id: null,
        first_name: null,
        last_name: null,
        phone: null,
        email: null
    });

    // Function to update the user data
    const updateUser = (newUserData) => {
        setUser((prevUser) => ({
            ...prevUser,
            ...newUserData,
        }));
    };

    return (
        <UserContext.Provider value={{ user, updateUser }}>
            {children}
        </UserContext.Provider>
    );
};