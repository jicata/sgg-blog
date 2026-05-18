import './ContentImage.css';

const ContentImage = ({ imgPath, className}) => {
    return (
        <div className={`content-image ${(className ? className : '')}`}>
            <img className="content-image__img" src={imgPath}/>
        </div>
    )
}

export default ContentImage;