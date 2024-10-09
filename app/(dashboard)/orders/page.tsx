"use client";

import { DataTable } from "@/components/custom ui/DataTable";
import Loader from "@/components/custom ui/Loader";
import { columns } from "@/components/orders/OrderColumns";
import { Separator } from "@/components/ui/separator";
import { useEffect, useState } from "react";

const Orders = () => {
  const [loading, setLoading] = useState(true);
  const [orders, setOrders] = useState([]);

  const getOrders = async () => {
    try {
      const res = await fetch("/api/orders");
      const data = await res.json();

      setOrders(data);
      setLoading(false);
    } catch (error) {
      console.log("ORDER_GET", error);
    }
  };

  useEffect(() => {
    getOrders();
  }, []);

  return loading ? (
    <Loader />
  ) : (
    <div className="px-10 py-5 bg-[#f9f9f9] min-h-screen">
      <div className="bg-white w-full flex items-center justify-between p-6 rounded-lg shadow-xl">
        <p className="text-heading2-bold text-primary">Orders</p>
      </div>
      <Separator className="bg-primary mt-8 mb-4" />
      <DataTable columns={columns} data={orders} searchKey="_id" />
    </div>
  );
};

export const dynamic = "force-dynamic";

export default Orders;
