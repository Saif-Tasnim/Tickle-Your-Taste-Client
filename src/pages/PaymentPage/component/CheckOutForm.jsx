import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import toast from "react-hot-toast";
import { useAxiosSecure } from "../../../hooks/useAxiosSecure";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../providers/AuthProvider";
import { useNavigate } from "react-router-dom";

export const CheckoutForm = ({ amount }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [axiosSecure] = useAxiosSecure();
  const [clientSecret, setClientSecret] = useState("");
  const [loading, setLoading] = useState(false);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    axiosSecure
      .post("/create-payment-intent", { price: amount })
      .then((res) => {
        setClientSecret(res.data.clientSecret);
      });
  }, [axiosSecure]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    if (!stripe || !elements) {
      setLoading(false);
      return;
    }
    const card = elements.getElement(CardElement);
    if (card == null) {
      setLoading(false);
      return;
    }

    // Use your card Element with other Stripe.js APIs
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      toast.error(error.message);
      setLoading(false);
    }

    const { paymentIntent, error: confirmError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            name: user?.displayName || "unknown",
            email: user?.email || "anonymous",
          },
        },
      });

    if (confirmError) {
      toast.error(confirmError);
      setLoading(false);
    } else {
      if (paymentIntent.status === "succeeded") {
        const date = new Date();
        const transactionId = paymentIntent.id;
        const payment = {
          name: user?.displayName,
          email: user?.email,
          transactionId: transactionId,
          amount,
          date: date,
        };

        axiosSecure.post("/payment", payment).then((res) => {
          if (res.data.insertedId) {
            setLoading(false);
            toast.success("Successfully purchased coins");
            navigate("/recipes");
          }
        });
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-1/2 mx-auto my-14">
      <CardElement
        options={{
          style: {
            base: {
              fontSize: "20px",
              color: "#424770",
              fontFamily: "Comic Neue",
              "::placeholder": {
                color: "#aab7c4",
              },
            },
            invalid: {
              color: "#9e2146",
            },
          },
        }}
      />
      <button
        type="submit"
        disabled={!stripe || !clientSecret || loading}
        className="block mx-auto my-14 btn btn-secondary btn-lg"
      >
        Pay ${amount}
      </button>
    </form>
  );
};
