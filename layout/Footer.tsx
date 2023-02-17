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
            <ul className="w-full flex items-center justify-center my-4 text-white text-sm">
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
            <ul className="flex items-center justify-center socials mb-4">
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
      <div className="bg-white p-6">
        <div className="w-full items-center justify-center payments flex mb-4">
          <img src="/images/Visa.png" />
          <img src="/images/Mastercard.png" />
          <img src="/images/PayPal.png" />
          <img src="/images/Amex.png" />
        </div>
        <p className="text-center text-sm">
          Gourmet Nibbles © 2023. All Rights Reserved.
        </p>
      </div>
    </>
  );
}

export default Footer;
