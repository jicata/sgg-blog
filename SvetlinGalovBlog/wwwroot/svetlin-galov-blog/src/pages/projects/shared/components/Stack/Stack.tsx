import './Stack.css'
import Cluster from "../cluster/Cluster.tsx";

interface StackProps {
    children: React.ReactNode;
    className?: string;
}

const Stack = ({className, children}: StackProps) => {
    return (
        <div className="stack">
            <Cluster className={"vertical"}>
                {children}
            </Cluster>
        </div>
    )
}

export default Stack;