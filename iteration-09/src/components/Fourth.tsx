import '../styles/fourth.css'
  
export const Fourth = () => {
    return (
        <div className='outer_box'>
            <div className='middle_box'>
                <div className="box_bordered">
                    <span className="box--item first_item">Your order has been placed.</span>
                    <span className="box--item second_item">Great! Your order will be processed within 24 hours.</span>
                    <span className="box--item third_item">Thank you for choosing us!</span>
                </div>
            </div>
        </div>
    );
};