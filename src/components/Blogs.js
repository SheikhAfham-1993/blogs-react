import { signal } from '@preact/signals-react';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import BlogsCard from './BlogsCard';
import ReactPaginate from 'react-paginate';
import { blogs, currentUserData } from '../util/signals';
import { Link } from 'react-router-dom';
import { PlusIcon } from 'lucide-react';

const Blogs = () => {
    let itemsPerPage = 4;
    const [itemOffset, setItemOffset] = useState(0);
    const endOffset = itemOffset + itemsPerPage;
    const pageCount = Math.ceil(blogs.value.length / itemsPerPage);
    const [filteredBlogs, setFilteredBlogs] = useState(blogs.value);

    const returnPrevNextTag = (text) => {
        return (
            <div className="px-3 flex items-center justify-center font-semibold hover:text-blue-600 hover:underline">
                {text}
            </div>
        );
    };

    const handlePageClick = (event) => {
        const newOffset = (event.selected * itemsPerPage) % blogs.value.length;
        setItemOffset(newOffset);
    };

    useEffect(() => {
        axios
            .get('http://localhost:4000/blogs/getAll')
            .then((result) => {
                blogs.value = result.data;
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
            {filteredBlogs?.length > itemsPerPage && (
                <div className="flex justify-end w-full mt-5">
                    <ReactPaginate
                        breakLabel=""
                        nextLabel={returnPrevNextTag('Next >')}
                        className="flex justify-center items-center space-x-2"
                        activeClassName="hidden"
                        pageClassName="hidden"
                        onPageChange={handlePageClick}
                        pageRangeDisplayed={undefined}
                        pageCount={pageCount}
                        previousLabel={returnPrevNextTag('< Previous')}
                        renderOnZeroPageCount={() => null}
                    />
                </div>
            )}
            {filteredBlogs.slice(itemOffset, endOffset).map((blog, index) => (
                <React.Fragment key={`${blog._id}_${index}`}>
                    <BlogsCard blog={blog} />
                    <hr className=" w-full mt-5" />
                </React.Fragment>
            ))}
        </div>
    );
};

export default Blogs;
