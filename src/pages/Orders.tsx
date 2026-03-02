import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase, getSessionId, Order } from '../lib/supabase';
import { Package, Calendar, MapPin, ArrowRight } from 'lucide-react';

export function Orders() {
  const [orders, setOrders] = useState<any[]>([]);

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = async () => {
    const sessionId = getSessionId();
    const { data } = await supabase
      .from('orders')
      .select('*, order_items(*, product:products(*))')
      .eq('session_id', sessionId)
      .order('created_at', { ascending: false });

    setOrders(data || []);
  };

  if (orders.length === 0) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center">
          <Package className="w-24 h-24 text-stone-300 mx-auto mb-6" />
          <h2 className="text-2xl font-bold text-stone-900 mb-4">No orders yet</h2>
          <p className="text-stone-600 mb-8">Start shopping to see your orders here</p>
          <Link
            to="/products"
            className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-semibold rounded-xl hover:shadow-xl hover:scale-105 transition-all"
          >
            Browse Products
            <ArrowRight className="ml-2 w-5 h-5" />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div>
      <section className="relative overflow-hidden bg-gradient-to-br from-amber-50 via-orange-50 to-stone-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold text-stone-900 mb-4 text-center">
            My Orders
          </h1>
          <p className="text-lg text-stone-600 text-center">
            View and track your orders
          </p>
        </div>
      </section>

      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-6">
            {orders.map((order) => (
              <OrderCard key={order.id} order={order} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

function OrderCard({ order }: { order: any }) {
  const orderDate = new Date(order.created_at).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="bg-white rounded-2xl border border-stone-200 overflow-hidden hover:shadow-lg transition-all">
      <div className="bg-gradient-to-r from-amber-50 to-orange-50 p-6 border-b border-stone-200">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Package className="w-5 h-5 text-amber-600" />
              <span className="font-semibold text-stone-900">Order #{order.id.slice(0, 8)}</span>
            </div>
            <div className="flex items-center gap-4 text-sm text-stone-600">
              <div className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                <span>{orderDate}</span>
              </div>
              <div className="flex items-center gap-1">
                <MapPin className="w-4 h-4" />
                <span>{order.shipping_address?.city}</span>
              </div>
            </div>
          </div>

          <div className="text-right">
            <div className="text-sm text-stone-600 mb-1">Total Amount</div>
            <div className="text-2xl font-bold text-amber-600">
              ${parseFloat(order.total_amount).toFixed(2)}
            </div>
          </div>
        </div>

        <div className="mt-4">
          <span
            className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
              order.status === 'confirmed'
                ? 'bg-green-100 text-green-700'
                : order.status === 'pending'
                ? 'bg-amber-100 text-amber-700'
                : 'bg-stone-100 text-stone-700'
            }`}
          >
            {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
          </span>
        </div>
      </div>

      <div className="p-6">
        <h4 className="font-semibold text-stone-900 mb-4">Order Items</h4>
        <div className="space-y-3">
          {order.order_items?.map((item: any) => (
            <div key={item.id} className="flex items-center gap-4">
              <div className="w-16 h-16 bg-gradient-to-br from-stone-100 to-stone-200 rounded-lg overflow-hidden flex-shrink-0">
                <img
                  src={item.product?.image_url}
                  alt={item.product?.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1">
                <div className="font-medium text-stone-900">{item.product?.name}</div>
                <div className="text-sm text-stone-500">Quantity: {item.quantity}</div>
              </div>
              <div className="font-semibold text-amber-600">
                ${parseFloat(item.price).toFixed(2)}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 p-4 bg-stone-50 rounded-xl">
          <h5 className="font-semibold text-stone-900 mb-2">Shipping Address</h5>
          <div className="text-stone-600 text-sm">
            <div>{order.shipping_address?.fullName}</div>
            <div>{order.shipping_address?.address}</div>
            <div>
              {order.shipping_address?.city}, {order.shipping_address?.zipCode}
            </div>
            <div>{order.shipping_address?.country}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
