export const isLoggedIn = () => {
    const token = localStorage.getItem('authToken');
    const userData = localStorage.getItem('userData');
    return token && userData;
}


