import { useState, useEffect } from 'react';

export const useDebounced = (input: string = '', time: number = 500, isActive: boolean = true) => {
    const [debouncedValue, setDebouncedValue] = useState(input);

    useEffect(() => {
        let timeoutId: NodeJS.Timeout | null = null;

        const debounceFunction = () => {
            if (timeoutId) {
                clearTimeout(timeoutId);
            }

            timeoutId = setTimeout(() => {
                setDebouncedValue(input);
            }, time);
        };

        if (isActive) {
            debounceFunction();
        } else {
            setDebouncedValue(input);
        }

        return () => {
            if (timeoutId) {
                clearTimeout(timeoutId);
            }
        };
    }, [input, time, isActive]);

    return debouncedValue;
};
