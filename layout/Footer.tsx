import { Parallax, Background } from "react-parallax";

function Footer() {
  return (
    <>
      <Parallax bgImage="/images/main2.jpg" strength={150}>
        <div className="parallax-inner">
          <div className="wrap">
            <p className="text-white max-w-[500px] text-center m-auto">
              Gourmet Nibbles is a Nigerian food product Lorem ipsum dolor sit
              amet consectetur adipisicing elit. Voluptatem accusamus voluptates
              iusto nostrum, consequuntur placeat suscipit. Molestiae eaque ipsa
              a ipsam fugit unde est at, amet quo vel aspernatur possimus.
            </p>
            <ul className="flex items-center justify-center w-full my-4 text-sm text-white">
              <li>
                <a className="mx-3">About Us</a>
              </li>
              <li>
                <a>|</a>
              </li>
              <li>
                <a className="mx-3">Return Policy</a>
              </li>
              <li>
                <a>|</a>
              </li>
              <li>
                <a className="mx-3">Privacy Policy</a>
              </li>
              <li>
                <a>|</a>
              </li>
              <li>
                <a className="mx-3">Contact Us</a>
              </li>
            </ul>
            <ul className="flex items-center justify-center mb-4 socials">
              <li>
                <a className="mx-3">
                  <i className="fab fa-facebook-f"></i>
                </a>
              </li>
              <li>
                <a className="mx-3">
                  <i className="fab fa-instagram"></i>
                </a>
              </li>

              <li>
                <a className="mx-3">
                  <i className="fab fa-twitter"></i>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </Parallax>
      <div className="p-6 bg-white">
        <div className="flex items-center justify-center w-full mb-4 payments">
          <img src="/images/Visa.png" alt="visa" />
          <img src="/images/Mastercard.png" alt="mastercard" />
          <img src="/images/PayPal.png" alt="paypal" />
          <img src="/images/Amex.png" alt="amex" />
        </div>
        <p className="text-sm text-center">
          Gourmet Nibbles © 2023. All Rights Reserved.
        </p>
      </div>
    </>
  );
}

export default Footer;
