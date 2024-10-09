import { DataTable } from "@/components/custom ui/DataTable";
import { columns } from "@/components/customers/CustomerColumns";
import { Separator } from "@/components/ui/separator";
import Customer from "@/lib/models/Customer";
import { connectToDB } from "@/lib/mongoDB";

const Customers = async () => {
  await connectToDB();

  const customers = await Customer.find().sort({ createAt: "desc" });

  return (
    <div className="px-10 py-5 bg-[#f9f9f9] min-h-screen">
      <div className="bg-white w-full flex items-center justify-between p-6 rounded-lg shadow-xl">
        <p className="text-heading2-bold text-primary">Customers</p>
      </div>
      <Separator className="bg-primary mt-8 mb-4" />

      <DataTable columns={columns} data={customers} searchKey="name" />
    </div>
  );
};

export default Customers;

export const dynamic = "force-dynamic";
