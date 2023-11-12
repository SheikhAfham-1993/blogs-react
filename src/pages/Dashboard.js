import BlogsMain from '../components/Blogs/BlogsMain';
import { currentUserData } from '../util/signals';

const Dashboard = () => {
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
