import React from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const BuyCard = ({ coins, price }) => {
  const navigate = useNavigate();
  
  const handleBuyButton = (price) => {
    navigate(`/payment-gateway/${price}`);
  };
  return (
    <div className="py-8">
      <div className="bg-purple-400 flex flex-col items-center justify-center py-5 rounded-2xl">
        <p className="text-xl font-semibold">Buy {coins} coins </p>
        <p className="pt-4 text-lg">For</p>
        <p className="pt-4 text-2xl font-bold">${price}</p>
      </div>
      <div className="py-3 flex justify-center ">
        <button
          className="btn btn-success"
          onClick={() => handleBuyButton(price)}
        >
          Buy {coins} coins{" "}
        </button>
      </div>
    </div>
  );
};

export default BuyCard;
