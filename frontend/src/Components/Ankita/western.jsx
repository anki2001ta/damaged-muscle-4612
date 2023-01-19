import React, { useEffect, useState } from "react";
import "./western.css";
import axios from "axios";
import { BsFillBagPlusFill } from "react-icons/bs";
import { Spinner, Alert, AlertIcon, useToast } from "@chakra-ui/react";
import { useNavigate } from "react-router";
import { useSelector, useDispatch } from "react-redux";

import {
  getBeverageError,
  getBeverageRequest,
  getBeverageSuccess,
} from "./Redux/western/action";
const CurrentIndivisualData = (payload) => {
  return axios.put(
    "https://shy-puce-cod-hose.cyclic.app/mens/indivisualPageData",
    payload
  );
};

const getData = () => {
  return axios.get("https://shy-puce-cod-hose.cyclic.app/mens");
};

const sortDataByAsc = () => {
  return axios.get(
    "https://shy-puce-cod-hose.cyclic.app/mens?_sort=price&_order=asc"
  );
};

const sortDataByDesc = () => {
  return axios.get(
    "https://shy-puce-cod-hose.cyclic.app/mens?_sort=price&_order=desc"
  );
};

const AddToCart = (payload) => {
  return axios.post("https://kiwi-discovered-pyjama.glitch.me/cart", payload);
};

const filterByCategory = (param) => {
  return axios.get(
    `https://shy-puce-cod-hose.cyclic.app/mens?category=${param}`
  );
};

const Western = () => {
  
  const list = useSelector((store) => store.BeverageReducer.list);
  // const [isLoading, setIsLoading] = useState(false);
  const isLoading = useSelector((store) => store.BeverageReducer.isLoading);
  const filterData = useSelector((store) => store.BeverageReducer.filterData);
  // const [filterData, setFilterData] = useState(["Phone", "Watch"]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const toast = useToast();

  const handleGetData = () => {
    // setIsLoading(true);
    dispatch(getBeverageRequest());
    getData()
      .then((res) => {
        // setIsLoading(false);
        // setList(res.data);
        dispatch(getBeverageSuccess(res.data));
      })
      .catch((err) => dispatch(getBeverageError()));
  };

  const handleSortByAsc = () => {
    // setIsLoading(true);
    dispatch(getBeverageRequest());
    sortDataByAsc().then((res) => {
      // setIsLoading(false);
      // setList(res.data);
      dispatch(getBeverageSuccess(res.data));
    });
  };

  const handlesortByDesc = () => {
    // setIsLoading(true);
    dispatch(getBeverageRequest());
    sortDataByDesc().then((res) => {
      // setIsLoading(false);
      dispatch(getBeverageSuccess(res.data));
      // setList(res.data);
    });
  };

  const handleFilterData = (item) => {
    dispatch(getBeverageRequest());
    filterByCategory(item).then((res) =>
      dispatch(getBeverageSuccess(res.data))
    );
  };

  const resetFilters = () => {
    handleGetData();
  };

  const PostToCart = (item) => {
    AddToCart(item).then((res) => {
      //   <Alert status="success">
      //     <AlertIcon />
      //     Item Added Successfully to the cart
      //   </Alert>;
      // alert("Item Added Successfully to the cart");
      toast({
        title: "Verification Reminder",
        description: `"Item Added To Cart Successfully."`,
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
    });
  };

  const handleCurrentData = (item) => {
    // console.log(item)
    CurrentIndivisualData(item).then((res) =>
      // console.log(res.data)
      navigate("/indivisualPage")
    );
  };
  useEffect(() => {
    handleGetData();
  }, []);
  // console.log("filter", filterCategory);

  if (isLoading) return <h1 style={{ textAlign: "center" }}>Loading ...</h1>;
  return (
    <div className="productPage">
      <div className="options">
        <h3>Sort Data By: </h3>
        <button
          className="btn"
          style={{ textAlign: "center" }}
          onClick={() => {
            // setList(list.sort((a, b) => a.price - b.price));
            handleSortByAsc();
          }}
        >
          Ascending
        </button>
        <button
          className="btn"
          style={{ textAlign: "center" }}
          onClick={() => {
            // setList(list.sort((a, b) => b.price - a.price));
            handlesortByDesc();
          }}
        >
          Descending
        </button>
        <h3>Filter Data by category :</h3>
        {filterData.map((item, index) => (
          <button
            className="btn"
            key={index}
            onClick={() => handleFilterData(item)}
          >
            {item}
          </button>
        ))}
        <h3>Reset :</h3>
        {/* Reset  */}
        <button
          className="btn"
          style={{ textAlign: "center" }}
          onClick={() => {
            resetFilters();
          }}
        >
          Reset Filters
        </button>
      </div>
      <div className="products">
        {list &&
          list?.data?.MensWear.map((item, index) => {
            return (
              <div key={index} className="singleProduct">
                <img
                  src={item.url}
                  alt={item.brand}
                  onClick={() => {
                    handleCurrentData(item);
                  }}
                />
                <h3>{item.brand}</h3>
                <p>M.R.P : ₹ {item.price}</p>
                <button
                  className="btn cart-btn pos"
                  onClick={() => {
                    PostToCart(item);
                  }}
                >
                  <span>Add to cart</span> 
                </button>
              </div>
            );
          })}
      </div>
      <div></div>
    </div>
  );
};

export default Western;
