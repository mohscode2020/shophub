import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { supabase, Product } from '../lib/supabase';
import { useCart } from '../context/CartContext';
import { ArrowLeft, Star, Package, ShoppingCart } from 'lucide-react';

export function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const { addToCart } = useCart();

  useEffect(() => {
    if (id) {
      loadProduct();
    }
  }, [id]);

  const loadProduct = async () => {
    const { data } = await supabase
      .from('products')
      .select('*')
      .eq('id', id)
      .maybeSingle();

    setProduct(data);
  };

  const handleAddToCart = async () => {
    if (product) {
      for (let i = 0; i < quantity; i++) {
        await addToCart(product.id);
      }
    }
  };

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-stone-500">Loading...</div>
      </div>
    );
  }

  const images = product.images && product.images.length > 0 ? product.images : [product.image_url];

  return (
    <div>
      <section className="py-8 bg-white border-b border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            to="/products"
            className="inline-flex items-center text-stone-600 hover:text-amber-600 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Products
          </Link>
        </div>
      </section>

      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <div className="aspect-square bg-gradient-to-br from-stone-100 to-stone-200 rounded-2xl overflow-hidden mb-4">
                <img
                  src={images[selectedImageIndex]}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>

              {images.length > 1 && (
                <div className="grid grid-cols-4 gap-3">
                  {images.map((img, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImageIndex(index)}
                      className={`aspect-square bg-gradient-to-br from-stone-100 to-stone-200 rounded-lg overflow-hidden border-2 transition-all ${
                        index === selectedImageIndex
                          ? 'border-amber-500 ring-2 ring-amber-200'
                          : 'border-transparent hover:border-stone-300'
                      }`}
                    >
                      <img
                        src={img}
                        alt={`${product.name} ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div>
              <div className="mb-4">
                <span className="inline-block px-3 py-1 bg-amber-100 text-amber-700 text-sm font-medium rounded-full">
                  {product.category}
                </span>
              </div>

              <h1 className="text-3xl md:text-4xl font-bold text-stone-900 mb-4">
                {product.name}
              </h1>

              <div className="flex items-center gap-4 mb-6">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${
                        i < Math.floor(product.rating)
                          ? 'text-amber-400 fill-amber-400'
                          : 'text-stone-300'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-stone-600">
                  {product.rating} ({product.reviews_count} reviews)
                </span>
              </div>

              <div className="mb-6">
                <span className="text-4xl font-bold text-amber-600">
                  ${product.price}
                </span>
              </div>

              <div className="bg-stone-50 rounded-xl p-6 mb-6">
                <h3 className="font-semibold text-stone-900 mb-3">Product Description</h3>
                <p className="text-stone-600 leading-relaxed">{product.description}</p>
              </div>

              <div className="flex items-center gap-4 mb-6 p-4 bg-green-50 rounded-xl border border-green-200">
                <Package className="w-6 h-6 text-green-600" />
                <div>
                  <div className="font-semibold text-green-900">In Stock</div>
                  <div className="text-sm text-green-700">{product.stock} units available</div>
                </div>
              </div>

              <div className="flex items-center gap-4 mb-6">
                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-2">
                    Quantity
                  </label>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="w-10 h-10 bg-stone-100 hover:bg-stone-200 rounded-lg font-semibold transition-colors"
                    >
                      -
                    </button>
                    <input
                      type="number"
                      value={quantity}
                      onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                      className="w-20 h-10 text-center border border-stone-300 rounded-lg font-semibold"
                      min="1"
                    />
                    <button
                      onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                      className="w-10 h-10 bg-stone-100 hover:bg-stone-200 rounded-lg font-semibold transition-colors"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>

              <button
                onClick={handleAddToCart}
                className="w-full flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-semibold rounded-xl hover:shadow-xl hover:scale-105 transition-all"
              >
                <ShoppingCart className="w-5 h-5" />
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
