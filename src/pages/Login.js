import axios from 'axios';
import Form from '../components/Form';
import { useNavigate } from 'react-router-dom';
import { currentUserData } from '../util/signals';

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
                body
            );
            if (response.status === 200) {
                currentUserData.value = response.data.user;
                localStorage.setItem('token', response.data.token);
                navigate('/');
            }
        } catch (err) {
            console.log(err);
            currentUserData.value = null;
        }
    };
    return <Form formName={'Login'} onSubmit={onSubmit} />;
};

export default Login;
