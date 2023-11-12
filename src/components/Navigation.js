import { Link } from 'react-router-dom';
import { currentUserData } from '../util/signals';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useEffect } from 'react';

const Navigation = () => {
    const logoutUser = async () => {
        try {
            const response = await axios.post(
                'http://localhost:4000/users/logout',
                null
            );

            if (response.status === 200) {
                toast.success('Logged out successfully', { theme: 'colored' });
                currentUserData.value = null;
            }
        } catch (err) {
            toast.error(err.response.data.message, { theme: 'colored' });
        }
    };
    return (
        <div className=" relative bg-blog opacity-90 bg-center bg-cover space-y-5 flex-none bg-gray-200 dark:bg-gray-800 flex flex-col text-center justify-center px-5 py-5 h-60">
            <div className="absolute top-1 right-2 space-x-2">
                {currentUserData.value ? (
                    <button
                        onClick={logoutUser}
                        className="px-4 py-1 bg-gray-50/80 font-semibold rounded-lg hover:bg-gray-50"
                    >
                        Log out
                    </button>
                ) : (
                    <>
                        <Link to={'/login'}>
                            <button className="px-4 py-1 bg-gray-50/80 font-semibold rounded-lg hover:bg-gray-50">
                                Log in
                            </button>
                        </Link>
                        <Link to={'/register'}>
                            <button className="px-4 py-1 bg-gray-50/80 font-semibold rounded-lg hover:bg-gray-50">
                                Register
                            </button>
                        </Link>
                    </>
                )}
            </div>
            <p className="text-4xl  font-bold text-gray-50">
                Welcome to the Tech blogs
            </p>
            <p className="text-xl font-semibold text-gray-50">
                Here you will find all the mini information related to
                Technology
            </p>
        </div>
    );
};

export default Navigation;
