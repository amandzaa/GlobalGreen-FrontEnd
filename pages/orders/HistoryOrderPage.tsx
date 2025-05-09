import React, { useEffect, useState } from 'react';

const HistoryOrderPage: React.FC = () => {
    const [orders, setOrders] = useState<any[]>([]);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await fetch('https://globalgreen-backend-production.up.railway.app/orders/');
                const data = await response.json();
                setOrders(data); // Handle the fetched data as needed
            } catch (error) {
                console.error('Error fetching orders:', error);
            }
        };

        fetchOrders();
    }, []);

    return (
        <div>
            <h1>Your Orders</h1>
            {orders.length > 0 ? (
                orders.map((order, index) => (
                    <div key={index}>
                        <p>Order ID: {order.id}</p>
                        <p>Date: {order.date}</p>
                        <p>Amount: ${order.amount}</p>
                    </div>
                ))
            ) : (
                <p>Your past orders will be displayed here.</p>
            )}
        </div>
    );
};

export default HistoryOrderPage;