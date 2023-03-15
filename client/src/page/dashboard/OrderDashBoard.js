import { Link, useParams } from "react-router-dom";
import React from "react";
import { useGetOrderQuery } from "../../service/orderService";
import { Spinner } from "../../components/Spinner/Spinner";
import { Pagination } from "../../components/Pagination/Pagination";

export const OrderDashBoard = () => {
  let { page } = useParams();
  if (!page) page = 1;
  const { data, isFetching } = useGetOrderQuery(page);
  console.log("data:", data);
  return (
    <>
      {!isFetching ? (
        data &&
        data.orders.length > 0 && (
          <div className="mt-5 w-full bg-white shadow-lg rounded-sm border border-gray-200">
            <header className="px-5 py-4 border-b border-gray-100">
              <h2 className="font-semibold text-gray-800">Orders</h2>
            </header>
            <div className="p-3">
              <div className="overflow-x-auto">
                <table className="table-auto w-full">
                  <thead className="text-xs font-semibold uppercase text-gray-400 bg-gray-50">
                    <tr>
                      <th className="p-2 whitespace-nowrap">
                        <div className="font-semibold text-left">Name</div>
                      </th>
                      <th className="p-2 whitespace-nowrap">
                        <div className="font-semibold text-left">
                          Quantities
                        </div>
                      </th>
                      <th className="p-2 whitespace-nowrap">
                        <div className="font-semibold text-left">image</div>
                      </th>
                      <th className="p-2 whitespace-nowrap">
                        <div className="font-semibold text-left">received</div>
                      </th>
                      <th className="p-2 whitespace-nowrap">
                        <div className="font-semibold text-left">Delivered</div>
                      </th>
                      <th className="p-2 whitespace-nowrap">
                        <div className="font-semibold text-left">details</div>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="text-sm divide-y divide-gray-100">
                    {data?.orders?.map((order) => (
                      <tr key={order._id}>
                        <td className="p-2 whitespace-nowrap">
                          <div className="text-left font-medium text-gray-500">
                            {order.productId.title}
                          </div>
                        </td>
                        <td className="p-2 whitespace-nowrap">
                          <div className="text-left font-medium text-gray-500">
                            {order.quantities}
                          </div>
                        </td>
                        <td className="p-2 whitespace-nowrap">
                          <img
                            src={`/images/${order.productId.image1}`}
                            alt="name"
                            className="w-[35px] h-[35px] md:w-[50px] md:h-[50px] rounded-lg object-cover"
                          />
                        </td>
                        <td className="p-2 whitespace-nowrap">
                          <div className="text-left font-medium text-gray-500">
                            {order.received ? "Yes" : "No"}
                          </div>
                        </td>
                        <td className="p-2 whitespace-nowrap">
                          <div className="text-left font-medium text-gray-500">
                            {order.status ? "Yes" : "No"}
                          </div>
                        </td>
                        <td className="p-2 whitespace-nowrap">
                          <Link
                            to={`/dashboard/order-details/${order._id}`}
                            className="cursor-pointer px-2 py-1 bg-blue-500 text-white rounded-sm">
                            Details
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <Pagination
                page={parseInt(page)}
                totalPage={data.totalPage}
                count={data.count}
                path="dashboard/order"
              />
            </div>
          </div>
        )
      ) : (
        <div className="flex items-center justify-center">
          {" "}
          <Spinner></Spinner>
        </div>
      )}
    </>
  );
};
