import { jwtDecode } from 'jwt-decode';
import { useEffect, useState } from 'react';
const useUserData = () => {
    const [userData, setUserData] = useState(undefined);
    useEffect(() => {
        if (localStorage.getItem('token')) {
            const token = localStorage.getItem('token');
            const decoded = jwtDecode(token);
            setUserData(decoded);
        }
    }, []);

    return userData;
};

export default useUserData;
