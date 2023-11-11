import { signal } from '@preact/signals-react';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import BlogsCard from './BlogsCard';
import ReactPaginate from 'react-paginate';
import { blogs } from '../util/signals';

const Blogs = () => {
    let itemsPerPage = 4;
    const [itemOffset, setItemOffset] = useState(0);
    const endOffset = itemOffset + itemsPerPage;
    const pageCount = Math.ceil(blogs.value.length / itemsPerPage);

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
        <>
            {blogs.value?.length > itemsPerPage && (
                <div className="flex justify-end w-full">
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
            {blogs.value?.slice(itemOffset, endOffset).map((blog, index) => (
                <React.Fragment key={`${blog._id}_${index}`}>
                    <BlogsCard blog={blog} />
                    <hr className=" w-full" />
                </React.Fragment>
            ))}
        </>
    );
};

export default Blogs;
