import './popular-contents.css'
import PopularContent from "./popular-content/popular-content.jsx";

const PopularContents = () => (
    <>
        <div className="popular-contents-wrapper">
            <h5 className="popular-contents__heading">Popular Content</h5>
            <section className="popular-contents">
                <PopularContent />
                <PopularContent />
                <PopularContent />
                <PopularContent />
                <PopularContent />
            </section>
        </div>
    </>
   
);

export default PopularContents