import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import InputWithLabels from '../components/UI/InputWithLabel';
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { currentUserData } from '../util/signals';

const modules = {
    toolbar: [
        [{ header: [1, 2, false] }],
        ['bold', 'italic', 'underline', 'strike', 'blockquote'],
        [
            { list: 'ordered' },
            { list: 'bullet' },
            { indent: '-1' },
            { indent: '+1' }
        ],
        ['link'],
        ['clean']
    ]
};

const formats = [
    'header',
    'bold',
    'italic',
    'underline',
    'strike',
    'blockquote',
    'list',
    'bullet',
    'indent',
    'link'
];

const CreateNewPost = () => {
    const navigate = useNavigate();
    const [description, setDescription] = useState('');
    const createPost = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const body = {};
        for (var [key, value] of formData.entries()) {
            body[key] = value;
        }

        if (description) {
            body['description'] = description;
        }

        if (currentUserData.value) {
            body['author'] = currentUserData.value.userId;
        }

        try {
            const token = localStorage.getItem('token');
            if (token) {
                axios.defaults.headers.common[
                    'Authorization'
                ] = `Bearer ${token}`;
            }
            const response = await axios.post(
                `${process.env.REACT_APP_API_URL}/blogs/create`,
                body
            );

            if (response.status === 200) {
                toast.success(response.data.message, { theme: 'colored' });
                navigate('/');
            }
        } catch (err) {
            if (err.response.status === 401) {
                toast.error(err.response.data.message, { theme: 'colored' });
                navigate('/login');
            }
            toast.error(err.response.data.message, { theme: 'colored' });
            console.log(err);
        }
    };
    return currentUserData.value ? (
        <div className="w-full">
            <div className="text-2xl font-bold">Create New Post</div>
            <form onSubmit={createPost} className="h-full flex flex-col">
                <InputWithLabels
                    labelName={'Title'}
                    labelfor={'title'}
                    type={'text'}
                />
                <InputWithLabels
                    labelName={'Content'}
                    labelfor={'content'}
                    type={'text'}
                />
                <div className="mt-4">
                    <ReactQuill
                        modules={modules}
                        formats={formats}
                        value={description}
                        onChange={setDescription}
                    />
                </div>

                <button className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-lg mt-5">
                    Create post
                </button>
            </form>
        </div>
    ) : (
        <div className="w-full h-full flex items-center justify-center">
            <div className="text-2xl font-bold">
                Please login to create a post
            </div>
        </div>
    );
};

export default CreateNewPost;
