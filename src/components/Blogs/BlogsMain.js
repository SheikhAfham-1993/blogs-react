import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { blogs, currentUserData } from '../../util/signals';
import { Link } from 'react-router-dom';
import { PlusIcon } from 'lucide-react';
import Blogs from './Blogs';

const BlogsMain = () => {
    const [filteredBlogs, setFilteredBlogs] = useState(blogs.value);
    console.log(process.env.REACT_APP_API_URL);
    useEffect(() => {
        axios
            .get(`${process.env.REACT_APP_API_URL}/blogs/getAll`)
            .then((result) => {
                blogs.value = result.data;
                setFilteredBlogs(result.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    return (
        <div className="w-full">
            <div className="grid grid-cols-1 lg:grid-cols-6 w-full space-x-0 lg:space-x-2 space-y-2 lg:space-y-0">
                <div className="col-span-5">
                    <input
                        onChange={(e) => {
                            setFilteredBlogs(
                                blogs.value.filter((blog) => {
                                    return blog.title
                                        .toLowerCase()
                                        .includes(e.target.value.toLowerCase());
                                })
                            );
                        }}
                        placeholder="Search blogs"
                        type="text"
                        className="p-2 rounded-lg w-full border border-gray-400 focus:outline-none focus:border-blue-500 focus:ring focus:ring-blue-300"
                    />
                </div>

                {currentUserData.value && (
                    <Link to="/createpost">
                        <div className="col-span-1 flex justify-start h-full">
                            <button className="cursor-pointer bg-gray-500 hover:bg-gray-600 transition-all  text-white pl-2 pr-3 py-2 rounded-lg">
                                <span className="flex gap-x-1 items-center text-sm">
                                    <PlusIcon className="w-5 h-5 inline-block" />{' '}
                                    Create a blog
                                </span>
                            </button>
                        </div>
                    </Link>
                )}
            </div>

            <Blogs blogs={filteredBlogs} />
        </div>
    );
};

export default BlogsMain;
