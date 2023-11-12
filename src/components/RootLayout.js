import { Outlet } from 'react-router-dom';
import Navigation from './Navigation';

const RootLayout = () => {
    return (
        <div className="h-full flex flex-col">
            <Navigation />
            <div className="flex-1 flex flex-col items-center w-full">
                <div className="flex flex-col h-full items-start min-w-full lg:min-w-[1000px] lg:max-w-5xl pt-5 px-5 space-y-5">
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default RootLayout;
