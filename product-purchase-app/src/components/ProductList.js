import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import Modal from 'react-modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome } from '@fortawesome/free-solid-svg-icons';


Modal.setAppElement('#root');

const Products = () => {
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState('');
  const [isCheckboxChecked, setIsCheckboxChecked] = useState(false);
  const navigate = useNavigate();
  const [isPurchased, setIsPurchased] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [creditCard, setCreditCard] = useState('');
  const [billingAddress, setBillingAddress] = useState('');

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser) {
      setUser(storedUser);
      setIsPurchased(storedUser.productPurchased);
      setIsCheckboxChecked(storedUser.productPurchased);
    } else {
      navigate('/login');
    }
  }, [navigate]);

  const handlePurchase = async () => {
    try {
      const response = await axios.post(`http://localhost:8080/api/users/${user.id}/purchase`);
      setUser(response.data);
      localStorage.setItem('user', JSON.stringify(response.data));
      setIsPurchased(true);
      setIsCheckboxChecked(true);
      setMessage('Product purchased successfully!');
      setIsModalOpen(false);
    } catch (error) {
      console.error('Error purchasing product:', error);
      setMessage('Error purchasing product: ' + (error.response?.data || 'Unknown error'));
    }
  };

  const handleCancelPurchase = async () => {
    try {
      const response = await axios.post(`http://localhost:8080/api/users/${user.id}/cancel`);
      setUser(response.data);
      localStorage.setItem('user', JSON.stringify(response.data));
      setIsPurchased(false);
      setIsCheckboxChecked(false);
      setMessage('Product purchase cancelled successfully!');
    } catch (error) {
      console.error('Error cancelling purchase:', error);
      setMessage('Error cancelling purchase: ' + (error.response?.data || 'Unknown error'));
    }
  };

  const handleDeleteAccount = async () => {
    try {
      await axios.delete(`http://localhost:8080/api/users/${user.id}`);
      localStorage.removeItem('user');
      setMessage('Account deleted successfully!');
      navigate('/');
    } catch (error) {
      console.error('Error deleting account:', error);
      setMessage('Error deleting account: ' + (error.response?.data || 'Unknown error'));
    }
  };

  const handleCheckboxChange = (e) => {
    setIsCheckboxChecked(e.target.checked);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setCreditCard('');
    setBillingAddress('');
    setIsModalOpen(false);
  };

  const handleModalSubmit = (e) => {
    e.preventDefault();
    if (!creditCard || !billingAddress) {
      setMessage('Please fill in all required fields.');
      return;
    }
    setCreditCard('');
    setBillingAddress('');
    handlePurchase();
  };

  return (
    <div className="products-page">
      <h2 className="title">
      <Link to="/" className="home-link-products">
        <FontAwesomeIcon icon={faHome} />
      </Link> Products
      </h2>
      {user ? (
        <div className="user-info">
          <p>Welcome, {user.username}!</p>
          <div className="product-selection">
            <label>
              <input
                type="checkbox"
                checked={isCheckboxChecked}
                onChange={handleCheckboxChange}
                disabled={isPurchased}
              />
              The Product
            </label>
          </div>
          {isPurchased ? (
            <button onClick={handleCancelPurchase} className="btn btn-cancel">
              Cancel Purchase
            </button>
          ) : (
            <button onClick={openModal} className="btn btn-purchase" disabled={!isCheckboxChecked}>
              Purchase Product
            </button>
          )}
          <button onClick={handleDeleteAccount} className="btn btn-delete">
            Delete Account
          </button>
        </div>
      ) : (
        <p>Loading...</p>
      )}
      {message && <p className="message">{message}</p>}
      
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Purchase Product Modal"
        className="modal"
        overlayClassName="modal-overlay"
      >
        <h2>Purchase Product</h2>
        <form onSubmit={handleModalSubmit}>
          <div className="form-group-modal">
            <label>Credit Card:</label>
            <input
              type="text"
              value={creditCard}
              onChange={(e) => setCreditCard(e.target.value)}
              required
            />
          </div>
          <div className="form-group-modal">
            <label>Billing Address:</label>
            <input
              type="text"
              value={billingAddress}
              onChange={(e) => setBillingAddress(e.target.value)}
              required
            />
          </div>
          <div className="modal-buttons">
            <button type="submit" className="btn btn-modal-submit">Submit</button>
            <button type="button" className="btn btn-modal-cancel" onClick={closeModal}>Cancel</button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default Products;
