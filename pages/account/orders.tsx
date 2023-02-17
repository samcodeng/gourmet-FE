import Header from '../../layout/Header';
import Footer from '../../layout/Footer';
import { useRouter } from 'next/router';
import { useContext, useState } from 'react';
import { AppContext } from '@/context/AppContext';
import Modal from 'react-modal';
import Rating from '@/components/Rating';

function Orders() {
  Modal.setAppElement('#__next');
  const [open, setopen] = useState(false);
  const [rating, setrating] = useState(0);
  const router = useRouter();
  const { cartitems } = useContext(AppContext);
  return (
    <>
      <Header />
      <div className="auth-wrap">
        <img
          src="/images/arrow-down.png"
          className="goBack"
          onClick={() => router.back()}
        />
        <div className="wrap wrap2">
          <h1>Orders</h1>
          <div className="auth-select active">
            {cartitems.length == 0 ? (
              <p style={{ textAlign: 'center' }}>
                No orders have been made yet, continue shopping to add orders
              </p>
            ) : (
              <></>
            )}

            {cartitems.map((item: any, index: number) => {
              return (
                <div className="checkout-info" key={index}>
                  <div className="flex">
                    <div className="img-hold">
                      <img src="/images/prod1.png" />
                      <p style={{ fontSize: 12 }}>12/08/2022</p>
                    </div>
                    <div className="div">
                      <h3>{item.title}</h3>
                      <p>{item.description}</p>
                      <div className="sm-show">
                        <p>QTY {item.count}</p>
                        <h3>USD {item.price}</h3>
                      </div>
                      <button className="rem-btn" onClick={() => setopen(true)}>
                        Write Review
                      </button>
                    </div>
                    <p className="sm-hide">QTY {item.count}</p>
                  </div>
                  <h3 className="sm-hide">USD {item.price}</h3>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <Footer />
      {/*--modal---*/}
      <Modal
        isOpen={open}
        // onAfterOpen={afterOpenModal}
        style={customStyles}
        onRequestClose={() => setopen(false)}
        contentLabel="Example Modal"
      >
        <div className="cardModal">
          <h2 className="h2-b">
            Write a review
            <svg
              width="19"
              height="19"
              viewBox="0 0 19 19"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              onClick={() => setopen(false)}
            >
              <path
                d="M11.4109 9.00002L18.701 1.71002C18.8648 1.51872 18.9504 1.27264 18.9407 1.02096C18.9309 0.769288 18.8266 0.530549 18.6485 0.352454C18.4704 0.17436 18.2317 0.0700268 17.98 0.0603056C17.7283 0.0505845 17.4823 0.136191 17.291 0.300017L10.0009 7.59002L2.71095 0.290017C2.51965 0.126191 2.27357 0.0405852 2.0219 0.0503063C1.77022 0.0600275 1.53148 0.164359 1.35339 0.342454C1.17529 0.520548 1.07096 0.759287 1.06124 1.01096C1.05152 1.26264 1.13712 1.50872 1.30095 1.70002L8.59095 9.00002L1.29095 16.29C1.18627 16.3797 1.10125 16.49 1.04122 16.614C0.981202 16.7381 0.947471 16.8732 0.942151 17.011C0.936832 17.1487 0.960038 17.286 1.01031 17.4143C1.06059 17.5427 1.13685 17.6592 1.2343 17.7567C1.33175 17.8541 1.4483 17.9304 1.57663 17.9807C1.70495 18.0309 1.84228 18.0541 1.98 18.0488C2.11772 18.0435 2.25286 18.0098 2.37692 17.9497C2.50098 17.8897 2.6113 17.8047 2.70095 17.7L10.0009 10.41L17.291 17.7C17.4823 17.8638 17.7283 17.9494 17.98 17.9397C18.2317 17.93 18.4704 17.8257 18.6485 17.6476C18.8266 17.4695 18.9309 17.2307 18.9407 16.9791C18.9504 16.7274 18.8648 16.4813 18.701 16.29L11.4109 9.00002Z"
                fill="#46312A"
              />
            </svg>
          </h2>

          <div className="row">
            <div className="col-md-12">
              <Rating
                rating={rating}
                add={(num: number) => setrating(num)}
                canAdd={true}
              />
            </div>
            <div className="col-md-12">
              <input className="m-input" placeholder="Title" />
            </div>
            <div className="col-md-12">
              <input className="m-input" placeholder="Review" />
            </div>
          </div>
          <button className="p-btn p-btn2" onClick={() => setopen(false)}>
            <span>ADD REVIEW</span>
          </button>
        </div>
      </Modal>
    </>
  );
}

export default Orders;

const customStyles = {
  content: {
    top: '150px',
    left: '0',
    right: '0',
    bottom: 'auto',
    transform: '0',
    transition: 'all .4s ease-in-out',
    border: 0,
  },
};
