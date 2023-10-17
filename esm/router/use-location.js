import { useEffect, useState } from 'react';
import { useRouter } from './use-router';
const useLocation = () => {
    const router = useRouter();
    const [location, setLocation] = useState(router.location);
    useEffect(() => {
        setLocation(() => router.location);
        return router.subscribe(() => setLocation(router.location));
    }, [router]);
    return location;
};
export { useLocation };
