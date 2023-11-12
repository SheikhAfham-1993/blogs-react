import axios from 'axios';
import Form from '../components/Form';
import { currentUserData } from '../util/signals';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Register = () => {
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
                `${process.env.REACT_APP_API_URL}/users/register`,
                body
            );
            if (response.status === 200) {
                navigate('/login');
            }
        } catch (err) {
            if (err.response.status === 409) {
                toast.error(err.response.data.message, { theme: 'colored' });
            }
            currentUserData.value = null;
        }
    };
    return <Form formName={'Register'} onSubmit={onSubmit} />;
};

export default Register;
