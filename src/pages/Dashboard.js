import { PlusIcon } from 'lucide-react';
import Blogs from '../components/Blogs';
import { currentUserData } from '../util/signals';

const Dashboard = () => {
    return (
        <div className="flex-1 flex flex-col items-center w-full">
            <div className="flex flex-col h-full items-start max-w-full md:max-w-5xl lg:max-w-4xl py-5 px-5 space-y-5">
                {currentUserData.value && (
                    <span className="text-2xl">
                        Welcome <b> {currentUserData.value.name}</b>
                    </span>
                )}
                <div className="grid grid-cols-1 lg:grid-cols-6 w-full space-x-0 lg:space-x-2 space-y-2 lg:space-y-0">
                    <div className="col-span-5">
                        <input
                            type="text"
                            className="p-2 rounded-lg w-full border border-gray-400 focus:outline-none focus:border-blue-500 focus:ring focus:ring-blue-300"
                        />
                    </div>

                    <div className="col-span-1 flex justify-end">
                        <button className="cursor-pointer bg-gray-500 hover:bg-gray-600 transition-all h-full text-white pl-2 pr-3 py-2 rounded-lg">
                            <span className="flex gap-x-1 items-center text-sm">
                                <PlusIcon className="w-5 h-5 inline-block" />{' '}
                                Create a blog
                            </span>
                        </button>
                    </div>
                </div>

                <Blogs />
            </div>
        </div>
    );
};

export default Dashboard;
