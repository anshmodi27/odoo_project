import Checkout from "./components/Checkout/Checkout";
import Product from "./components/Product/Product";

export default function Home() {
  return (
    <>
      <div className="mt-10 flex items-center justify-center">
        <input
          type="text"
          placeholder="Search Here"
          className="border-2 border-black rounded-md p-2 outline-none"
        />
      </div>
      <div className="p-10 font-nunito flex flex-col sm:flex-row items-start justify-center gap-5">
        <Product />
        <Checkout />
      </div>
    </>
  );
}
