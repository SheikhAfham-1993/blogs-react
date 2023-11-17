import { useEffect } from 'react';
import BlogsMain from '../components/Blogs/BlogsMain';
import useUserData from '../hooks/useUserData';
import { currentUserData } from '../util/signals';

const Dashboard = () => {
    const userData = useUserData();
    useEffect(() => {
        if (userData) currentUserData.value = userData;
    }, [userData]);
    return (
        <>
            {currentUserData?.value && (
                <span className="text-2xl">
                    Welcome <b> {currentUserData?.value?.name}</b>
                </span>
            )}
            <BlogsMain />
        </>
    );
};

export default Dashboard;
