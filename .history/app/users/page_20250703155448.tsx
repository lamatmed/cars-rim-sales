"use client";
import { useEffect, useState } from "react";


export default function UsersPage() {
  const [users, setUsers] = useState<any[]>([]);
  const [cars, setCars] = useState<any[]>([]);
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [me, setMe] = useState<any>(null);

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (!user) {
      window.location.href = "/login";
      return;
    }
    const parsed = JSON.parse(user);
    setMe(parsed);
    if (parsed.role !== "admin") {
      window.location.href = "/";
      return;
    }
    Promise.all([
      fetch("/api/users").then(res => res.json()),
      fetch("/api/cars").then(res => res.json()),
      fetch("/api/orders").then(res => res.json()),
    ]).then(([users, cars, orders]) => {
      setUsers(Array.isArray(users) ? users : []);
      setCars(Array.isArray(cars) ? cars : []);
      setOrders(Array.isArray(orders) ? orders : []);
      setLoading(false);
    }).catch(() => {
      setError("Erreur lors du chargement");
      setLoading(false);
    });
  }, []);

  const handleDelete = async (id: string) => {
    if (!window.confirm("Supprimer cet utilisateur ?")) return;
    const res = await fetch(`/api/users/${id}`, { method: "DELETE" });
    if (res.ok) setUsers(users.filter(u => u._id !== id));
    else alert("Erreur lors de la suppression");
  };

  const handlePromote = async (id: string) => {
    const res = await fetch(`/api/users/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ role: "admin" })
    });
    if (res.ok) setUsers(users.map(u => u._id === id ? { ...u, role: "admin" } : u));
    else alert("Erreur lors de la promotion");
  };

  if (loading) return <div>Chargement...</div>;
  if (error) return <div className="text-red-500 text-center pt-24">{error}</div>;

  return (
    <main className="min-h-screen bg-gray-50">
      <section className="max-w-5xl mx-auto px-4 py-18">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 text-center">Gestion des utilisateurs</h1>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white rounded-xl shadow-md">
            <thead>
              <tr className="bg-gray-100">
                <th className="py-3 px-4 text-left">Nom</th>
                <th className="py-3 px-4 text-left">Téléphone</th>
                <th className="py-3 px-4 text-left">Rôle</th>
                <th className="py-3 px-4 text-center">Voitures</th>
                <th className="py-3 px-4 text-center">Commandes</th>
                <th className="py-3 px-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map(user => (
                <tr key={user._id} className="border-b">
                  <td className="py-3 px-4">{user.firstName} {user.lastName}</td>
                  <td className="py-3 px-4">{user.phone}</td>
                  <td className="py-3 px-4">{user.role === "admin" ? <span className="text-indigo-600 font-bold">Admin</span> : "User"}</td>
                  <td className="py-3 px-4 text-center">{cars.filter(car => car.owner && (car.owner._id === user._id || car.owner === user._id)).length}</td>
                  <td className="py-3 px-4 text-center">{orders.filter(order => order.user && (order.user._id === user._id || order.user === user._id)).length}</td>
                  <td className="py-3 px-4 text-center space-x-2">
                    {me && user._id !== me._id && (
                      <>
                        <button onClick={() => handleDelete(user._id)} className="bg-red-100 hover:bg-red-200 text-red-700 font-bold py-1 px-3 rounded text-xs">Supprimer</button>
                        {user.role !== "admin" && (
                          <button onClick={() => handlePromote(user._id)} className="bg-indigo-100 hover:bg-indigo-200 text-indigo-700 font-bold py-1 px-3 rounded text-xs">Rendre admin</button>
                        )}
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
} 