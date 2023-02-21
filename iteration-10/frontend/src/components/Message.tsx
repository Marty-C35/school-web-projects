import { user, message } from '../models/types';
import TimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en.json';
import Edit from "../assets/images/edit.svg"
import Delete from "../assets/images/delete.svg"
import React from "react";
import axios from "axios";


TimeAgo.addDefaultLocale(en)
const timeAgo = new TimeAgo('en-US')

interface properties {
    message: message,
    user: user,
    update: Function,
}


export const Message = ({ message, user, update }: properties) => {
    const [visible, setVisible] = React.useState(false);


    const deleteMessage = async () => {
        const config = {
            headers: {
                "X-User": user.id
            }
        };

        const res = await axios.delete('http://localhost:4000/message/' + message.id, config).catch(function (error) { alert("Access forbidden") });
        update();
    };


    const editMessage = async (event: any) => {
        event.preventDefault();
        const config = {
            headers: {
                "X-User": user.id
            }
        };

        const requestData = ({
            content: (document.getElementById("edit_message_" + message.id) as HTMLInputElement).value,
        });

        const res = await axios.put('http://localhost:4000/message/' + message.id, requestData, config).catch(function (error) { alert("Access forbidden") });
        setVisible(false);
        update();
    }


    return (
        <div className="chat__message message">
            <div className="message__profile-picture profile-picture">
                <img
                    src={message.sender.picture}
                    className="profile-picture__image image"
                    alt="Sender's profile picture"
                />
            </div>
            <div className="message__sent-by">
                <h2 className="message__sender-name heading heading--2">
                    {message.sender.name}
                </h2>
                <span className="message__sent-at">{timeAgo.format(Date.parse(message.createdAt))}
                    {message.edited ? " (edited)" : ""}</span>
            </div>

            <div className="message__content">
                {message.content}
            </div>
            <div className="message__controls controls">
                <button className="controls__control">
                    <img
                        src={Edit}
                        className="controls__icon"
                        alt="Edit message"
                        onClick={() => setVisible(!visible)}
                    />
                </button>
                <button className="controls__control" onClick={deleteMessage}>
                    <img
                        src={Delete}
                        className="controls__icon"
                        alt="Delete message"
                    />
                </button>
            </div>
            {visible ?
                <div className="message-edit">
                    <form action="" className="message-edit__form" onSubmit={editMessage}>
                        <input
                            type="text"
                            id={"edit_message_" + message.id}
                            placeholder="Add the content of the message to the input here"
                            className="message-edit__text-input"
                        />
                        <input
                            type="submit"
                            value="Edit message"
                            className="message-edit__send button"
                        />
                    </form>
                </div>
                : ""}
        </div>
    )
};

export default Message;
