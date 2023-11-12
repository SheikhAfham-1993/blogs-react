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
            body['author'] = currentUserData.value.name;
        }

        try {
            const response = await axios.post(
                'http://localhost:4000/blogs/create',
                body
            );

            if (response.status === 200) {
                toast.success(response.data.message, { theme: 'colored' });
                navigate('/');
            }
        } catch (err) {
            toast.error(err.response.data.message, { theme: 'colored' });
            console.log(err);
        }
    };
    return (
        <div className="w-full flex justify-center h-full">
            <div className="h-full flex flex-col w-full max-w-full md:max-w-5xl lg:max-w-4xl p-5">
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
        </div>
    );
};

export default CreateNewPost;
