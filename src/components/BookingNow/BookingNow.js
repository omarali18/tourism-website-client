import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { useForm } from "react-hook-form";
import useAuth from '../../Hooks/useAuth';
import "./BookingNow.css"
import axios from 'axios';

const BookingNow = () => {
    const [offer, setOffer] = useState({})
    const [place, setPlace] = useState(false)
    const { id } = useParams()
    const { user } = useAuth()
    const { img, name, description, price, _id } = offer;
    const { register, handleSubmit, watch, reset, formState: { errors } } = useForm();
    const onSubmit = data => {
        data.offerName = name;
        data.offerId = _id;
        data.OfferPrice = price;
        data.offerImg = img;

        axios.post("https://fathomless-bastion-34681.herokuapp.com/client", data)
            .then(res => {
                // const dataAccept = (res.data);
                if (res?.data.acknowledged) {
                    alert("Successfully booking this offer")
                    setPlace(true)
                    reset()
                    // setOffer({})
                }
            }).catch(error => console.log(error))
    }

    useEffect(() => {
        fetch(`https://fathomless-bastion-34681.herokuapp.com/tourOffer/${id}`)
            .then(res => res.json())
            .then(data => setOffer(data))
    }, [])
    return (
        <div className="mt-5 mb-5 text-center">
            <h1 className="m-5">Place your Order</h1>
            <div className="row row-cols-1 row-cols-md-2 row-cols-sm-1 w-75 mx-auto">
                <div className="col">
                    <form className="shipping-form" onSubmit={handleSubmit(onSubmit)}>

                        <input defaultValue={user.displayName} {...register("name")} />

                        <input defaultValue={user.email} {...register("email", { required: true })} />
                        {errors.exampleRequired && <span className="error">This field is required</span>}

                        <input placeholder="Ariea" {...register("address")} />
                        <input placeholder="city" {...register("ciry")} />
                        <input placeholder="country" {...register("country")} />




                        <input type="submit" value="Place Order" />
                    </form>
                </div>
                <div className={place ? "d-none" : "col d-block"}>
                    <div className="row row-cols-1 row-cols-md-3 g-4">
                        <div className="col w-75 mx-auto">
                            <div className="card card-height">
                                <img src={img} className="card-img-top" alt="..." />
                                <div className="card-body">
                                    <h3 className="card-title">{name}</h3>
                                    <div className="d-flex justify-content-between align-items-center">
                                        <h6>{offer.offer}</h6>
                                        <h4>BDT {price}</h4>
                                    </div>
                                    <p className="card-text">{description}</p>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BookingNow;