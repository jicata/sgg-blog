import './main-content.css'
import Articles from "./articles/articles.jsx";
import ContentNavigation from "./content-navigation/content-navigation.jsx";
import MaxWidthWrapper from "../../../components/MaxWidthWrapper/max-width-wrapper.tsx";

const MainContent = () => (
    <MaxWidthWrapper className="main-content" as='section'>
        <div className="main-content__primary">
            <Articles/>
        </div>
        <div className="main-content__sidebar">
            <ContentNavigation/>
        </div>
    </MaxWidthWrapper>
);

export default MainContent;