import RootLayout from './components/RootLayout';
import Dashboard from './pages/Dashboard';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import CreateNewPost from './pages/CreateNewPost';

function App() {
    const router = createBrowserRouter([
        {
            path: '/',
            element: <RootLayout />,
            children: [
                {
                    index: true,
                    element: <Dashboard />
                },
                {
                    path: '/login',
                    element: <Login />
                },
                {
                    path: '/register',
                    element: <Register />
                },
                {
                    path: '/createpost',
                    element: <CreateNewPost />
                }
            ]
        }
    ]);
    return (
        <>
            <ToastContainer theme="colored" />
            <RouterProvider router={router} />
        </>
    );
}

export default App;
