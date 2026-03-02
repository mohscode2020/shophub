import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight } from 'lucide-react';

export function Cart() {
  const { cartItems, removeFromCart, updateQuantity } = useCart();

  const subtotal = cartItems.reduce(
    (sum, item) => sum + (item.product?.price || 0) * item.quantity,
    0
  );

  const shipping = subtotal > 100 ? 0 : 9.99;
  const total = subtotal + shipping;

  if (cartItems.length === 0) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center">
          <ShoppingBag className="w-24 h-24 text-stone-300 mx-auto mb-6" />
          <h2 className="text-2xl font-bold text-stone-900 mb-4">Your cart is empty</h2>
          <p className="text-stone-600 mb-8">Start shopping to add items to your cart</p>
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
            Shopping Cart
          </h1>
          <p className="text-lg text-stone-600 text-center">
            {cartItems.length} {cartItems.length === 1 ? 'item' : 'items'} in your cart
          </p>
        </div>
      </section>

      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="space-y-4">
                {cartItems.map((item) => (
                  <CartItemCard
                    key={item.id}
                    item={item}
                    onRemove={() => removeFromCart(item.id)}
                    onUpdateQuantity={(qty) => updateQuantity(item.id, qty)}
                  />
                ))}
              </div>
            </div>

            <div className="lg:col-span-1">
              <div className="bg-gradient-to-br from-stone-50 to-amber-50 rounded-2xl p-6 border border-stone-200 sticky top-24">
                <h3 className="text-xl font-bold text-stone-900 mb-6">Order Summary</h3>

                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-stone-600">
                    <span>Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-stone-600">
                    <span>Shipping</span>
                    <span>{shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}</span>
                  </div>
                  {subtotal > 100 && (
                    <div className="text-sm text-green-600 bg-green-50 p-2 rounded-lg">
                      You've qualified for free shipping!
                    </div>
                  )}
                  <div className="border-t border-stone-300 pt-3">
                    <div className="flex justify-between text-xl font-bold text-stone-900">
                      <span>Total</span>
                      <span className="text-amber-600">${total.toFixed(2)}</span>
                    </div>
                  </div>
                </div>

                <Link
                  to="/checkout"
                  className="w-full flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-semibold rounded-xl hover:shadow-xl hover:scale-105 transition-all"
                >
                  Proceed to Checkout
                  <ArrowRight className="w-5 h-5" />
                </Link>

                <Link
                  to="/products"
                  className="block text-center mt-4 text-stone-600 hover:text-amber-600 transition-colors"
                >
                  Continue Shopping
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function CartItemCard({ item, onRemove, onUpdateQuantity }: any) {
  const product = item.product;
  if (!product) return null;

  return (
    <div className="bg-white rounded-xl border border-stone-200 p-4 hover:shadow-md transition-all">
      <div className="flex gap-4">
        <Link to={`/products/${product.id}`} className="flex-shrink-0">
          <div className="w-24 h-24 bg-gradient-to-br from-stone-100 to-stone-200 rounded-lg overflow-hidden">
            <img
              src={product.image_url}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>
        </Link>

        <div className="flex-1">
          <Link to={`/products/${product.id}`}>
            <h3 className="font-semibold text-stone-900 mb-1 hover:text-amber-600 transition-colors">
              {product.name}
            </h3>
          </Link>
          <p className="text-sm text-stone-500 mb-2">{product.category}</p>
          <div className="text-lg font-bold text-amber-600">${product.price}</div>
        </div>

        <div className="flex flex-col items-end justify-between">
          <button
            onClick={onRemove}
            className="text-stone-400 hover:text-red-500 transition-colors"
          >
            <Trash2 className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onUpdateQuantity(item.quantity - 1)}
              className="w-8 h-8 bg-stone-100 hover:bg-stone-200 rounded-lg flex items-center justify-center transition-colors"
            >
              <Minus className="w-4 h-4" />
            </button>
            <span className="w-12 text-center font-semibold">{item.quantity}</span>
            <button
              onClick={() => onUpdateQuantity(item.quantity + 1)}
              className="w-8 h-8 bg-stone-100 hover:bg-stone-200 rounded-lg flex items-center justify-center transition-colors"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
