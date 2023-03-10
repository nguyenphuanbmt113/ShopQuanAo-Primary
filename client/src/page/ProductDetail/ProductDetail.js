import React from "react";
import { useParams } from "react-router-dom";
import { DetailProductCard } from "../../components/DetailCard/DetailProductCard";
import { NavHome } from "../../components/NavHome/NavHome";
import { useGetProductByIdQuery } from "../../service/productService";

export const ProductDetail = () => {
  const { id } = useParams();
  const { data, isLoading } = useGetProductByIdQuery(id);

  return (
    <>
      <NavHome detailpage="detailpage"></NavHome>
      <div className="my-container px-5 my-8">
        {data && (
          <DetailProductCard
            product={data}
            isLoading={isLoading}></DetailProductCard>
        )}
      </div>
    </>
  );
};
