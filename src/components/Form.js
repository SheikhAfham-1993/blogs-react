import InputWithLabels from './UI/InputWithLabel';

const Form = ({ formName, onSubmit }) => {
    return (
        <div className="h-full flex items-center justify-center w-full">
            <div className="p-5 border border-gray-300 rounded-lg flex flex-col w-full md:w-[400px]">
                <span className="text-2xl font-bold">{formName}</span>
                <form onSubmit={onSubmit} className="flex flex-col mt-5">
                    {formName === 'Register' && (
                        <InputWithLabels
                            labelName={'Name'}
                            labelfor={'name'}
                            type={'name'}
                        />
                    )}
                    <InputWithLabels
                        labelName={'Email'}
                        labelfor={'email'}
                        type={'email'}
                    />
                    <InputWithLabels
                        labelName={'Password'}
                        labelfor={'password'}
                        type={'password'}
                    />
                    <button className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-lg mt-5">
                        {formName}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Form;
