import { Item } from "./Item";
import '../styles/first.css'


interface IItemsProps {
    name: string,
    price: number,
    image: string,
    quantity: number,
}

interface IProps {
    nextAction: Function;
    item: any,
}
  
export const First = ({ nextAction, item }: IProps) => {
    const sum = item.map((i: IItemsProps) => i.price * i.quantity).reduce((a:number, b:number) => a + b, 0).toFixed(1);

    return (
        <div className='outer_box'>
            <div className='middle_box'>
                <div className="box">
                    <span className="box--text">Step 1: Purchase summary</span>
                    {item.map((i: IItemsProps) => <Item {...i}/>)}
                    <div className="box--total box--text">
                        <span>Total: </span>
                        <span>{sum}€</span>
                    </div>
                    
                    <hr />
                    <button onClick={() => nextAction(1)}>Next</button>
                </div>
            </div>
        </div>
    );
};
  