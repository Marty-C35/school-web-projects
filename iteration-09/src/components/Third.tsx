import { InlineItem } from "./InlineItem"
import '../styles/third.css'

interface IItemsProps {
    name: string,
    price: number,
    image: string,
    quantity: number,
}

interface IProps {
    nextAction: Function;
    item: any,
    data: any,
}

interface IData {
    firstName: string,
    lastName: string,
    street: string,
    streetNo: string,
    city: string,
    zip: string,
    phone: string,
    phoneNo: string,
    email: string,
    note: string,
}


export const Third = ({ nextAction, item, data}: IProps) => {
    const info: IData = JSON.parse(data);
    
    return (
        <div className='outer_box'>
        <div className='middle_box'>
            <div className="box">
                <span className="box--text">Step 3: Summary</span>
                <span className="box--text smaller">Your order</span>
                {item.map((i: IItemsProps) => <InlineItem {...i}/>)}
                <br />
                <span className="box--text smaller">Deliver to</span>
                <div className="form smaller">
                    <div className="form--address">
                        <span className="bold">Name:</span>
                        <span className="bold">{info.firstName} {info.lastName}</span>
                    </div>
                    <div className="form--address">
                        <span className="bold">Address:</span>
                        <span>{info.street}, {info.streetNo}, {info.city}, {info.zip}</span>
                    </div>
                    <div className="form--address">
                        <span className="bold">Phone number:</span>
                        <span>{info.phone} {info.phoneNo.replace(/^(.{3})(.{3})(.*)$/, "$1 $2 $3")}</span>
                    </div>
                    <div className="form--address">
                        <span className="bold">Email:</span>
                        <span>{info.email}</span>
                    </div>
                    <div className="form--address">
                        <span className="bold">Note:</span>
                        <span>{info.note}</span>
                    </div>
                </div>
                <button onClick={() => nextAction(3)}>Finish</button>
            </div>
        </div>
    </div>
    );
};