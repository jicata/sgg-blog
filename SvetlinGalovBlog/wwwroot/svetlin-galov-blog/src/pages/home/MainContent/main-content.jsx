import './main-content.css'
import Articles from "./articles/articles.jsx";
import MaxWidthWrapper from "../../../components/MaxWidthWrapper/max-width-wrapper.tsx";

const MainContent = () => (
    <MaxWidthWrapper className="main-content" as='section'>
        <div className="main-content__primary">
            <Articles/>
        </div>
    </MaxWidthWrapper>
);

export default MainContent;