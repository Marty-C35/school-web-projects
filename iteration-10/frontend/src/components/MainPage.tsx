import { ChannelSide } from "./ChannelSide"
import { category, user } from '../models/types';


interface properties {
    user: user,
    categories: [category],
}


export const MainPage = ({ user, categories }: properties) => {
    return (
        <div className="app">
            <ChannelSide user={user} categories={categories} />
            <main>
            </main>
        </div>
    );
};

export default MainPage;
