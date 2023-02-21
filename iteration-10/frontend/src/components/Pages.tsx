import { BrowserRouter, Route, Routes } from 'react-router-dom';
import EditPage from './EditPage';
import MainPage from './MainPage';

import useSWR from 'swr';
import fetcher from '../models/fetcher';
import ChannelDetail from './ChannelDetail';


export const Pages = () => {
    const users = useSWR('http://localhost:4000/user', fetcher);
    const servers = useSWR('http://localhost:4000/channel', fetcher);

    if (servers.error || users.error) return <div>failed to load</div>;
    if (!servers.data || !users.data) return <div>loading...</div>;
    const defaultServer = servers.data.data
    const defaultUser = users.data.data[0]

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<MainPage user={defaultUser} categories={defaultServer} />} />
                <Route path="/user/:id" element={<EditPage />} />
                <Route path="/channel/:id" element={<ChannelDetail user={defaultUser} categories={defaultServer} />} />

            </Routes>
        </BrowserRouter>
    );
};

export default Pages;
