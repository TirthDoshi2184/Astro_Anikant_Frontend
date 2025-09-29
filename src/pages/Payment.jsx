import axios from 'axios';
import React, { useState } from 'react';

export const Payment = () => {


    const [OrderDetails, setOrderDetails] = useState({})
    const handleCreateOrder = async () => {
        try {
            const order = await axios.post("https://astroanikantbackend-2.onrender.com/payment/createorder", {
                amount: 500,
                currency: "INR",
                receipt: "receipt_order_123",
            });

            setOrderDetails(order.data);
            displayRazorpay(order.data);
        } catch (error) {
            console.error("Order creation failed:", error);
        }
    };

    const loadScript = (src) => {
        return new Promise((resolve) => {
            const script = document.createElement("script");
            script.src = src;
            script.onload = () => resolve(true);
            script.onerror = () => resolve(false);
            document.body.appendChild(script);
        });
    };

    const displayRazorpay = async (orderData) => {
        const res = await loadScript(
            "https://checkout.razorpay.com/v1/checkout.js"
        );

        if (!res) {
            alert("Razorpay SDK failed to load. Are you online?");
            return;
        }

        const options = {
            key: "rzp_test_m60EaJoASbqtGR",
            amount: orderData.amount,
            currency: orderData.currency,
            name: "Astro Anekant",
            description: "Test Transaction",
            order_id: orderData.id,
            handler: async function (response) {
                const res = await axios.post("/verify-payment", {
                    razorpay_order_id: response.razorpay_order_id,
                    razorpay_payment_id: response.razorpay_payment_id,
                    razorpay_signature: response.razorpay_signature,
                });

                if (res.data.status === "success") {
                    alert("Payment verified successfully!");
                } else {
                    alert("Payment verification failed.");
                }
            },
            prefill: {
                name: "Astro Anekant",
                email: "astro@gmail.com",
                contact: "09010291209",
            },
            theme: {
                color: "#61dafb",
            },
        };

        const paymentObject = new window.Razorpay(options);
        paymentObject.open();
    };
    return (
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
            
            <button style={{ padding: "10px 20px", fontSize: "16px", cursor: "pointer",color:"white",backgroundColor:"black" }} onClick={handleCreateOrder}>
                Pay Here
            </button>
        </div>
    );
};

export default Payment;