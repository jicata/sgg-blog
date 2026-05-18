import './categories.css'
import Category from "./category/category.jsx";

const Categories = () => (
    <>
        <h5 className="categories__heading">Categories</h5>
        <section className="categories">
            <Category/>
            <Category/>
            <Category/>
            <Category/>
            <Category/>
            <Category/>
            <Category/>
            <Category/>
        </section>
    </>
);

export default Categories;