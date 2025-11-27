import { useContext, useState } from "react";
import Title from "../components/Title";
import CartTotal from "../components/cartTotal";
import { assets } from "../assets/assets";
import { ShopContext } from "../context/ShopCreateContext";
import { BACKEND_URL } from "../util/URL";
import axios from "axios";
import { toast } from "react-toastify";

const Placeorder = () => {
  const [method, setMethod] = useState("cod");
  const {
    navigate,
    token,
    cartItems,
    setCartItems,
    getCartAmount,
    delivery_fee,
    products,
  } = useContext(ShopContext);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    country: "",
    state: "",
    city: "",
    zipcode: "",
    phone: "",
  });

  const onchangeHandler = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const onSubmitHandler = async (e) => {
    try {
      e.preventDefault();

      let orderItems = [];

      for (const items in cartItems) {
        for (const item in cartItems[items]) {
          if (cartItems[items][item] > 0) {
            const itemInfo = structuredClone(
              products.find((product) => product._id === items)
            );
            if (itemInfo) {
              itemInfo.size = item;
              itemInfo.qty = cartItems[items][item];
              orderItems.push(itemInfo);
            }
          }
        }
      }

      let orderData = {
        address: formData,
        items: orderItems,
        amount: getCartAmount() + delivery_fee,
      };

      switch (method) {
        case "cod": {
          if (!token) {
            console.log("Token not found for cod place order");
            return null;
          }

          const response = await axios.post(
            `${BACKEND_URL}/api/order/placeorder`,
            orderData,
            { headers: { token } }
          );

          if (response.data.success) {
            setCartItems({});
            navigate("/orders");
          } else {
            toast.error(response.data.message);
          }

          break;
        }

        case "razorpay":
          orderData.paymentMethod = "razorpay";
          toast.info("Razorpay integration not complete. Using default.");
          break;

        case "stripe": {
          if (!token) {
            console.log("Token not found for stripe placeorder");
            return null;
          }

          const responseStripe = await axios.post(
            `${BACKEND_URL}/api/order/stripe`,
            orderData,
            { headers: { token } }
          );

          console.log("responsestripe: ", responseStripe);

          if (responseStripe.data.success) {
            const { session_url } = responseStripe.data;
            console.log("case stripe success url: ", session_url);
            window.location.replace(session_url);
          } else {
            toast.error("error with stripe payment");
          }
          break;
        }

        default:
          orderData.paymentMethod = "cod";
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    }
  };

  return (
    <form
      onSubmit={onSubmitHandler}
      className="flex flex-col sm:flex-row gap-8 sm:gap-24 pt-5 sm:pt-14 min-h-[80vh] border-t border-gray-800"
    >
      <div className="flex flex-col gap-5 w-full sm:max-w-[480px]">
        <div className="text-xl sm:text-2xl my-3">
          <Title text1={"DELIVERY"} text2={"INFORMATION"} />
        </div>

        <div className="input-style">
          <input
            onChange={onchangeHandler}
            name="firstName"
            value={formData.firstName}
            className="input-style"
            type="text"
            placeholder="First Name"
            required
          />
          <input
            onChange={onchangeHandler}
            name="lastName"
            value={formData.lastName}
            className="input-style"
            type="text"
            placeholder="Last Name"
            required
          />
        </div>

        <input
          onChange={onchangeHandler}
          name="email"
          value={formData.email}
          className="input-style"
          type="email"
          placeholder="Email Address"
          required
        />

        <input
          onChange={onchangeHandler}
          name="street"
          value={formData.street}
          className="input-style"
          type="text"
          placeholder="Street Address"
          required
        />

        <div className="flex gap-3">
          <input
            onChange={onchangeHandler}
            name="city"
            value={formData.city}
            className="input-style"
            type="text"
            required
            placeholder="City"
          />
          <input
            onChange={onchangeHandler}
            name="state"
            value={formData.state}
            className="input-style"
            type="text"
            placeholder="State"
            required
          />
        </div>

        <div className="flex gap-3">
          <input
            onChange={onchangeHandler}
            name="country"
            value={formData.country}
            className="input-style"
            type="text"
            placeholder="Country"
            required
          />
          <input
            onChange={onchangeHandler}
            name="zipcode"
            value={formData.zipcode}
            className="input-style [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
            type="number"
            placeholder="Zipcode"
            required
          />
        </div>

        <input
          onChange={onchangeHandler}
          name="phone"
          value={formData.phone}
          className="input-style"
          type="tel"
          placeholder="Phone Number"
          required
        />
      </div>

      <div className="mt-0 w-full sm:min-w-[400px]">
        <div className="mt-8">
          <CartTotal />
        </div>

        <div className="mt-12">
          <Title text1={"PAYMENT"} text2={"METHOD"} />

          <div className="flex gap-3 flex-wrap lg:flex-row">

            <div
              onClick={() => setMethod("stripe")}
              className={`flex items-center gap-3 border p-2 px-3 cursor-pointer bg-gray-900 ${
                method === "stripe"
                  ? "border-emerald-400"
                  : "border-gray-700"
              }`}
            >
              <p
                className={`min-w-3.5 h-3.5 border rounded-full border-gray-400 transition-colors ${
                  method === "stripe"
                    ? "bg-emerald-400 border-emerald-400"
                    : "bg-transparent"
                }`}
              ></p>
              <img
                className="h-5 mx-4 filter invert"
                src={assets.stripe_logo}
                alt="Stripe Logo"
              />
            </div>

            <div
              onClick={() => setMethod("razorpay")}
              className={`flex items-center gap-3 border p-2 px-3 cursor-pointer bg-gray-900 ${
                method === "razorpay"
                  ? "border-emerald-400"
                  : "border-gray-700"
              }`}
            >
              <p
                className={`min-w-3.5 h-3.5 border rounded-full border-gray-400 transition-colors ${
                  method === "razorpay"
                    ? "bg-emerald-400 border-emerald-400"
                    : "bg-transparent"
                }`}
              ></p>
              <img
                className="h-5 mx-4 filter invert"
                src={assets.razorpay_logo}
                alt="Razorpay Logo"
              />
            </div>

            <div
              onClick={() => setMethod("cod")}
              className={`flex items-center gap-3 border p-2 px-3 cursor-pointer bg-gray-900 ${
                method === "cod"
                  ? "border-emerald-400"
                  : "border-gray-700"
              }`}
            >
              <p
                className={`min-w-3.5 h-3.5 border rounded-full border-gray-400 transition-colors ${
                  method === "cod"
                    ? "bg-emerald-400 border-emerald-400"
                    : "bg-transparent"
                }`}
              ></p>
              <p className="text-gray-300 font-medium text-sm">
                CASH ON DELIVERY
              </p>
            </div>
          </div>

          <div className="w-full text-end border-t border-gray-800 mt-8 pt-6">
            <button
              type="submit"
              className="bg-emerald-500 text-gray-900 font-bold px-8 py-3 text-sm rounded hover:bg-emerald-400 transition-colors"
            >
              PLACE ORDER
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default Placeorder;
