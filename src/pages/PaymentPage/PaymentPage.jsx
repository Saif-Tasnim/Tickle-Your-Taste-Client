import React from "react";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
import { CheckoutForm } from "./component/CheckOutForm";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PK_KEY);

const PaymentPage = () => {
  const { id } = useParams();

  return (
    <div className="py-24">
      <h1 className="text-center text-2xl font-bold my-7 underline">
        Payment Gateway
      </h1>

      <Elements stripe={stripePromise}>
        <CheckoutForm amount={id} />
      </Elements>
    </div>
  );
};

export default PaymentPage;
