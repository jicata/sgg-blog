import './TableOfContents.css'
import ContentNavigation from "./ContentNavigation/ContentNavigation.jsx";

const TableOfContents = ({contents, activeId}) => {
    console.log(contents);
    return(
        <aside className="table-of-contents">
            <h3 className="table-of-contents__title">Table of contents</h3>
            <ol className="table-of-contents__list">
                {contents && contents.map((content, index) => {
                    return <ContentNavigation
                        key={index}
                        sectionFragmentUrl={content.fragmentUrl}
                        sectionName={content.name}
                        isActive={content.fragmentUrl === `#${activeId}`}/>
                })}
            </ol>
         
        </aside>
      
    )
}

export default TableOfContents;