import { CloseSharp } from "@mui/icons-material";
import { TextField } from "@mui/material";

const Payment = ({ handleClick, close, bill }) => {
  return (
    <div className="bg-black bg-opacity-60 h-full w-full fixed top-0 bottom-0 left-0 right-0 z-10 ">
      <div
        className="bg-white p-[1em] drop-shadow-2xl
            fixed top-0 bottom-0 left-0 right-0 m-auto z-10
            h-fit w-[500px] rounded-2xl
            flex flex-col gap-[3em]"
      >
        <div
          className="absolute top-0 right-0 p-[1em] cursor-pointer"
          onClick={close}
        >
          <CloseSharp />
        </div>

        <h1 className="text-center text-[25px] font-medium">
          Payment Information
        </h1>

        {bill && (
          <div className="text-center font-medium">
            <p>Total Bill: {bill.tc} EUR</p>
            <p>Per Day Charges: {bill.pdc} EUR</p>
            <p>Reserved for {bill.d} days</p>
          </div>
        )}

        <TextField
          fullWidth
          label="Card Number"
          placeholder="xxxx-xxxx-xxxx-xxxx"
        />
        <div className="flex gap-[1em]">
          <TextField fullWidth label="Security Code" />
          <TextField fullWidth label="Expiry Date" placeholder="MM/YYYY" />
        </div>

        <button
          className="bg-stone-800 text-white p-[1em] rounded-full"
          onClick={handleClick}
        >
          CHECK OUT
        </button>
      </div>
    </div>
  );
};

export default Payment;
