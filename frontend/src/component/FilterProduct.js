import React from 'react';
import { GiRunningShoe, GiBoots, GiSlippers, GiConverseShoe, GiFlipFlops } from 'react-icons/gi';
import {SiJordan} from 'react-icons/si';
import {TbFlipFlops} from 'react-icons/tb'

const FilterProduct = ({ category, onClick }) => {
  // Define un objeto que mapea categorías a componentes de íconos
  const categoryIcons = {
    running: <GiRunningShoe />,
    basketball: <SiJordan/>,
    sandals: <GiFlipFlops/>,
    slippers: <GiSlippers/>,
    lifestyle: <GiConverseShoe/>,
    boots: <GiBoots/>
  };

  // Verifica si la categoría tiene un ícono definido en el objeto
  const iconComponent = categoryIcons[category.toLowerCase()] || null;

  return (
    <div onClick={onClick}>
      <div
        className='text-4xl p-5 bg-red-700 hover:bg-black rounded-full text-white cursor-pointer'
        key={category}>
        {iconComponent}
      </div>
      <p className='text-center font-medium my-1 capitalize'>{category}</p>
    </div>
  );
};

export default FilterProduct;



