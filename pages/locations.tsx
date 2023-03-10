import Footer from "../layout/Footer";
import Header from "../layout/Header";
import Link from "next/link";
import { createClient } from "contentful";
import ProductItem from "../components/ProductItem";
import axios from "axios";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import Image from "next/image";
import { useCallback, useContext, useEffect, useMemo, useState } from "react";
import { AppContext } from "../context/AppContext";
import { Parallax } from "react-parallax";
import { GoogleMap, useJsApiLoader } from "@react-google-maps/api";
export default function Home({ categories }: any) {
  const { formatNumber } = useContext(AppContext);
  const containerStyle = {
    width: "400px",
    height: "400px",
  };

  const center = {
    lat: -3.745,
    lng: -38.523,
  };
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: `${process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY}`,
  });

  const [map, setMap] = useState(null);
  const onLoad = useCallback(function callback(map) {
    // This is just an example of getting and using the map instance!!! don't just blindly copy!
    const bounds = new window.google.maps.LatLngBounds(center);
    map.fitBounds(bounds);

    setMap(map);
  }, []);
  const onUnmount = useCallback(function callback(map) {
    setMap(null);
  }, []);
  return isLoaded ? (
    <>
      <Header categories={categories} />
      <Parallax bgImage="/images/main.jpg" strength={150}>
        <div className="parallax-inner">
          <div className="wrap">
            <h1 className="pt-12 pb-4 text-lg text-center text-white">
              Our Locations
            </h1>
            <p className="text-white max-w-[500px] text-center m-auto">
              Gourmet Nibbles ipsum dolor sit amet consectetur adipisicing elit.
            </p>
          </div>
        </div>
      </Parallax>{" "}
      <div className="map">
        <h2 className="map-h2">Come Visit Us At Our Campus</h2>

        <div className="google-map">
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={10}
            onLoad={onLoad}
            onUnmount={onUnmount}
          >
            {/* Child components, such as markers, info windows, etc. */}
            <></>
          </GoogleMap>
        </div>
      </div>
      <Footer />
    </>
  ) : (
    <></>
  );
}

export async function getStaticProps() {
  const client = createClient({
    space: `${process.env.CONTENTFUL_SPACE}`,
    accessToken: `${process.env.CONTENTFUL_KEY}`,
  });
  let categories: any = [];
  try {
    const res2 = await client.getEntries({
      content_type: "categories",
    });
    categories = res2.items;
  } catch {}
  return {
    props: {
      categories,
    },
  };
}
