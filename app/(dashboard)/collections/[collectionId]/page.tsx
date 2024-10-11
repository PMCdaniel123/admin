"use client";

import CollectionForm from "@/components/collections/CollectionForm";
import Loader from "@/components/custom ui/Loader";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const CollectionDetail = ({ params }: { params: { collectionId: string } }) => {
  const [loading, setLoading] = useState(true);
  const [collectionDetail, setCollectionDetail] =
    useState<CollectionType | null>(null);

  useEffect(() => {
    const getCollectionDetail = async () => {
      try {
        const res = await fetch(`/api/collections/${params.collectionId}`, {
          method: "GET",
        });

        const data = await res.json();

        setCollectionDetail(data);
        setLoading(false);
      } catch (error) {
        toast.error("Something went wrong! Please try again.");
        console.log("[CollectionId_GET]", error);
      }
    };

    getCollectionDetail();
  }, [params.collectionId]);

  return loading ? (
    <Loader />
  ) : (
    <div className="px-10 py-5 bg-[#f9f9f9] min-h-screen">
      <CollectionForm initialData={collectionDetail} />
    </div>
  );
};

export default CollectionDetail;
