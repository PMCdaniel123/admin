import Customer from "@/lib/models/Customer";
import Order from "@/lib/models/Order";
import { connectToDB } from "@/lib/mongoDB";
import { NextResponse } from "next/server";
import { format } from "date-fns";

export const GET = async () => {
  try {
    await connectToDB();

    const orders = await Order.find().sort({ createAt: "desc" });

    const orderDetails = await Promise.all(
      orders.map(async (order) => {
        const customer = await Customer.findOne({
          clerkId: order.customerClerkId,
        });
        return {
          _id: order._id,
          customer: customer.name,
          products: order.products.length,
          totalAmount: order.totalAmount,
          createdAt: format(order.createdAt, "MMM do, yyyy"),
        };
      })
    );

    const response = NextResponse.json(orderDetails, { status: 200 });
    response.headers.set("Access-Control-Allow-Origin", "*");
    response.headers.set("Access-Control-Allow-Methods", "GET, OPTIONS");
    response.headers.set("Access-Control-Allow-Headers", "Content-Type");

    return response;
  } catch (error) {
    console.log("ORDER_GET", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
};

export const dynamic = "force-dynamic";
