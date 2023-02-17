import Header from "../../layout/Header";
import Footer from "../../layout/Footer";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "@/context/AppContext";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function AddAddress() {
  const [loading, setLoading] = useState(false);
  const [firstName, setfirstName] = useState("");
  const [firstNameError, setfirstNameError] = useState("");
  const [lastName, setlastName] = useState("");
  const [lastNameError, setlastNameError] = useState("");
  const [number, setnumber] = useState("");
  const [numberError, setnumberError] = useState("");
  const [alternateNumber, setalternateNumber] = useState("");
  const [alternateNumberError, setaltNumberError] = useState("");
  const [address, setaddress] = useState("");
  const [addressError, setaddressError] = useState("");
  const [zipcode, setzipcode] = useState("");
  const [zipcodeError, setzipcodeError] = useState("");
  const [state, setstate] = useState("");
  const [stateError, setstateError] = useState("");
  const [city, setcity] = useState("");
  const [cityError, setcityError] = useState("");
  const { user, getUser, hotReload, setHotReload } = useContext(AppContext);
  useEffect(() => {
    const cred = async () => {
      if (user.jwt == undefined) {
        await getUser();
      }
    };
    cred();
  }, [user]);
  const add = () => {
    setLoading(true);
    axios
      .post(
        "http://localhost:1337/api/addresses/",
        {
          data: {
            number: number,
            alternateNumber: alternateNumber,
            firstName: firstName,
            lastName: lastName,
            zipcode: zipcode,
            city: city,
            state: state,
            address: address,
            user: user.user.id,
          },
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.jwt}`,
          },
        }
      )
      .then((response) => {
        toast.success("Address added", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
        setLoading(false);
        setTimeout(() => {
          router.push("/account/addresses");
        }, 3000);
      })
      .catch((e) => {
        console.log(e);
        toast.error("Error!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
        setLoading(false);
      });
  };

  function isEnableAddress() {
    return (
      firstName != "" &&
      firstNameError == "" &&
      lastName != "" &&
      lastNameError == "" &&
      address != "" &&
      addressError == "" &&
      zipcode != "" &&
      zipcodeError == "" &&
      state != "" &&
      stateError == "" &&
      number != "" &&
      numberError == "" &&
      alternateNumberError == "" &&
      city != "" &&
      cityError == ""
    );
  }
  const router = useRouter();
  return (
    <>
      <ToastContainer />
      <Header />
      <div className="auth-wrap">
        <img
          src="/images/arrow-down.png"
          className="goBack"
          onClick={() => router.back()}
        />
        <div className="wrap f-p">
          <h1>Add Address</h1>
          <div className="auth-select active ">
            <form onSubmit={(e) => e.preventDefault()}>
              <input
                className="m-input"
                placeholder="First Name"
                value={firstName}
                onChange={(event) => {
                  setfirstName(event.target.value);
                }}
              />
              {firstNameError && <p className="error">{firstNameError}</p>}
              <input
                className="m-input"
                placeholder="Last Name"
                value={lastName}
                onChange={(event) => {
                  setlastName(event.target.value);
                }}
              />
              {lastNameError && <p className="error">{lastNameError}</p>}

              <input
                className="m-input"
                placeholder="Phone number"
                value={number}
                onChange={(event) => {
                  setnumber(event.target.value);
                }}
              />
              {numberError && <p className="error">{numberError}</p>}

              <input
                className="m-input"
                placeholder="Alt. Phone number (optional)"
                value={alternateNumber}
                onChange={(event) => {
                  setalternateNumber(event.target.value);
                }}
              />
              {alternateNumberError && (
                <p className="error">{alternateNumberError}</p>
              )}

              <input
                className="m-input"
                placeholder="Address"
                value={address}
                onChange={(event) => {
                  setaddress(event.target.value);
                }}
              />
              {addressError && <p className="error">{addressError}</p>}

              <input
                className="m-input"
                placeholder="Zip Code"
                value={zipcode}
                onChange={(event) => {
                  setzipcode(event.target.value);
                }}
              />
              {zipcodeError && <p className="error">{zipcodeError}</p>}

              <input
                className="m-input"
                placeholder="State"
                value={state}
                onChange={(event) => {
                  setstate(event.target.value);
                }}
              />
              {stateError && <p className="error">{stateError}</p>}

              <input
                className="m-input"
                placeholder="City"
                value={city}
                onChange={(event) => {
                  setcity(event.target.value);
                }}
              />
              {cityError && <p className="error">{cityError}</p>}

              <button
                className="p-btn p-btn2"
                style={{ opacity: isEnableAddress() ? 1 : 0.8 }}
                onClick={() => (isEnableAddress() ? add() : "")}
              >
                <span>ADD NEW ADDRESS</span>{" "}
                {loading && (
                  <div className="lds-ripple">
                    <div></div>
                    <div></div>
                  </div>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default AddAddress;
