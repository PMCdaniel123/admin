import { DataTable } from "@/components/custom ui/DataTable";
import { columns } from "@/components/orderItems/OrderItemColumns";

const OrderDetail = async ({ params }: { params: { orderId: string } }) => {
  const res = await fetch(`http://localhost:3000/api/orders/${params.orderId}`);

  const { orderDetail, customer } = await res.json();

  const { street, city, state, postalCode, country } =
    orderDetail.shippingAddress;

    console.log(orderDetail);
    

  return (
    <div className="flex flex-col p-10 gap-5">
      <p className="text-base-bold">
        Order ID: <span className="text-base-medium">{orderDetail._id}</span>
      </p>

      <p className="text-base-bold">
        Customer name: <span className="text-base-medium">{customer.name}</span>
      </p>

      <p className="text-base-bold">
        Shipping address:{" "}
        <span className="text-base-medium">
          {street}, {city}, {state} , {postalCode}, {country}
        </span>
      </p>

      <p className="text-base-bold">
        Total Paid:{" "}
        <span className="text-base-medium">{orderDetail.totalAmount}</span>
      </p>

      <p className="text-base-bold">
        Shipping rate ID:{" "}
        <span className="text-base-medium">{orderDetail.shippingRate}</span>
      </p>

      <DataTable columns={columns} data={orderDetail.products} searchKey="product" />
    </div>
  );
};

export default OrderDetail;
