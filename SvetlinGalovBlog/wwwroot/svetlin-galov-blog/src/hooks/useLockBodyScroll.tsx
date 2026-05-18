import { useEffect } from "react";

interface UseLockBodyScrollProps {
    locked: boolean;
}

const useLockBodyScroll = (locked : UseLockBodyScrollProps) => {
    useEffect(() => {
        const originalOverflow = document.documentElement.style.overflowY
        
        if(locked) {
            document.documentElement.style.overflowY = 'hidden';
            document.documentElement.style.scrollbarGutter = "stable";
        }
        
        return () => {
            document.documentElement.style.overflowY = originalOverflow;
            document.documentElement.style.scrollbarGutter = "";
        }
    }, [locked]);
}

export default useLockBodyScroll;