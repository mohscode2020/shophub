import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase, Product } from '../lib/supabase';
import { useCart } from '../context/CartContext';
import { Filter, ChevronLeft, ChevronRight } from 'lucide-react';

export function Products() {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [categories, setCategories] = useState<string[]>([]);
  const { addToCart } = useCart();

  useEffect(() => {
    loadProducts();
    loadCategories();
  }, [selectedCategory]);

  const loadProducts = async () => {
    let query = supabase.from('products').select('*');

    if (selectedCategory !== 'All') {
      query = query.eq('category', selectedCategory);
    }

    const { data } = await query.order('created_at', { ascending: false });
    setProducts(data || []);
  };

  const loadCategories = async () => {
    const { data } = await supabase
      .from('products')
      .select('category');

    const uniqueCategories = Array.from(new Set(data?.map(p => p.category) || []));
    setCategories(['All', ...uniqueCategories]);
  };

  const handleAddToCart = async (productId: string) => {
    await addToCart(productId);
  };

  return (
    <div>
      <section className="relative overflow-hidden bg-gradient-to-br from-amber-50 via-orange-50 to-stone-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold text-stone-900 mb-4 text-center">
            All Products
          </h1>
          <p className="text-lg text-stone-600 text-center">
            Discover our complete collection of quality products
          </p>
        </div>
      </section>

      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4 mb-8 overflow-x-auto pb-2">
            <div className="flex items-center gap-2 flex-shrink-0">
              <Filter className="w-5 h-5 text-stone-500" />
              <span className="font-medium text-stone-700">Filter:</span>
            </div>
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-lg font-medium transition-all whitespace-nowrap ${
                  selectedCategory === category
                    ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-lg'
                    : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={() => handleAddToCart(product.id)}
              />
            ))}
          </div>

          {products.length === 0 && (
            <div className="text-center py-12">
              <p className="text-stone-500 text-lg">No products found</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

function ProductCard({ product, onAddToCart }: { product: Product; onAddToCart: () => void }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const images = product.images && product.images.length > 0 ? product.images : [product.image_url];

  const nextImage = (e: React.MouseEvent) => {
    e.preventDefault();
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = (e: React.MouseEvent) => {
    e.preventDefault();
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="bg-white rounded-xl border border-stone-200 overflow-hidden hover:shadow-lg transition-all group">
      <div className="relative">
        <Link to={`/products/${product.id}`} className="block">
          <div className="aspect-square bg-gradient-to-br from-stone-100 to-stone-200 overflow-hidden relative">
            <img
              src={images[currentImageIndex]}
              alt={product.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform"
            />
          </div>
        </Link>

        {images.length > 1 && (
          <>
            <button
              onClick={prevImage}
              className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-white/90 hover:bg-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-lg"
            >
              <ChevronLeft className="w-5 h-5 text-stone-700" />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-white/90 hover:bg-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-lg"
            >
              <ChevronRight className="w-5 h-5 text-stone-700" />
            </button>
            <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex gap-1.5">
              {images.map((_, index) => (
                <div
                  key={index}
                  className={`w-1.5 h-1.5 rounded-full transition-all ${
                    index === currentImageIndex
                      ? 'bg-amber-500 w-4'
                      : 'bg-white/70'
                  }`}
                />
              ))}
            </div>
          </>
        )}
      </div>

      <div className="p-4">
        <div className="text-xs font-medium text-amber-600 mb-1">{product.category}</div>
        <Link to={`/products/${product.id}`}>
          <h3 className="font-semibold text-stone-900 mb-2 group-hover:text-amber-600 transition-colors line-clamp-2">
            {product.name}
          </h3>
        </Link>
        <div className="flex items-center gap-2 mb-3">
          <div className="flex items-center text-sm">
            <span className="text-amber-500">★</span>
            <span className="ml-1 text-stone-600">{product.rating}</span>
          </div>
          <span className="text-xs text-stone-400">({product.reviews_count} reviews)</span>
        </div>
        <div className="flex items-center justify-between mb-3">
          <span className="text-2xl font-bold text-amber-600">
            ${product.price}
          </span>
          <span className="text-sm text-stone-500">{product.stock} in stock</span>
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
