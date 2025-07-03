''
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function MyOrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("/api/orders")
      .then(res => res.json())
      .then(data => {
        setOrders(data);
        setLoading(false);
      })
      .catch(() => {
        setError("Erreur lors du chargement");
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Chargement...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <main className="min-h-screen bg-gray-50">
      <section className="max-w-5xl mx-auto px-4 py-18">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 text-center">Mes commandes</h1>
        <div className="space-y-6">
          {orders.map((order: any) => (
            <div key={order._id} className="bg-white rounded-xl shadow-md p-6 flex flex-col md:flex-row items-center gap-6">
              <Image src={order.car.image} alt={order.car.brand} width={120} height={80} className="rounded-lg object-cover" />
              <div className="flex-1">
                <h2 className="text-xl font-bold text-gray-900">{order.car.brand} {order.car.model}</h2>
                <p className="text-gray-600">{order.car.year} • {order.car.category}</p>
                <p className="text-gray-500 mt-1">Lieu : {order.car.location}</p>
                <p className="text-gray-500 mt-1">Prix : MRU{order.price}</p>
                <p className="text-gray-500 mt-1">Date : {new Date(order.createdAt).toLocaleDateString()}</p>
              </div>
              <div className="flex flex-col gap-2">
                <Link href={`/my-orders/${order._id}`} className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold py-2 px-4 rounded-lg text-sm text-center">Voir</Link>
              </div>
              <span className={`px-4 py-2 rounded-lg font-semibold text-sm ${order.status === 'confirmée' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>{order.status}</span>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
