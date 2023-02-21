import '../styles/item.css'

interface IItemsProps {
    name: string,
    price: number,
    image: string,
    quantity: number,
}

  
export const Item = ({ name, price, image, quantity }: IItemsProps) => {
    return (
        <div className='item'>
            <div className="item--sides">
                <img className='item--picture' src={image} alt="Item image" />
                <div className='item--info'>
                    <div className='item--line'>
                        <span className='item--bold_text'>{name}</span>
                        <span className='item--small_text'>Price: {price}€/piece</span>
                    </div>
                    <div className='item--line'>
                        <span className='item--small_text'>Quantity: {quantity}</span>
                        <span className='item--bold_text'>{price * quantity}€</span>
                    </div>
                </div>
            </div>
            
            
            
            
        </div>
    );
};
  