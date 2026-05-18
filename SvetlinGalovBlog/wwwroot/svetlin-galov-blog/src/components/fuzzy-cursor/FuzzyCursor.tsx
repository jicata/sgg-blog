import {useState} from "react";
import './FuzzyCursor.css';
interface FuzzyCursorProps {
    children: React.ReactNode;
    label?: string;
}

const FuzzyCursor = ({children, label = "Explore"} 
                     : FuzzyCursorProps) => {

    const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
    const [showCursor, setShowCursor] = useState(false);
    const handleMouseMove = (e: React.MouseEvent) => {
        setCursorPos({ x: e.clientX, y: e.clientY });
    };
    const handleMouseEnter = () => setShowCursor(true);
    const handleMouseLeave = () => setShowCursor(false);
    
    return (
        <div
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setShowCursor(true)}
            onMouseLeave={() => setShowCursor(false)}
            style={{ cursor: showCursor ? "none" : "auto" }}
        >
            {children}
            {showCursor && (
                <div
                    className="cursor-bubble"
                    style={{ left: cursorPos.x, top: cursorPos.y }}
                >
                    {label}
                </div>
            )}
        </div>
    )
}

export default FuzzyCursor;