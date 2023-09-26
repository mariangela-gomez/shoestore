import React from "react";
import { useSelector, useDispatch } from "react-redux";
import CartProduct from "../component/cartProduct";
import emptyCartImage from "../assest/empty.gif";
import { toast } from "react-hot-toast";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { clearCart } from "../redux/productSlide"; 

const Cart = () => {
  const productCartItem = useSelector((state) => state.product.cartItem);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const totalPrice = productCartItem.reduce(
    (acc, curr) => acc + parseInt(curr.total),
    0
  );
  const totalQty = productCartItem.reduce(
    (acc, curr) => acc + parseInt(curr.qty),
    0
  );

  const handlePayment = () => {
    if (user.email) {
      // Dispatch the clearCart action from Redux Toolkit
      dispatch(clearCart());

      Swal.fire({
        icon: "success",
        title: "Thank you for shopping!",
        showConfirmButton: false,
        timer: 1500,
      });

      // Clear the cart after displaying the message and navigating

      setTimeout(() => {
        navigate("/");
      }, 1500);
    } else {
      toast("You have not logged in!");
      setTimeout(() => {
        navigate("/login");
      }, 1000);
    }
  };

  return (
    <>
      <div className="p-2 md:p-4">
        <h2 className="text-lg md:text-2xl font-bold text-slate-600 text-center">
          Your Cart Items
        </h2>

        {productCartItem[0] ? (
          <div className="my-4 flex gap-3 justify-center">
            {/* display cart items  */}
            <div className="w-full max-w-3xl ">
              {productCartItem.map((el) => {
                return (
                  <CartProduct
                    key={el._id}
                    id={el._id}
                    name={el.name}
                    image={el.image}
                    category={el.category}
                    qty={el.qty}
                    total={el.total}
                    price={el.price}
                  />
                );
              })}
            </div>

            {/* total cart item  */}
            <div className="w-full max-w-md">
              <h2 className="bg-blue-500 text-white p-2 text-lg">Summary</h2>
              <div className="flex w-full py-2 text-lg border-b">
                <p>Total Items:</p>
                <p className="ml-auto w-32 font-bold">{totalQty}</p>
              </div>
              <div className="flex w-full py-2 text-lg border-b">
                <p>Total Price:</p>
                <p className="ml-auto w-32 font-bold">
                  <span className="text-red-500">$</span> {totalPrice}
                </p>
              </div>
              <button
                className="bg-red-500 w-full text-lg font-bold py-2 text-white"
                onClick={handlePayment}
              >
                Pay
              </button>
            </div>
          </div>
        ) : (
          <>
            <div className="flex w-full justify-center items-center flex-col">
              <img src={emptyCartImage} className="w-full max-w-xs rounded-full mt-5 mb-5" alt="Empty Cart" />
              <p className="text-slate-500 text-3xl font-bold">Empty Cart</p>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Cart;




