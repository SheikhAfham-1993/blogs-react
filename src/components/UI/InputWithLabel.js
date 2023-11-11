const InputWithLabels = ({ labelName, labelfor, type }) => {
    return (
        <div className="flex flex-col">
            <label htmlFor={labelfor}>{labelName}</label>
            <input
                type={type}
                name={labelfor}
                className="border border-gray-300 rounded-lg p-1"
            />
        </div>
    );
};

export default InputWithLabels;
