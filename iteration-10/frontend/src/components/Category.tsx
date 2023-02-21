import { category } from '../models/types';
import Channel from './Channel';
import React from 'react';


export const Category = (props: category) => {
    const [visible, setVisible] = React.useState(true);
    return (
        <div className="navigation__channel-category category" >
            <h2 className="category__heading heading heading--2" onClick={() => setVisible(!visible)}>{props.name}</h2>
            {visible ?
                <ul className="list channels category__items items">
                    {props.channels.map((channel) => {
                        return <Channel {...channel} key={channel.id} />
                    })}
                </ul>
                : ""}
        </div>
    )
};

export default Category;
