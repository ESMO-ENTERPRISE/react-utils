import { useEffect } from 'react';
import { useEsmoStore } from '../../../src/store'

type Group = {
    id: number;
    name: string;
};
export function StoreView() {
    const { data, setData } = useEsmoStore<Group>()

    useEffect(() => {
        setData([{ id: 1, name: 'test' }])
    }, [])

    return (
        <div className='flex flex-1'>
            {data.map((g, index) => {
                return (
                    <div className='flex flex-col border rounded-sm p-4' key={index}>
                        <span>{g.id}</span>
                        <span>{g.name}</span>
                    </div>
                )
            })}

            <button className="shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded" type="button" onClick={() => setData([...data, {id: 2, name: "test 2"}])}>
                Add element to store
            </button>
        </div>
    )
}