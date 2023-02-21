import '../styles/second.css';

import { useForm } from 'react-hook-form';

interface IFirstProps {
    nextAction: Function;
    register: any,
    handleSubmit: any,
    data: any,
    setData: any,
    errors: any,
}

const validate = (prop: any): string => {
    return prop?.message !== undefined ? "error" : ""
}

export const Second = ({ nextAction, register, handleSubmit, data, setData, errors }: IFirstProps) => {
    return (
        <div className='outer_box'>
        <div className='middle_box'>
            <div className="box">
                <span className="box--text">Step 2: Personal information</span>
                <form className='form' onSubmit={handleSubmit((data: any) => {setData(JSON.stringify(data)); nextAction(2)})}>
                    <div>
                        <label htmlFor="firstName">Name*</label>
                        <input className={validate(errors.firstName)} {...register("firstName")} type="text" name="firstName" />
                    </div>
                    <div>
                        <label htmlFor="lastName">Surname*</label>
                        <input className={validate(errors.lastName)} {...register("lastName")} type="text" name="lastName" />
                    </div>
                    <div className='form--address'>
                        <div>
                            <label htmlFor="street">Street*</label>
                            <input className={validate(errors.street)} {...register("street")} type="text" name="street" />
                        </div>
                        <div>
                            <label htmlFor="streetNo">Street no.*</label>
                            <input className={validate(errors.streetNo)} {...register("streetNo")} type="text" name="streetNo" />
                        </div>
                    </div>
                    <div className='form--address'>
                        <div>
                            <label htmlFor="city">City*</label>
                            <input className={validate(errors.city)} {...register("city")} type="text" name="city" />
                        </div>
                        <div>
                            <label htmlFor="zip">Zip code*</label>
                            <input className={validate(errors.zip)} {...register("zip")} type="text" name="zip" />
                        </div>
                    </div>
                    <div>
                        <label htmlFor="phone">Phone no.*</label>
                        <div className='form--address'>
                            <select {...register("phone")} name="phone">
                                <option value="+420">+420</option>
                                <option value="+421">+421</option>
                            </select>
                            <input className={validate(errors.phoneNo)} {...register("phoneNo")} type="tel" name="phoneNo" />
                        </div>
                    </div>
                    <div>
                        <label htmlFor="email">Email address</label>
                        <input className={validate(errors.email)} {...register("email")} type="email" name="email" />
                    </div>
                    <div>
                        <label htmlFor="note">Note</label>
                        <textarea {...register("note")} className={'form--note ' + validate(errors.note)} name="note" />
                    </div>
                    <br />
                    <button type="submit">Next</button>
                </form> 
            </div>
        </div>
    </div>
    );
};