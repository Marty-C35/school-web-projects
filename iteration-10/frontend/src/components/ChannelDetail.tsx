import useSWR, { useSWRConfig } from 'swr';
import Hashtag from "../assets/images/hashtag.svg"
import fetcher from '../models/fetcher';
import { ChannelSide } from "./ChannelSide"
import { category, channelInfo, user } from '../models/types';
import { useParams } from 'react-router-dom';
import Message from './Message';
import axios from 'axios';


interface properties {
    user: user,
    categories: [category],
}


export const ChannelDetail = ({ user, categories }: properties) => {
    const { mutate } = useSWRConfig()
    const { id } = useParams();
    const { data, error } = useSWR('http://localhost:4000/channel/' + id, fetcher);

    if (error) return <div>failed to load</div>;
    if (!data) return <div>loading...</div>;

    const channelInfo: channelInfo = data.data;


    const enterMessage = (event: any) => {
        event.preventDefault();
        sendMessage()
    }


    const update = () => {
        mutate('http://localhost:4000/channel/' + id);
    }


    const sendMessage = async () => {
        const requestData = ({
            channelId: id,
            content: (document.getElementById("message") as HTMLInputElement).value,
        });
        const config = {
            headers: {
                "X-User": user.id
            }
        };
        const res = await axios.post('http://localhost:4000/message', requestData, config).catch(function (error) { console.log(error) });
        update();
        (document.getElementById("message") as HTMLInputElement).value = "";
    };


    return (
        <div className="app">
            <ChannelSide user={user} categories={categories} />
            <main className="main-window main-channel">
                <div className="main-channel__header header">
                    <img
                        src={Hashtag}
                        alt="Server channel icon"
                        className="main-channel__logo"
                    />
                    <h1 className="main-channel__heading heading heading--1">{channelInfo.name}</h1>
                </div>

                <div className="main-channel__chat chat">
                    <div className="chat__start chat-start">
                        <h2 className="chat-start__heading heading heading--2">
                            Welcome to the start of the&nbsp;
                            <img
                                src={Hashtag}
                                className="chat-start__icon image"
                                alt="Server channel icon"
                            />{channelInfo.name} channel
                        </h2>
                    </div>
                    {channelInfo.messages.map((message) => {
                        return <Message message={message} user={user} key={message.id} update={update} />
                    })}
                </div>
                <div className="chat-input">
                    <form action="" className="chat-input__form" onSubmit={enterMessage}>
                        <input
                            type="text"
                            name=""
                            id="message"
                            placeholder="Write message"
                            className="chat-input__text-input"
                        />
                        <input
                            type="submit"
                            value="Send message"
                            className="chat-input__send button"
                        />
                    </form>
                </div>
            </main>
        </div>
    );
};

export default ChannelDetail;