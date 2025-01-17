import RestaurantCard from "./RestaurantCard";
import { useEffect, useState } from "react";
import Shimmer from "./Shimmer";
import { Link } from "react-router-dom";
const Body = () =>{

const [Listofrestaurant, setListofrestaurant] = useState([]);
const [filteredRestaurant, setfilteredRestaurant] = useState([]);

const [searchText ,setsearchText] = useState("");

useEffect(() => {
  fetchData();
},[]);

const fetchData = async () => {
  const data = await fetch(
    "https://www.swiggy.com/dapi/restaurants/list/v5?lat=12.2958104&lng=76.6393805&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING"
  );

  const json = await data.json();

  console.log(json);
  setListofrestaurant(json?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants);
  setfilteredRestaurant(json?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants);
};




    return Listofrestaurant.length === 0 ? (
    <Shimmer /> 
    ): (
        <div className="body">
            <div className="filter">
              <div className="search">
                <input 
                type="text" 
                className="search-box"
                 value={searchText}
                 onChange={(e) => {
                  setsearchText(e.target.value);
                 }}
                 />
                <button
                 onClick={() => {
                  console.log(searchText);
                 const filteredRestaurant= Listofrestaurant.filter((res) =>
                  res.info.name.toLowerCase().includes(searchText.toLowerCase())
                );

                setfilteredRestaurant(filteredRestaurant);
                }}
                >Search</button>
              </div>
                <button className="filter-btn" onClick = { ()=>{
                  
                    const filteredList = Listofrestaurant.filter(
                        (res) => res.info.avgRating > 4.4
                    );
                    setfilteredRestaurant(filteredList);
}}>
                    Top Rated Restaurants</button>
            </div>
            <div className="res-container">
            {filteredRestaurant.map((restaurant) => (
              <Link
              key={restaurant.info.id}
              to={"/restaurants/" + restaurant.info.id}
              >
              <RestaurantCard  resData={restaurant}/>
              </Link>
            ))}
 </div>
        </div>
    );
};

export default Body;