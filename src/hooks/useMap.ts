import { useCallback, useState } from 'react'
import { Actions, MapOrEntries, Return } from './types'

export function useMap<K, V>(
    initialState: MapOrEntries<K, V> = new Map(),
): Return<K, V> {
    const [map, setMap] = useState(new Map(initialState))

    const actions: Actions<K, V> = {
        set: useCallback((key, value) => {
            setMap(prev => {
                const copy = new Map(prev)
                copy.set(key, value)
                return copy
            })
        }, []),

        setAll: useCallback(entries => {
            setMap(() => new Map(entries))
        }, []),

        remove: useCallback(key => {
            setMap(prev => {
                const copy = new Map(prev)
                copy.delete(key)
                return copy
            })
        }, []),

        reset: useCallback(() => {
            setMap(() => new Map())
        }, []),
    }

    return [map, actions]
}