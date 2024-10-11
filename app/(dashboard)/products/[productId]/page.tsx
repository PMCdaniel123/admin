"use client";

import Loader from "@/components/custom ui/Loader";
import ProductForm from "@/components/products/ProductForm";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const ProductDetail = ({ params }: { params: { productId: string } }) => {
  const [loading, setLoading] = useState(true);
  const [productDetail, setProductDetail] = useState<ProductType | null>(null);

  useEffect(() => {
    const getProductDetail = async () => {
      try {
        const res = await fetch(`/api/products/${params.productId}`, {
          method: "GET",
        });

        const data = await res.json();

        setProductDetail(data);
        setLoading(false);
      } catch (error) {
        toast.error("Something went wrong! Please try again.");
        console.log("[ProductId_GET]", error);
      }
    };

    getProductDetail();
  }, [params.productId]);

  return loading ? (
    <Loader />
  ) : (
    <div className="px-10 py-5 bg-[#f9f9f9] min-h-screen">
      <ProductForm initialData={productDetail} />;
    </div>
  );
};

export default ProductDetail;
