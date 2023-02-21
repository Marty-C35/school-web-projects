// import './header.css';
import { Link } from 'react-router-dom';
import { category, user } from '../models/types';
import Category from './Category';


interface properties {
    user: user,
    categories: [category],
}

export const ChannelSide = ({ user, categories }: properties) => {
    return (
        <nav className="navigation">
            <Link to="/" className="navigation__server-header header">
                <h1 className="navigation__server-heading heading heading--1">
                    PB138 Modern Markup Languages
                </h1>
            </Link>

            <div className="navigation__channels-categories categories">
                {/* <Category {...categories[0]}/> */}
                {categories.map((category) => {
                    return <Category {...category} key={category.id} />
                })}
            </div>
            <Link to={"/user/" + user.id} className="navigation__profile profile link">
                <div
                    className="navigation__profile-picture profile__picture profile-picture"
                >
                    <img
                        src={user.picture}
                        alt="User's profile picture"
                        className="profile-picture__image image"
                    />
                </div>
                <div className="profile__info">
                    <div className="profile__name">{user.name}</div>
                    <div className="profile__slug">#{user.id.slice(0, 4)}</div>
                </div>
            </Link>
        </nav>
    )
};

export default ChannelSide;
