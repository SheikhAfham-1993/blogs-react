import React, { useState } from 'react';
import ReactPaginate from 'react-paginate';
import BlogsCard from './BlogsCard';

const Blogs = ({ blogs }) => {
    let itemsPerPage = 4;
    const [itemOffset, setItemOffset] = useState(0);
    const endOffset = itemOffset + itemsPerPage;
    const pageCount = Math.ceil(blogs?.length / itemsPerPage);

    const returnPrevNextTag = (text) => {
        return (
            <div className="px-3 flex items-center justify-center font-semibold hover:text-blue-600 hover:underline">
                {text}
            </div>
        );
    };

    const handlePageClick = (event) => {
        const newOffset = (event.selected * itemsPerPage) % blogs?.length;
        setItemOffset(newOffset);
    };

    return (
        <>
            {blogs?.length > itemsPerPage && (
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
            {blogs.slice(itemOffset, endOffset).map((blog, index) => (
                <React.Fragment key={`${blog._id}_${index}`}>
                    <BlogsCard blog={blog} />
                    <hr className=" w-full mt-5" />
                </React.Fragment>
            ))}
        </>
    );
};

export default Blogs;
