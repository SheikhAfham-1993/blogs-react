const BlogsCard = ({ blog }) => {
    return (
        <div className="flex flex-col text-gray-700 dark:text-gray-200 w-full mt-5">
            <h1 className="text-2xl font-bold hover:underline hover:text-blue-600 cursor-pointer">
                {blog?.title}
            </h1>
            <span>
                <b>Author:</b> {blog?.author}
            </span>
            <span>
                <b>Created at:</b>{' '}
                {new Date(blog?.createdAt).toLocaleString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                })}
            </span>
            <p className="line-clamp-3 mt-4">{blog?.content}</p>
            <span className="text-blue-500 underline mt-2">Read more</span>
        </div>
    );
};

export default BlogsCard;
