import axios from 'axios';
import { useLoaderData } from 'react-router-dom';
import 'react-quill/dist/quill.snow.css';

import parse from 'html-react-parser';

const SingleBlog = () => {
    const singleBlog = useLoaderData();

    if (!singleBlog) {
        return (
            <div className="h-full w-full flex justify-center items-center text-2xl font-bold">
                Oops! The blog you are looking for does not exist
            </div>
        );
    } else {
        return (
            <div className="w-full flex flex-col space-y-3">
                <h1 className="text-3xl font-bold">{singleBlog.title}</h1>
                <p className="text-lg">
                    Author <b>{singleBlog?.author?.name}</b>
                </p>
                <p>
                    Created at{' '}
                    <b>
                        {new Date(singleBlog?.createdAt).toLocaleString(
                            'en-US',
                            {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric'
                            }
                        )}
                    </b>
                </p>
                <p className="text-lg">{singleBlog.content}</p>

                <div classname="ql-editor" style={{ padding: 0 }}>
                    {parse(singleBlog.description)}
                </div>
            </div>
        );
    }
};

export default SingleBlog;

export const getSingleBlogData = async ({ params }) => {
    try {
        const response = await axios.get(
            `${process.env.REACT_APP_API_URL}/blogs/getAllblogs/${params.id}`
        );
        return response.data;
    } catch (err) {
        console.log(err);
        return null;
    }
};
