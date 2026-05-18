import './Cluster.css'

interface ClusterProps {
    className?: string
    children: React.ReactNode;
}

const Cluster = ({className, children} : ClusterProps) => {
    return (
        <div className={`cluster ${className ? className : ''}`}>
            {children}
        </div>
    )
}

export default Cluster;