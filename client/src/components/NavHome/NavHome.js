import React from "react";
import { BsSearch } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logoutUser } from "../../redux/reducers/authReducer";
import { toggleSearchbar } from "../../redux/reducers/globalReducer";
import { Search } from "../Search/Search";
import { AiOutlineShoppingCart } from "react-icons/ai";
export const NavHome = ({ detailpage }) => {
  const dispatch = useDispatch();
  const { accessTokenUser } = useSelector((state) => state.authReducer);
  const { searchBar } = useSelector((state) => state.globalReducer);
  const { items } = useSelector((state) => state.cartReducer);
  console.log("items:", items)
  const navigate = useNavigate();
  const handleLogout = () => {
    dispatch(logoutUser());
  };
  const handleShow = () => {
    dispatch(toggleSearchbar());
  };
  const tocartPage = () => {
    navigate("/cart");
  };

  return (
    <>
      <div
        className={`header h-[84px] border border-gray-200 ${
          detailpage ? "bg-blue-500 text-white border-none" : ""
        }`}>
        <div className="h-[100%] max-w-[1240px] mx-auto px-5 flex items-center justify-between">
          <nav className="flex items-center gap-3">
            <Link
              to="/home"
              className={`block uppercase tracking-wide text-blue-500 text-xl font-bold ${
                detailpage ? "text-white border-none" : ""
              }`}>
              Clothes Hunter
            </Link>
          </nav>
          {!accessTokenUser ? (
            <nav>
              <Link to="/login" className="cursor-pointer">
                Đăng Nhập
              </Link>
            </nav>
          ) : (
            <nav className="flex items-center gap-6">
              <div onClick={handleShow} className="cursor-pointer">
                <BsSearch size={20}></BsSearch>
              </div>
              <div className="cursor-pointer relative" onClick={tocartPage}>
                <AiOutlineShoppingCart size={30}></AiOutlineShoppingCart>
                <span className="p-[5px] text-white inline-block absolute top-[-10px] right-[-10px] rounded-full text-[10px] bg-red-400">
                  {items}
                </span>
              </div>
              <span className="cursor-pointer" onClick={handleLogout}>
                Đăng Xuất
              </span>
            </nav>
          )}
        </div>
      </div>
      {searchBar && <Search></Search>}
    </>
  );
};
