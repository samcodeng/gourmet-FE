import Header from "../../../layout/Header";
import Footer from "../../../layout/Footer";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "@/context/AppContext";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Address() {
  const router = useRouter();
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
      console.log(router.query.id);
      if (user.jwt == undefined) {
        await getUser();
      } else {
        axios
          .get("http://localhost:1337/api/addresses/" + router.query.id, {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${user.jwt}`,
            },
          })
          .then((response) => {
            console.log(response.data.data);
            let data = response.data.data.attributes;
            setfirstName(data.firstName);
            setlastName(data.lastName);
            setcity(data.city);
            setstate(data.state);
            setzipcode(data.zipcode);
            setaddress(data.address);
            setnumber(data.number);
            setalternateNumber(
              data.alternateNumber ? data.alternateNumber : ""
            );
          })
          .catch(() => {});
      }
    };
    cred();
  }, [user, router]);
  const add = () => {
    setLoading(true);
    axios
      .put(
        "http://localhost:1337/api/addresses/" + router.query.id,
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
        toast.success("Address updated", {
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
          <h1>Address</h1>
          <div className="auth-select active ">
            <form onSubmit={(e) => e.preventDefault()}>
              <label className="addLabel">First Name</label>
              <input
                className="m-input"
                placeholder="First Name"
                value={firstName}
                onChange={(event) => {
                  setfirstName(event.target.value);
                }}
              />
              {firstNameError && <p className="error">{firstNameError}</p>}
              <label className="addLabel">Last Name</label>
              <input
                className="m-input"
                placeholder="Last Name"
                value={lastName}
                onChange={(event) => {
                  setlastName(event.target.value);
                }}
              />
              {lastNameError && <p className="error">{lastNameError}</p>}

              <label className="addLabel">Phone Number</label>
              <input
                className="m-input"
                placeholder="Phone number"
                value={number}
                onChange={(event) => {
                  setnumber(event.target.value);
                }}
              />
              {numberError && <p className="error">{numberError}</p>}

              <label className="addLabel">Alt. Phone number (optional)</label>
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
              <label className="addLabel">Zipcode</label>
              <input
                className="m-input"
                placeholder="Zip Code"
                value={zipcode}
                onChange={(event) => {
                  setzipcode(event.target.value);
                }}
              />
              {zipcodeError && <p className="error">{zipcodeError}</p>}
              <label className="addLabel">State</label>
              <input
                className="m-input"
                placeholder="State"
                value={state}
                onChange={(event) => {
                  setstate(event.target.value);
                }}
              />
              {stateError && <p className="error">{stateError}</p>}
              <label className="addLabel">City</label>
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
                <span>UPDATE ADDRESS</span>{" "}
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

export default Address;
