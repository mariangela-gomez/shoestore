import React, {useRef} from "react";
import { useSelector } from "react-redux";
import CardFeature from "../component/CardFeature";
import HomeCard from "../component/HomeCard";
import { GrPrevious, GrNext } from "react-icons/gr";
import AllProduct from "../component/AllProduct";


const Home = () => {
  const productData = useSelector((state) => state.product.productList);
  const homeProductCartList = productData.slice(0, 6);
  const homeProductCartListBoots = productData.filter(
    (el) => el.category === "boots",
    []
  );
  const loadingArray = new Array(4).fill(null);
  const loadingArrayFeature = new Array(5).fill(null);

  const slideProductRef = useRef();
  const nextProduct = () => {
    slideProductRef.current.scrollLeft += 200;
  };
  const preveProduct = () => {
    slideProductRef.current.scrollLeft -= 200;
  };

  return (
    <div className="p-2 md:p-4">
      <div className="md:flex gap-4 py-2">
        <div className="md:w-1/2">
          
          <h2 className="text-4xl md:text-7xl font-bold py-3">
          Where Fashion Meets{" "}
            <span className="text-red-600 text-">Comfort</span>
          </h2>
          <p className="py-3 text-base text-justify p-5">
          Welcome to our online haven for
                        women's footwear. From sporty kicks to breezy sandals and sturdy boots, we've
                        curated a collection that embraces every facet of your lifestyle. Step into
                        comfort, stride in style – whether you're hitting the gym, strolling on the
                        beach, or conquering urban adventures. Explore the perfect blend of fashion and
                        function as you browse our diverse range of athletic shoes, sandals, and boots.
                        Your next favorite pair awaits
          </p>
          <button className="font-bold bg-red-500 text-slate-200 px-4 py-2 rounded-md">
            Order Now
          </button>
        </div>

        <div className="md:w-1/2 flex flex-wrap gap-5 p-4 justify-center">
          {homeProductCartList[0]
            ? homeProductCartList.map((el) => {
                return (
                  <HomeCard
                    key={el._id}
                    id={el._id}
                    image={el.image}
                    name={el.name}
                    price={el.price}
                    category={el.category}
                  />
                );
              })
            : loadingArray.map((el, index) => {
                return <HomeCard key={index+"loading"} loading={"Loading..."} />;
              })}
        </div>
      </div>

      <div className="">
        <div className="flex w-full items-center">
          <h2 className="font-bold text-2xl text-slate-800 mb-4">
            New Arrivals
          </h2>
          <div className="ml-auto flex gap-4">
            <button
              onClick={preveProduct}
              className="bg-slate-300 hover:bg-slate-400 text-lg  p-1 rounded"
            >
              <GrPrevious />
            </button>
            <button
              onClick={nextProduct}
              className="bg-slate-300 hover:bg-slate-400 text-lg p-1 rounded "
            >
              <GrNext />
            </button>
          </div>
        </div>
        <div
          className="flex gap-5 overflow-scroll scrollbar-none scroll-smooth transition-all p-5 justify-center"
          ref={slideProductRef}
        >
          {homeProductCartListBoots[0]
            ? homeProductCartListBoots.map((el) => {
                return (
                  <CardFeature
                    key={el._id+"boots"}
                    id={el._id}
                    name={el.name}
                    category={el.category}
                    price={el.price}
                    image={el.image}
                  />
                );
              })
            : loadingArrayFeature.map((el,index) => (
                <CardFeature loading="Loading..." key={index+"cartLoading"} />
              ))}
        </div>
      </div>
      
      <AllProduct heading={"Your Product"}/>
    </div>
  );
};

export default Home;
