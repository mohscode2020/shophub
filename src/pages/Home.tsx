import { Link } from 'react-router-dom';
import { Package, Truck, Shield, ArrowRight } from 'lucide-react';
import { useEffect, useState } from 'react';
import { supabase, Product } from '../lib/supabase';
import { useCart } from '../context/CartContext';

export function Home() {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const { addToCart } = useCart();

  useEffect(() => {
    loadFeaturedProducts();
  }, []);

  const loadFeaturedProducts = async () => {
    const { data } = await supabase
      .from('products')
      .select('*')
      .order('rating', { ascending: false })
      .limit(4);

    setFeaturedProducts(data || []);
  };

  const handleAddToCart = async (productId: string) => {
    await addToCart(productId);
  };

  return (
    <div>
      <section className="relative overflow-hidden bg-gradient-to-br from-amber-50 via-orange-50 to-stone-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-5xl md:text-6xl font-bold text-stone-900 mb-6">
                Shop Smart,
                <span className="block text-transparent bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text">
                  Live Better
                </span>
              </h1>
              <p className="text-xl text-stone-600 mb-8">
                Discover amazing products at unbeatable prices. From electronics to home essentials, we've got everything you need.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  to="/products"
                  className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-semibold rounded-xl hover:shadow-xl hover:scale-105 transition-all"
                >
                  Shop Now
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
                <Link
                  to="/products"
                  className="inline-flex items-center px-8 py-4 bg-white text-stone-700 font-semibold rounded-xl border-2 border-stone-200 hover:border-amber-500 hover:shadow-lg transition-all"
                >
                  Browse Products
                </Link>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="aspect-square bg-gradient-to-br from-stone-200 to-stone-300 rounded-2xl overflow-hidden">
                <img
                  src="https://images.pexels.com/photos/788946/pexels-photo-788946.jpeg?auto=compress&cs=tinysrgb&w=600"
                  alt="Electronics"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="aspect-square bg-gradient-to-br from-stone-200 to-stone-300 rounded-2xl overflow-hidden mt-8">
                <img
                  src="https://images.pexels.com/photos/4507967/pexels-photo-4507967.jpeg?auto=compress&cs=tinysrgb&w=600"
                  alt="Home Office"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="aspect-square bg-gradient-to-br from-stone-200 to-stone-300 rounded-2xl overflow-hidden -mt-8">
                <img
                  src="https://images.pexels.com/photos/1350789/pexels-photo-1350789.jpeg?auto=compress&cs=tinysrgb&w=600"
                  alt="Kitchen"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="aspect-square bg-gradient-to-br from-stone-200 to-stone-300 rounded-2xl overflow-hidden">
                <img
                  src="https://images.pexels.com/photos/821651/pexels-photo-821651.jpeg?auto=compress&cs=tinysrgb&w=600"
                  alt="Travel"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard
              icon={Truck}
              title="Fast Delivery"
              description="Get your orders delivered quickly with our express shipping options"
            />
            <FeatureCard
              icon={Shield}
              title="Secure Shopping"
              description="Shop with confidence knowing your data is protected"
            />
            <FeatureCard
              icon={Package}
              title="Quality Products"
              description="Carefully curated selection of top-rated products"
            />
          </div>
        </div>
      </section>

      <section className="py-16 bg-gradient-to-b from-stone-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-stone-900 mb-4">
              Featured Products
            </h2>
            <p className="text-lg text-stone-600">
              Check out our top-rated products
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={() => handleAddToCart(product.id)}
              />
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              to="/products"
              className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-semibold rounded-xl hover:shadow-xl hover:scale-105 transition-all"
            >
              View All Products
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-br from-amber-500 to-orange-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Start Shopping?
          </h2>
          <p className="text-xl mb-8 text-amber-50">
            Join thousands of happy customers and find your perfect products today
          </p>
          <Link
            to="/products"
            className="inline-flex items-center px-8 py-4 bg-white text-orange-600 font-semibold rounded-xl hover:shadow-2xl hover:scale-105 transition-all"
          >
            Browse All Products
            <ArrowRight className="ml-2 w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  );
}

function FeatureCard({ icon: Icon, title, description }: any) {
  return (
    <div className="text-center">
      <div className="w-16 h-16 bg-gradient-to-br from-amber-500 to-orange-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
        <Icon className="w-8 h-8 text-white" />
      </div>
      <h3 className="text-xl font-bold text-stone-900 mb-2">{title}</h3>
      <p className="text-stone-600">{description}</p>
    </div>
  );
}

function ProductCard({ product, onAddToCart }: { product: Product; onAddToCart: () => void }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const images = product.images && product.images.length > 0 ? product.images : [product.image_url];

  return (
    <div className="bg-white rounded-xl border border-stone-200 overflow-hidden hover:shadow-lg transition-all group">
      <Link to={`/products/${product.id}`} className="block relative">
        <div className="aspect-square bg-gradient-to-br from-stone-100 to-stone-200 overflow-hidden relative">
          <img
            src={images[currentImageIndex]}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform"
          />
          {images.length > 1 && (
            <>
              <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                {images.map((_, index) => (
                  <button
                    key={index}
                    onClick={(e) => {
                      e.preventDefault();
                      setCurrentImageIndex(index);
                    }}
                    className={`w-2 h-2 rounded-full transition-all ${
                      index === currentImageIndex
                        ? 'bg-amber-500 w-6'
                        : 'bg-white/70 hover:bg-white'
                    }`}
                  />
                ))}
              </div>
              <div className="absolute top-2 right-2 bg-black/50 text-white text-xs px-2 py-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                {currentImageIndex + 1}/{images.length}
              </div>
            </>
          )}
        </div>
      </Link>
      <div className="p-4">
        <Link to={`/products/${product.id}`}>
          <h3 className="font-semibold text-stone-900 mb-2 group-hover:text-amber-600 transition-colors line-clamp-2">
            {product.name}
          </h3>
        </Link>
        <div className="flex items-center justify-between mb-3">
          <span className="text-2xl font-bold text-amber-600">
            ${product.price}
          </span>
          <div className="flex items-center text-sm text-stone-500">
            <span className="text-amber-500">★</span>
            <span className="ml-1">{product.rating}</span>
          </div>
        </div>
        <button
          onClick={onAddToCart}
          className="w-full px-4 py-2 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-semibold rounded-lg hover:shadow-lg hover:scale-105 transition-all"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}
