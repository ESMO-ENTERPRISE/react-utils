import { useForm, required, email, minLength, UseFormValue } from '../../../src/forms'

interface IForm extends Record<string, UseFormValue> {
    username: string;
    password: string;
}

export function FormView() {

    const { data, handleSubmit, ref, errors, valid } = useForm<IForm>(
        {
            username: ['test@test.com', [required('Email is required'), email()]],
            password: ['', [required('Password is required'), minLength(8)]],
        },
        {
            validateOn: 'change'
        })

    const submit = () => {
        console.log('values', data)
    }
    return (
        <div>
            <form ref={ref} className="w-full max-w-sm" onSubmit={handleSubmit(submit)}>
                <div className="md:flex md:items-center mb-6">
                    <div className="md:w-1/3">
                        <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" htmlFor="inline-full-name">
                            Full Name
                        </label>
                    </div>
                    <div className="md:w-2/3">
                        <input 
                            className={`bg-gray-200 appearance-none border-2 rounded w-full py-2 px-4 leading-tight focus:outline-none focus:bg-white focus:border-purple-500 ${errors.username ? 'border-red-500 text-red-500' : 'border-gray-200 text-gray-700'}`}
                            id="inline-full-name" type="text"
                            name='username' />
                    </div>
                    {errors.username && (
                        <span>{errors.username}</span>
                    )}
                </div>
                <div className="md:flex md:items-center mb-6">
                    <div className="md:w-1/3">
                        <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" htmlFor="inline-password">
                            Password
                        </label>
                    </div>
                    <div className="md:w-2/3">
                        <input 
                            className={`bg-gray-200 appearance-none border-2 rounded w-full py-2 px-4 leading-tight focus:outline-none focus:bg-white ${errors.password ? 'border-red-500 text-red-500 focus:border-red-500' : 'border-gray-200 text-gray-700 focus:border-purple-500'}`}
                            id="inline-password" type="password"
                            name="password" />
                    </div>
                    {errors.password && (
                        <span>{errors.password}</span>
                    )}
                </div>
                <div className="md:flex md:items-center mb-6">
                    <div className="md:w-1/3"></div>
                    <label className="md:w-2/3 block text-gray-500 font-bold">
                        <input className="mr-2 leading-tight" type="checkbox" />
                        <span className="text-sm">
                            Send me your newsletter!
                        </span>
                    </label>
                </div>
                <div className="md:flex md:items-center">
                    <div className="md:w-1/3"></div>
                    <div className="md:w-2/3">
                        <button className="shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded" type="submit" disabled={!valid}>
                            Sign Up
                        </button>
                    </div>
                </div>
            </form>
        </div>
    )
}