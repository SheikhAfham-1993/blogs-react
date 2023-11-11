import axios from 'axios';
import Form from '../components/Form';

const Login = () => {
    const onSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const body = {};
        for (var [key, value] of formData.entries()) {
            body[key] = value;
        }
        console.log(body);

        const response = await axios.post('http://localhost:4000/users/login', {
            headers: {
                'Content-Type': 'application/json'
            },
            body: body
        });

        console.log(response);
    };
    return <Form formName={'Login'} onSubmit={onSubmit} />;
};

export default Login;
