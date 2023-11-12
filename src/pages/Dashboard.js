import { PlusIcon } from 'lucide-react';
import Blogs from '../components/Blogs';
import { currentUserData } from '../util/signals';
import { useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Dashboard = () => {
    useEffect(() => {
        // verify if user is logged in with token
        axios
            .get('http://localhost:4000/users/verify', {
                withCredentials: true
            })
            .then((result) => {
                currentUserData.value = result.data;
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);
    return (
        <div className="flex-1 flex flex-col items-center w-full">
            <div className="flex flex-col h-full items-start min-w-full lg:min-w-[1000px] lg:max-w-5xl pt-5  space-y-5">
                {currentUserData.value && (
                    <span className="text-2xl">
                        Welcome <b> {currentUserData.value.name}</b>
                    </span>
                )}
                <Blogs />
            </div>
        </div>
    );
};

export default Dashboard;
