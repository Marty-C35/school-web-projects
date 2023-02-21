interface IItemsProps {
    name: string,
    price: number,
    image: string,
    quantity: number,
}

  
export const InlineItem = ({ name, price, image, quantity }: IItemsProps) => {
    return (
        <div className='inline_item'>
            <span className="inline_item--text">{name}</span>
            <span className="inline_item--text">{quantity} pcs</span>
            <span className="inline_item--text">{price}€/piece</span>
            <span className="inline_item--text_bold">{price * quantity}€</span>
        </div>
    );
};
  