import React from "react"
import { user } from "../models/types"
import { useParams } from 'react-router-dom';
import useSWR from 'swr';
import fetcher from '../models/fetcher';
import axios from 'axios';


export const EditPage = () => {
    const [disable, setDisable] = React.useState(true);
    const { id } = useParams();
    const { data, error } = useSWR('http://localhost:4000/user/' + id, fetcher);

    if (error) return <div>failed to load</div>;
    if (!data) return <div>loading...</div>;
    const user: user = data.data


    const changeUser = async () => {
        const requestData = ({
            id: user.id,
            name: (document.getElementById("username") as HTMLInputElement).value,
            email: (document.getElementById("email") as HTMLInputElement).value,
        });

        const res = await axios.put('http://localhost:4000/user', requestData).catch(function (error) { console.log(error) });
        setDisable(true);
        if (res?.status == 200) {
            alert("user successfully modified");
        } else {
            alert("unexpected error")
        }
    };


    return (
        <div className="app">
            <nav className="navigation">
                <div className="navigation__setting-categories categories">
                    <div className="navigation__setting-category category">
                        <h2 className="category__heading heading heading--2">User settings</h2>
                        <ul className="list category__items items">
                            <li className="setting category__item category__item--selected item">
                                <span className="item__name">My Account</span>
                            </li>

                            <li className="setting category__item item">
                                <span className="item__name">User Profile</span>
                            </li>

                            <li className="setting category__item item">
                                <span className="item__name">Privacy &amp; Safety</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
            <main className="main-window main-settings">
                <h1 className="main-settings__heading heading heading--1">My account</h1>
                <div className="main-settings__content">
                    <div className="profile-editor">
                        <div className="profile-editor__banner"></div>
                        <div className="profile-editor__controls">
                            <div className="profile-editor__profile profile-info">
                                <div className="profile-editor__profile-picture profile-picture">
                                    <img
                                        src={user.picture}
                                        alt="X's profile picture"
                                        className="profile-editor__pfp-image profile-picture__image img"
                                    />
                                </div>
                                <div className="profile-info__account-info">
                                    <h2 className="profile-info__name heading heading--2">
                                        {user.name}
                                    </h2>
                                    <span className="profile-info__slug">#{user.id.slice(0, 4)}</span>
                                </div>
                                <button className="profile-info__allow-edit button" onClick={() => setDisable(!disable)}>
                                    Edit profile
                                </button>
                            </div>

                            <form className="profile-editor__form">
                                <label className="profile-editor__label label" htmlFor="username"
                                >Username</label
                                >
                                <input
                                    type="text"
                                    className="profile-editor__input"
                                    name="username"
                                    id="username"
                                    placeholder={"Current username: " + user.name}
                                    disabled={disable}
                                />

                                <label className="profile-editor__label label" htmlFor="email"
                                >Email</label
                                >
                                <input
                                    type="email"
                                    className="profile-editor__input"
                                    name="email"
                                    id="email"
                                    placeholder={"Current email: " + user.email}
                                    disabled={disable}
                                />

                                <input
                                    type="button"
                                    className={"profile-editor__submit " + (disable ? "profile-editor__submit--disabled " : "") + "button"}
                                    value="Change profile info"
                                    disabled={disable}
                                    onClick={changeUser}
                                />
                            </form>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default EditPage;