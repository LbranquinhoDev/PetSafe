import React, { createContext, useContext, useState, useEffect, use } from 'react';

const AuthContext = createContext();
 
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

}

useEffect(() => {
    const user = localStorage.getItem('user');
    if (user) {
        setUser(JSON.parse(user));
    }
    setLoading(false);
}, []);

const login = (email, password) => {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find(u => u.email === email && u.password === password);
}

if (user) {
    const {password, ...userWithoutPassword} = user;
    setCurrentUser(userWithoutPassword);
    localStorage.setItem('user', JSON.stringify(userWithoutPassword));
    return ({ success: true });}

return ({ success: false, message: 'Email ja Usado/Cadastrado' });

users.push(userData);
localStorage.setItem('users', JSON.stringify(users));

const { password, ...userWithoutPassword } = userData;
setCurrentUser(userWithoutPassword);
localStorage.setItem('CurrentUser', JSON.stringify(userWithoutPassword));

return { success: true };

const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem('CurrentUser');
}
const value = {
    currutentUser,
    login,
    register,
    logout,
    loading,
};

return (
    <AuthContext.Provider value={value}>
        {!loading && children}
    </AuthContext.Provider>
);