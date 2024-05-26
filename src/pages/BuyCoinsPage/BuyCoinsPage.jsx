import React from "react";
import { COINS } from "../../static/coins/coins";
import BuyCard from "./component/BuyCard";

const BuyCoinsPage = () => {
    
  return (
    <div className="py-28 text-center">
      <h1 className="mb-6 text-2xl font-bold">Buy Coins in One Click 😀 </h1>
      <div className="grid grid-cols-3 gap-20 w-4/5 mx-auto">
        {COINS.map(({ coins, price }) => (
          <BuyCard coins={coins} price={price} />
        ))}
      </div>
    </div>
  );
};

export default BuyCoinsPage;
