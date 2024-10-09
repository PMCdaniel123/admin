import SalesChart from "@/components/custom ui/SalesChart";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  getSalesPerMonth,
  getTotalCustomer,
  getTotalSales,
} from "@/lib/actions/actions";
import { CircleDollarSign, ShoppingBag, UserRound } from "lucide-react";

export default async function Home() {
  const totalRevenue = await getTotalSales().then((data) => data.totalRevenue);
  const totalOrders = await getTotalSales().then((data) => data.totalOrders);
  const totalCustomer = await getTotalCustomer();
  const graphData = await getSalesPerMonth();

  return (
    <div className="px-10 py-5 bg-[#f9f9f9] min-h-screen">
      <div className="bg-white w-full flex items-center justify-between p-6 rounded-lg shadow-xl">
        <p className="text-heading2-bold text-primary">Dashboard</p>
      </div>
      <Separator className="bg-primary mt-8 mb-10" />

      <div className="grid grid-cols-2 md:grid-cols-3 gap-10">
        <Card className="bg-white shadow-xl border border-tertiary">
          <CardHeader className="flex flex-row items-center justify-between text-primary">
            <CardTitle>Total Revenue</CardTitle>
            <CircleDollarSign className="max-sm:hidden" />
          </CardHeader>
          <CardContent>
            <p className="text-body-bold text-secondary">${totalRevenue}</p>
          </CardContent>
        </Card>

        <Card className="bg-white shadow-xl border border-tertiary">
          <CardHeader className="flex flex-row items-center justify-between text-primary">
            <CardTitle>Total Orders</CardTitle>
            <ShoppingBag className="max-sm:hidden" />
          </CardHeader>
          <CardContent>
            <p className="text-body-bold text-secondary">{totalOrders}</p>
          </CardContent>
        </Card>

        <Card className="bg-white shadow-xl border border-tertiary">
          <CardHeader className="flex flex-row items-center justify-between text-primary">
            <CardTitle>Total Customers</CardTitle>
            <UserRound className="max-sm:hidden" />
          </CardHeader>
          <CardContent>
            <p className="text-body-bold text-secondary">{totalCustomer}</p>
          </CardContent>
        </Card>
      </div>

      <Card className="mt-10 bg-white shadow-xl border border-tertiary">
        <CardHeader className="flex flex-row items-center justify-between text-primary">
          <CardTitle>Sales Chart ($)</CardTitle>
        </CardHeader>
        <CardContent>
          <SalesChart data={graphData} />
        </CardContent>
      </Card>
    </div>
  );
}
