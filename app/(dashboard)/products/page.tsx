"use client";

import { DataTable } from "@/components/custom ui/DataTable";
import Loader from "@/components/custom ui/Loader";
import { columns } from "@/components/products/ProductColumns";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const Product = () => {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState<ProductType[]>([]);
  const router = useRouter();

  const getProducts = async () => {
    try {
      const res = await fetch("/api/products", {
        method: "GET",
      });

      const data = await res.json();
      setProducts(data);
      setLoading(false);
    } catch (error) {
      toast.error("Something went wrong! Please try again.");
      console.log("[Products_GET]", error);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  return loading ? (
    <Loader />
  ) : (
    <div className="px-10 py-5 bg-[#f9f9f9] min-h-screen">
      <div className="bg-white w-full flex flex-col sm:flex-row gap-4 sm:items-center sm:justify-between p-6 rounded-lg shadow-xl">
        <p className="text-heading2-bold text-primary">Products</p>
        <Button
          className="bg-primary text-white"
          onClick={() => router.push("/products/new")}
        >
          <Plus className="h-4 w-4 mr-2" /> Create Product
        </Button>
      </div>
      <Separator className="bg-primary mt-8 mb-4" />
      <DataTable columns={columns} data={products} searchKey="title" />
    </div>
  );
};

export default Product;
