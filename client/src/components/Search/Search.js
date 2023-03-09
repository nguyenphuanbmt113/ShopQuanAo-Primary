import React from "react";
import { BsSearch } from "react-icons/bs";
import { TiDeleteOutline } from "react-icons/ti";
import { useDispatch } from "react-redux";
import { toggleSearchbar } from "../../redux/reducers/globalReducer";

export const Search = ({ closesearch }) => {
  const dispatch = useDispatch();
  const handleClose = () => {
    dispatch(toggleSearchbar());
  };
  return (
    <div className="fixed inset-0 bg-black/60 z-[10] w-full h-full">
      <div className="flex items-center justify-center">
        <div className="sm:w-9/12 md:w-8/12 lg:w-6/12 p-8 relative">
          <input
            type="text"
            className="w-full h-[60px] px-5 py-2 outline-none bg-white rounded-md"
            placeholder="Search Product"
          />
          <div className="absolute top-1/2 right-[50px] -translate-y-1/2">
            <BsSearch size={25}></BsSearch>
          </div>
        </div>
      </div>
      <div className="absolute top-5 right-7" onClick={handleClose}>
        <TiDeleteOutline size={35} color="white"></TiDeleteOutline>
      </div>
    </div>
  );
};
