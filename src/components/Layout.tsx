import { Link, useLocation } from 'react-router-dom';
import { ShoppingBag, Package, ShoppingCart, User } from 'lucide-react';
import { useCart } from '../context/CartContext';

export function Layout({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const { cartCount } = useCart();

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="min-h-screen bg-gradient-to-b from-stone-50 to-white">
      <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-stone-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link to="/" className="flex items-center space-x-2 group">
              <div className="w-10 h-10 bg-gradient-to-br from-amber-500 to-orange-600 rounded-lg flex items-center justify-center transform group-hover:scale-105 transition-transform">
                <ShoppingBag className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
                ShopHub
              </span>
            </Link>

            <div className="hidden md:flex items-center space-x-1">
              <NavLink to="/" icon={ShoppingBag} isActive={isActive('/')}>Home</NavLink>
              <NavLink to="/products" icon={Package} isActive={isActive('/products')}>Products</NavLink>
              <NavLink to="/orders" icon={User} isActive={isActive('/orders')}>Orders</NavLink>
              <Link
                to="/cart"
                className="relative flex items-center space-x-1 px-4 py-2 rounded-lg transition-all text-stone-600 hover:bg-stone-50 hover:text-stone-900"
              >
                <ShoppingCart className="w-4 h-4" />
                <span>Cart</span>
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-orange-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <main>{children}</main>

      <footer className="bg-stone-900 text-stone-300 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-amber-500 to-orange-600 rounded-lg flex items-center justify-center">
                  <ShoppingBag className="w-6 h-6 text-white" />
                </div>
                <span className="text-xl font-bold text-white">ShopHub</span>
              </div>
              <p className="text-stone-400 max-w-md leading-relaxed">
                Your one-stop shop for quality products at great prices.
              </p>
            </div>

            <div>
              <h3 className="text-white font-semibold mb-4">Shop</h3>
              <ul className="space-y-2">
                <li><Link to="/products" className="text-stone-400 hover:text-white transition-colors">All Products</Link></li>
                <li><Link to="/orders" className="text-stone-400 hover:text-white transition-colors">My Orders</Link></li>
                <li><Link to="/cart" className="text-stone-400 hover:text-white transition-colors">Shopping Cart</Link></li>
              </ul>
            </div>

            <div>
              <h3 className="text-white font-semibold mb-4">Categories</h3>
              <ul className="space-y-2">
                <li><span className="text-stone-400">Electronics</span></li>
                <li><span className="text-stone-400">Office</span></li>
                <li><span className="text-stone-400">Home & Kitchen</span></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-stone-800 mt-8 pt-8 text-center text-stone-500 text-sm">
            <p>&copy; {new Date().getFullYear()} ShopHub. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

function NavLink({
  to,
  icon: Icon,
  isActive,
  children
}: {
  to: string;
  icon: any;
  isActive: boolean;
  children: React.ReactNode;
}) {
  return (
    <Link
      to={to}
      className={`flex items-center space-x-1 px-4 py-2 rounded-lg transition-all ${
        isActive
          ? 'bg-emerald-50 text-emerald-700 font-medium'
          : 'text-stone-600 hover:bg-stone-50 hover:text-stone-900'
      }`}
    >
      <Icon className="w-4 h-4" />
      <span>{children}</span>
    </Link>
  );
}
