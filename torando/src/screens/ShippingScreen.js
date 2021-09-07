import React, { useState } from "react";
import * as turf from "@turf/turf";
import { useDispatch, useSelector } from "react-redux";
import { Autocomplete } from "@react-google-maps/api";
import Navbar from "../components/Navbar";
import PageHero from "../components/PageHero";
import FooterScreen from "../screens/FooterScreen";
import GoogleMapReact from "google-map-react";
import { saveShippingAddress } from "../actions/cartActions";
import styled from "styled-components";
import mapIcon from "../img/map-icon.svg";
import mapPin from "../img/map-pin.svg";

import circleToPolygon from "circle-to-polygon";
import HowItWorksScreen from "./HowItWorksScreen";
import { ButtonAddToCart2 } from "./CartScreen";
import CheckoutSteps from "../components/CheckoutSteps";

const Map = styled.section`
  margin: 0 auto;
  width: 1170px;
  height: 400px;
`;

export const InputContainer = styled.div`
  /* margin: 0 auto; */
  margin-top: 4rem;
  /* width: 1170px; */

  & h2 {
    font-family: "Lilita One", cursive;
    font-size: 1.6rem;
    margin-left: 2rem;
    color: #1e1d23;
    margin-bottom: 1rem;
  }

  & input {
    padding: 2rem;
    width: 100%;
    outline: none;
    border: 1px solid #1e1d23;

    &:focus {
      border: 1px solid #f59400;
    }
  }
`;

const ShippingScreen = ({ history }) => {
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  let places;

  const [coordinates, setCoordinates] = useState({});
  const [address, setAddress] = useState(shippingAddress.address);
  const [autocomplete, setAutocomplete] = useState("");
  const [city, setCity] = useState(shippingAddress.city);
  const [postalCode, setPostalCode] = useState(shippingAddress.postalCode);
  const [country, setCountry] = useState(shippingAddress.country);

  const dispatch = useDispatch();

  const onLoad = (autoC) => setAutocomplete(autoC);

  const onPlaceChanged = () => {
    const lat = autocomplete.getPlace().geometry.location.lat();
    const lng = autocomplete.getPlace().geometry.location.lng();

    let latitude = 50.10064848900932,
      longitude = 20.021011111934083;

    places = autocomplete.getPlace().name;

    const point = turf.point([lng, lat]);

    const polygon = circleToPolygon([longitude, latitude], 275);

    const inPolygon = turf.inside(point, polygon);

    setCoordinates({ lat, lng });

    if (inPolygon) {
      console.log("Jestes w kole");
      setAddress(places);
    } else {
      console.log("Nie ma Cie w kole");
    }
  };

  const defaultProps = {
    center: {
      lat: 50.100650209496614,
      lng: 20.02104061624839,
    },
    zoom: 14,
  };

  const handleApiLoaded = (map, maps) => {
    new maps.Circle({
      strokeColor: "#FF0000",
      strokeOpacity: 0.8,
      strokeWeight: 2,
      fillColor: "#FF0000",
      fillOpacity: 0.3,
      map,
      center: defaultProps.center,
      radius: 275,
    });

    new maps.Marker({
      position: defaultProps.center,
      icon: mapIcon,
      map: map,
    });
  };

  const AnyReactComponent = ({ text }) => (
    <img
      src={mapPin}
      alt="map-pin"
      style={{
        width: "25px",
        height: "25px",
      }}
    />
  );

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(saveShippingAddress({ address, city, postalCode, country }));
    history.push("/payment");
  };

  return (
    <>
      <Navbar />
      <PageHero name={"SHIPPING"} title={"/ Shipping"} />

      <CheckoutSteps step1 />
      <Map>
        <GoogleMapReact
          bootstrapURLKeys={{ key: "AIzaSyAZqlnwhZFwJtrdSNYhLGRB1SObg5T_fkc" }}
          defaultCenter={defaultProps.center}
          yesIWantToUseGoogleMapApiInternals
          center={
            Object.keys(coordinates).length === 0
              ? defaultProps.center
              : coordinates
          }
          defaultZoom={defaultProps.zoom}
          // yesIWantToUseGoogleMapApiInternals={true}
          onGoogleApiLoaded={({ map, maps }) => handleApiLoaded(map, maps)}
        >
          {Object.keys(coordinates).length > 0 && (
            <AnyReactComponent lat={coordinates.lat} lng={coordinates.lng} />
          )}
        </GoogleMapReact>
      </Map>
      <form className="inputs-map" onSubmit={submitHandler}>
        <Autocomplete onLoad={onLoad} onPlaceChanged={onPlaceChanged}>
          <InputContainer>
            <h2>Address</h2>
            <input type="text" required />
          </InputContainer>
        </Autocomplete>

        <InputContainer>
          <h2>City</h2>
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
        </InputContainer>

        <InputContainer>
          <h2>Postal Code</h2>
          <input
            type="text"
            value={postalCode}
            onChange={(e) => setPostalCode(e.target.value)}
          />
        </InputContainer>

        <InputContainer>
          <h2>Country</h2>
          <input
            type="text"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
          />
        </InputContainer>
        <ButtonAddToCart2 type="submit">Next</ButtonAddToCart2>
      </form>
      <div style={{ textAlign: "center", marginBottom: "4rem" }}></div>

      <HowItWorksScreen />
      <FooterScreen />
    </>
  );
};

export default ShippingScreen;
