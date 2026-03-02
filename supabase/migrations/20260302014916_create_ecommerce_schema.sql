/*
  # E-commerce Database Schema

  1. New Tables
    - `products`
      - `id` (uuid, primary key)
      - `name` (text)
      - `description` (text)
      - `price` (decimal)
      - `category` (text)
      - `image_url` (text)
      - `stock` (integer)
      - `rating` (decimal)
      - `reviews_count` (integer)
      - `created_at` (timestamp)
    
    - `cart_items`
      - `id` (uuid, primary key)
      - `user_id` (uuid, nullable for guest carts)
      - `session_id` (text, for guest users)
      - `product_id` (uuid, foreign key)
      - `quantity` (integer)
      - `created_at` (timestamp)
    
    - `orders`
      - `id` (uuid, primary key)
      - `user_id` (uuid, nullable)
      - `session_id` (text)
      - `total_amount` (decimal)
      - `status` (text)
      - `shipping_address` (jsonb)
      - `created_at` (timestamp)
    
    - `order_items`
      - `id` (uuid, primary key)
      - `order_id` (uuid, foreign key)
      - `product_id` (uuid, foreign key)
      - `quantity` (integer)
      - `price` (decimal)
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on all tables
    - Add policies for public read access to products
    - Add policies for cart and order management
*/

CREATE TABLE IF NOT EXISTS products (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text NOT NULL,
  price decimal(10,2) NOT NULL,
  category text NOT NULL,
  image_url text NOT NULL,
  stock integer NOT NULL DEFAULT 0,
  rating decimal(2,1) DEFAULT 0,
  reviews_count integer DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS cart_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid,
  session_id text NOT NULL,
  product_id uuid REFERENCES products(id) ON DELETE CASCADE,
  quantity integer NOT NULL DEFAULT 1,
  created_at timestamptz DEFAULT now(),
  UNIQUE(session_id, product_id)
);

CREATE TABLE IF NOT EXISTS orders (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid,
  session_id text NOT NULL,
  total_amount decimal(10,2) NOT NULL,
  status text NOT NULL DEFAULT 'pending',
  shipping_address jsonb NOT NULL,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS order_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id uuid REFERENCES orders(id) ON DELETE CASCADE,
  product_id uuid REFERENCES products(id),
  quantity integer NOT NULL,
  price decimal(10,2) NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE cart_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Products are viewable by everyone"
  ON products FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Anyone can view their cart items"
  ON cart_items FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Anyone can insert cart items"
  ON cart_items FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Anyone can update their cart items"
  ON cart_items FOR UPDATE
  TO anon, authenticated
  USING (true);

CREATE POLICY "Anyone can delete their cart items"
  ON cart_items FOR DELETE
  TO anon, authenticated
  USING (true);

CREATE POLICY "Anyone can view their orders"
  ON orders FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Anyone can create orders"
  ON orders FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Order items viewable by everyone"
  ON order_items FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Order items insertable by everyone"
  ON order_items FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

INSERT INTO products (name, description, price, category, image_url, stock, rating, reviews_count) VALUES
('Wireless Bluetooth Headphones', 'Premium noise-canceling headphones with 30-hour battery life', 79.99, 'Electronics', 'https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&w=800', 50, 4.5, 1247),
('Smart Watch Pro', 'Fitness tracker with heart rate monitor and GPS', 199.99, 'Electronics', 'https://images.pexels.com/photos/437037/pexels-photo-437037.jpeg?auto=compress&cs=tinysrgb&w=800', 30, 4.7, 892),
('Portable Laptop Stand', 'Ergonomic aluminum laptop stand for better posture', 34.99, 'Office', 'https://images.pexels.com/photos/7974/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=800', 100, 4.3, 543),
('LED Desk Lamp', 'Adjustable brightness LED lamp with USB charging port', 45.99, 'Office', 'https://images.pexels.com/photos/1112598/pexels-photo-1112598.jpeg?auto=compress&cs=tinysrgb&w=800', 75, 4.6, 321),
('Yoga Mat Premium', 'Non-slip exercise mat with carrying strap', 29.99, 'Sports', 'https://images.pexels.com/photos/3822166/pexels-photo-3822166.jpeg?auto=compress&cs=tinysrgb&w=800', 120, 4.4, 678),
('Insulated Water Bottle', 'Stainless steel bottle keeps drinks cold for 24 hours', 24.99, 'Sports', 'https://images.pexels.com/photos/1000084/pexels-photo-1000084.jpeg?auto=compress&cs=tinysrgb&w=800', 200, 4.8, 1543),
('Coffee Maker Deluxe', 'Programmable coffee maker with thermal carafe', 89.99, 'Home', 'https://images.pexels.com/photos/324028/pexels-photo-324028.jpeg?auto=compress&cs=tinysrgb&w=800', 45, 4.5, 432),
('Air Fryer XL', 'Large capacity air fryer with digital controls', 129.99, 'Home', 'https://images.pexels.com/photos/4252139/pexels-photo-4252139.jpeg?auto=compress&cs=tinysrgb&w=800', 35, 4.7, 987),
('Backpack Travel Pro', 'Water-resistant backpack with laptop compartment', 59.99, 'Travel', 'https://images.pexels.com/photos/2905238/pexels-photo-2905238.jpeg?auto=compress&cs=tinysrgb&w=800', 80, 4.6, 765),
('Portable Charger 20000mAh', 'Fast charging power bank for all devices', 39.99, 'Electronics', 'https://images.pexels.com/photos/4195325/pexels-photo-4195325.jpeg?auto=compress&cs=tinysrgb&w=800', 150, 4.5, 1234),
('Wireless Mouse', 'Ergonomic wireless mouse with precision tracking', 19.99, 'Office', 'https://images.pexels.com/photos/2115256/pexels-photo-2115256.jpeg?auto=compress&cs=tinysrgb&w=800', 250, 4.4, 567),
('Plant Grow Light', 'Full spectrum LED grow light for indoor plants', 44.99, 'Home', 'https://images.pexels.com/photos/4505447/pexels-photo-4505447.jpeg?auto=compress&cs=tinysrgb&w=800', 60, 4.6, 234);
