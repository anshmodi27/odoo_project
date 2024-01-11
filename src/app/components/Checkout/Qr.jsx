import React from "react";

const Qr = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-3">
      <div className="w-32 h-32 border-2 border-black rounded-[15px]">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 30"
          x="0px"
          y="0px"
        >
          <path d="M17,4H7A3,3,0,0,0,4,7V17a3,3,0,0,0,3,3H17a3,3,0,0,0,3-3V7A3,3,0,0,0,17,4ZM14,5V8.13147L12.55469,7.168,12,6.79816l-.55469.36981L10,8.13147V5Zm5,12a2.00226,2.00226,0,0,1-2,2H7a2.0023,2.0023,0,0,1-2-2V7A2.0023,2.0023,0,0,1,7,5H9V9.06573a.50058.50058,0,0,0,.5014.50086.49438.49438,0,0,0,.27594-.08484L12,8l2.22266,1.48175a.49452.49452,0,0,0,.27594.08484A.50054.50054,0,0,0,15,9.06573V5h2a2.00226,2.00226,0,0,1,2,2Z" />
          <path d="M14,15H10a1,1,0,0,0,0,2h4a1,1,0,0,0,0-2Z" />
        </svg>
      </div>
      <div className="flex items-center justify-center gap-5">
        <div className="bg-black text-white rounded-md p-2 text-center">
          <button>Download Invoice</button>
        </div>
        <button className="bg-black text-white rounded-md p-2 text-center cursor-pointer">
          <p>Track Shipment</p>
        </button>
      </div>
    </div>
  );
};

export default Qr;
