import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Card from "../components/Card";
import Footer from "../components/Footer";

export default function Home() {
  const [search, setSearch] = useState("");
  const [foodCat, setFoodCat] = useState([]);
  const [foodItem, setFoodItem] = useState([]);

  const loadData = async () => {
    let response = await fetch("http://localhost:5000/api/foodData", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    response = await response.json();
    console.log("API Response:", response);

    setFoodItem(response[0]);
    setFoodCat(response[1]);

    // console.log(response[0], response[1]);
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <>
      <div>
        <Navbar />
      </div>
      <div>
 <div id="carouselExampleFade" className="carousel slide carousel-fade" data-bs-ride="carousel" >
  <div className="carousel-inner" id='carousel'>
    <div className="carousel-item active" style={{ height: '600px',objectFit: "fill"}}>
      <img src="https://images.pexels.com/photos/1251198/pexels-photo-1251198.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
 className="d-block w-100" alt="..." />
      <div className="carousel-caption d-none d-md-block" style={{zindex:"10"}}>
      <div className="d-flex">
      <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" value={search} onChange={(e)=>{setSearch(e.target.value)}}/>
      {/* <button className="btn btn-outline-success text-white bg-success" type="submit">Search</button> */}
    </div>
      </div>
    </div>
    <div className="carousel-item"  style={{ height: '600px',objectFit: "fill"}}>
      <img src="https://images.pexels.com/photos/825661/pexels-photo-825661.jpeg"
 className="d-block w-100" alt="..."/>
      <div className="carousel-caption d-none d-md-block">
      <div className="d-flex">
      <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" value={search} onChange={(e)=>{setSearch(e.target.value)}}/>
      {/* <button className="btn btn-outline-success text-white bg-success" type="submit">Search</button> */}
    </div>
      </div>
    </div>
    <div className="carousel-item"  style={{ height: '600px',objectFit: "fill"}}>
      <img src="https://images.pexels.com/photos/376464/pexels-photo-376464.jpeg" className="d-block w-100" alt="..."/>
      <div className="carousel-caption d-none d-md-block">
      <div className="d-flex">
      <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" value={search} onChange={(e)=>{setSearch(e.target.value)}}/>
      {/* <button className="btn btn-outline-success text-white bg-success" type="submit">Search</button> */}
    </div>
      </div>
    </div>
  </div>
  <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
    <span className="visually-hidden">Previous</span>
  </button>
  <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
    <span className="carousel-control-next-icon" aria-hidden="true"></span>
    <span className="visually-hidden">Next</span>
  </button>
</div>
      </div>
      <div className="container">
        {foodCat !== [] ? (
          foodCat.map((data) => {
            return (
              <div className="row mb-3">
                <div key={data._id} className="fs-3 m-3">
                  {data.CategoryName}
                </div>
                <hr />
                {foodItem !== [] ? (
                  foodItem
                    .filter(
                      (item) =>
                        (item.CategoryName === data.CategoryName) &&
                          (item.name.toLowerCase().includes(search.toLowerCase()))
                    )
                    .map((filterItems) => {
                      return (
                        <div
                          key={filterItems._id}
                          className="col-12 col-md-6 col-lg-4"
                        >
                          <Card
                           foodItem={filterItems}
                            options={filterItems.options[0]}
                            imgSrc={filterItems.img}
                          />
                        </div>
                      );
                    })
                ) : (
                  <div>No such data found</div>
                )}
              </div>
            );
          })
        ) : (
          <div>"""""""</div>
        )}
      </div>
      <div>
        <Footer />
      </div>
    </>
  );
}
