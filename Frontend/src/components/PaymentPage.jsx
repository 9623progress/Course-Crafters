import React, { useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

const PaymentPage = ({ userId, courseId }) => {
  const [loading, setLoading] = useState(false);
  const user = useSelector((state) => state.user);

  const handlePayment = async () => {
    try {
      setLoading(true);

      // Step 1: Create order on the backend
      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/api/user/create-order`, // Your backend URL to create the order
        {
          userId: userId,
          courseId: courseId,
        },
        {
          withCredentials: true,
        }
      );
      // console.log(response.data);

      const { order } = response.data;
      const options = {
        key: import.meta.env.VITE_API_RAZORPAY_KEY, // Your Razorpay Test Key ID
        amount: order.amount, // Amount in paise (1 INR = 100 paise)
        currency: "INR",
        name: "Course Purchase",
        description: "Payment for course",
        order_id: order.id,
        handler: async function (response) {
          // Step 2: Handle payment success
          const { payment_id, order_id } = response;

          const paymentResponse = await axios.post(
            `${import.meta.env.VITE_API_BASE_URL}/api/user/payment-success`, // Your backend URL to handle payment success
            {
              paymentId: payment_id,
              orderId: order_id,
            },
            { withCredentials: true }
          );

          if (paymentResponse.status === 200) {
            alert("Payment Successful!");
          }
        },
        prefill: {
          name: user.name,
          email: user.email,
          contact: user.mobile, // Test number for Razorpay's test mode
        },
        theme: {
          color: "#0000FF",
        },
      };

      const rzp1 = new window.Razorpay(options);
      rzp1.open();
      setLoading(false);
    } catch (error) {
      console.error("Error in payment", error);
      setLoading(false);
    }
  };

  return (
    <div>
      <button
        className=" bg-blue-700 p-2 text-white  text-lg rounded-xl w-full"
        onClick={handlePayment}
        disabled={loading}
      >
        {loading ? "Processing..." : "Pay Now"}
      </button>
    </div>
  );
};

export default PaymentPage;
