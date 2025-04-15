import React, { useState, useEffect, useContext } from "react";
import CartContext from "../context/CartContext";
import SimilarProducts from "../components/SimilarProducts";
import UseTitle from "../Hooks/UseTitle";
import helloIcon from "../assets/helloIcon.svg";
import orderIcon from "../assets/orderIcon.svg";
import inbox from "../assets/inboxx.svg";
import logOut from "../assets/logoutIcon.svg";
import checkIcon from "../assets/checkIcon.svg";

const Order = () => {
  const today = new Date().toLocaleDateString();
  const { cart, setCart } = useContext(CartContext);
  UseTitle("Your OrderPage | Eggys place");

  const [currentPage, setCurrentPage] = useState(1);
  const ordersPerPage = 10;

  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = cart.slice(indexOfFirstOrder, indexOfLastOrder);
  const totalPages = Math.ceil(cart.length / ordersPerPage);

  function handleRemove(cartId) {
    const updatedCart = cart.filter((item) => item._id !== cartId);
    setCart(updatedCart);
  }

  return (
    <>
      <header className="bg-[#252422] min-h-screen">
        <main className="wrapper flex flex-col md:flex-row gap-6 p-4">
          {/* Sidebar */}
          <aside className="hidden md:block w-60 bg-black text-white p-4 space-y-4 rounded-xl h-[250px] ">
            <div className="flex items-center gap-2 hover:bg-[#B67B0F] px-4 py-2 cursor-pointer">
              <img src={helloIcon} alt="accountIcon" />
              <span>My Account</span>
            </div>
            <div className="flex items-center gap-2 bg-[#B67B0F] px-4 py-2 cursor-pointer">
              <img src={orderIcon} alt="orderIcon" />
              <span>Orders</span>
            </div>
            <div className="flex items-center gap-2 hover:bg-[#B67B0F] px-4 py-2 cursor-pointer">
              <img src={inbox} alt="inbox" />
              <span>Inbox</span>
            </div>
            <button
              className="flex items-center gap-2 text-red-600 hover:text-red-700 hover:bg-[#B67B0F] px-4 py-2"
              onClick={() => document.getElementById("logout_modal").showModal()}
            >
              <img src={logOut} alt="logout" /> Log Out
            </button>
            <dialog id="logout_modal" className="modal">
              <form method="dialog" className="modal-box bg-[#252422] text-white text-center">
                <img className="mb-4 mx-auto" src={checkIcon} alt="check" />
                <h3 className="text-lg font-bold">Log Out</h3>
                <p className="py-4">Are you sure you want to log out?</p>
                <div className="flex justify-center gap-4">
                  <button className="btn bg-[#252422] text-white">Log Out</button>
                  <button className="btn bg-[#B67B0F] text-white">Cancel</button>
                </div>
              </form>
            </dialog>
          </aside>

          {/* Main Content */}
          <section className="flex-1 bg-black text-white rounded-xl p-4">
            <h3 className="text-2xl font-semibold mb-2">Orders</h3>
            <hr className="mb-4 border-[#FBFBFB]" />

            <div className="flex gap-6 text-lg border-b border-[#B67B0F] pb-2">
              <p className="border-b-4 border-[#B67B0F]">Ongoing/Delivered</p>
              <p className="text-gray-400 cursor-pointer">Cancelled</p>
            </div>

            {/* Order List */}
            <div className="mt-6 grid grid-cols-1 gap-4">
              {currentOrders.map((item) => (
                <div
                  key={item._id}
                  className="flex flex-col md:flex-row bg-[#252422] shadow-md rounded-lg overflow-hidden"
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full md:w-40 h-40 object-cover"
                  />
                  <div className="flex flex-col justify-between p-4 flex-1">
                    <div>
                      <h2 className="text-xl font-bold">{item.title}</h2>
                      <p className="text-lg">&#8358;{item.price}</p>
                      <p className="text-sm text-gray-300">{today}</p>
                      <span className="inline-block mt-2 bg-green-600 text-xs text-white px-3 py-1 rounded-full">
                        Delivered
                      </span>
                    </div>
                    <div className="text-right mt-4 md:mt-0">
                      <p className="text-[#B67B0F] text-sm cursor-pointer">View Details...</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            <div className="flex justify-between items-center mt-8 text-lg">
              <p>
                Page {currentPage} of {totalPages}
              </p>
              <div className="flex gap-4">
                <button
                  onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className={`text-gray-400 px-3 py-1 rounded ${currentPage === 1
                      ? "opacity-50 cursor-not-allowed"
                      : "hover:text-white cursor-pointer"
                    }`}
                >
                  Prev
                </button>
                <button
                  onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className={`text-gray-400 px-3 py-1 rounded ${currentPage === totalPages
                      ? "opacity-50 cursor-not-allowed"
                      : "hover:text-white cursor-pointer"
                    }`}
                >
                  Next
                </button>
              </div>

            </div>
          </section>
        </main>

        <section className="bg-[#2F2F2F] p-4">
          <SimilarProducts />
        </section>
      </header>
    </>
  );
};

export default Order;
