import { Outlet } from 'react-router-dom';
import Navigation from './Navigation';

const RootLayout = () => {
    return (
        <div className="h-full flex flex-col">
            <Navigation />
            <Outlet />
        </div>
    );
};

export default RootLayout;
