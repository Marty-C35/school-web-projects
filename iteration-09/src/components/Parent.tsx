import React from 'react'
import { useForm } from "react-hook-form";
import {First} from './First'
import { Fourth } from './Fourth';
import { Second } from './Second';
import { Third } from './Third';
import '../styles/parent.css'
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup"

import * as staticData from '../static/cart.json';

const schema = yup.object().shape({
    firstName: yup.string().required("Name is required"),
    lastName: yup.string().required("Name is required"),
    street: yup.string().required("Name is required"),
    streetNo: yup.number().positive().integer().required(),
    city: yup.string().required("Name is required"),
    zip: yup.number().positive().integer().required(),
    phone: yup.string().required(),
    phoneNo: yup.string().matches(/^[0-9]+$/).min(9).max(9).required(),
    email: yup.string().email(),
    note: yup.string(),
})
  
export const Parent = () => {
    const { register, handleSubmit, formState: {errors} } = useForm({
        resolver: yupResolver(schema),
    });
    const [data, setData] = React.useState("");
    const [step, setStep] = React.useState<number>(0);
    
    const getStep = () => {
        if (step === 0) {
            return (<First nextAction={setStep} item={staticData.products}/>)
        } else if (step === 1) {
            return <Second nextAction={setStep} register={register} handleSubmit={handleSubmit} data={data} setData={setData} errors={errors} />
        } else if (step === 2) {
            return <Third nextAction={setStep} item={staticData.products} data={data} />
        } else {
            return <Fourth />
        }
    }
    return (
        <>
            {getStep()}
        </>
    );
  };
  