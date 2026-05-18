import './ContentNavigation.css';

const ContentNavigation = ({sectionName, sectionFragmentUrl, isActive}) => {
    return (
        <li>
            <a href={`${sectionFragmentUrl}`}
            className = {isActive ? 'toc-link-active' : 'toc-link'}>
                {sectionName
                }</a>
        </li>
    )
}

export default ContentNavigation;