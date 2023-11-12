import axios from 'axios';
import Form from '../components/Form';
import { useNavigate } from 'react-router-dom';
import { currentUserData } from '../util/signals';
import { toast } from 'react-toastify';

const Login = () => {
    const navigate = useNavigate();
    const onSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const body = {};
        for (var [key, value] of formData.entries()) {
            body[key] = value;
        }
        try {
            const response = await axios.post(
                `${process.env.REACT_APP_API_URL}/users/login`,
                body,
                { withCredentials: true }
            );
            if (response.status === 200) {
                navigate('/');
            }
        } catch (err) {
            currentUserData.value = null;
            toast.error(err.response.data.message, { theme: 'colored' });
        }
    };
    return <Form formName={'Login'} onSubmit={onSubmit} />;
};

export default Login;
