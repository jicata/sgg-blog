import Categories from "./categories/categories.jsx";
import PopularContents from "./popular-contents/popular-contents.jsx";
import './content-navigation.css';

const ContentNavigation = () => (
    <aside className="content-nav">
        <Categories/>
        <PopularContents/>
    </aside>
);

export default ContentNavigation;