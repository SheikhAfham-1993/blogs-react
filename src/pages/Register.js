import axios from 'axios';
import Form from '../components/Form';
import { currentUserData } from '../util/signals';
import { useNavigate } from 'react-router-dom';

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
                'http://localhost:4000/users/register',
                body
            );

            currentUserData.value = response.data.result;
            navigate('/');
        } catch (err) {
            currentUserData.value = null;
        }
    };
    return <Form formName={'Register'} onSubmit={onSubmit} />;
};

export default Register;
