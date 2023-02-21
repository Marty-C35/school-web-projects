import { Link } from "react-router-dom";
import Hashtag from "../assets/images/hashtag.svg"
import { channel } from '../models/types';


export const Category = (props: channel) => (
    <Link to={"/channel/" + props.id} className="channel category__item item">
        <img
            src={Hashtag}
            alt="Server channel icon"
            className="channel__image image"
        />
        <span className="channel__name item__name">{props.name}</span>
    </Link>
);

export default Category;
