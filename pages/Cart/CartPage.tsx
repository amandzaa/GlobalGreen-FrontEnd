import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store/store';
import { removeFromCart, clearCart } from '../../store/slices/cartSlice';

const CartPage: React.FC = () => {
  const cart = useSelector((state: RootState) => state.cart);
  const dispatch = useDispatch();

  const handleRemove = (id: number) => {
    dispatch(removeFromCart(id));
  };

  const handleClear = () => {
    dispatch(clearCart());
  };

  return (
    <div className="cart-page" style={{ maxWidth: 600, margin: '2rem auto', background: '#fff', borderRadius: 12, boxShadow: '0 2px 8px rgba(0,0,0,0.07)', padding: '2rem' }}>
      <h2 style={{ marginBottom: 24 }}>Shopping Cart</h2>
      {cart.items.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
            {cart.items.map((item, idx) => (
              <li key={item.id + '-' + idx} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid #eee', padding: '0.7rem 0' }}>
                <div style={{ flex: 1 }}>
                  <strong>{item.name}</strong>
                  <div style={{ color: '#4CAF50', fontWeight: 500 }}>${item.price.toFixed(2)}</div>
                </div>
                <button className="btn-secondary" style={{ marginLeft: 16 }} aria-label={`Remove ${item.name}`} onClick={() => handleRemove(item.id)}>Remove</button>
              </li>
            ))}
          </ul>
          <div style={{ marginTop: 24, fontWeight: 600, fontSize: '1.2rem' }}>Total: ${cart.total.toFixed(2)}</div>
          <div style={{ marginTop: 16 }}>
            <button className="btn-secondary" onClick={handleClear}>Clear Cart</button>
          </div>
        </>
      )}
    </div>
  );
};

export default CartPage; 