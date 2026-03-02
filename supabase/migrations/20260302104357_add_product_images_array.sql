/*
  # Add Multiple Images Support for Products

  1. Changes
    - Add `images` column to products table as jsonb array
    - Update existing products to have multiple image URLs
    - Keep `image_url` for backward compatibility (primary image)

  2. Updates
    - Populate products with multiple product images
*/

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'products' AND column_name = 'images'
  ) THEN
    ALTER TABLE products ADD COLUMN images jsonb DEFAULT '[]'::jsonb;
  END IF;
END $$;

UPDATE products SET images = jsonb_build_array(
  'https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&w=800',
  'https://images.pexels.com/photos/3587478/pexels-photo-3587478.jpeg?auto=compress&cs=tinysrgb&w=800',
  'https://images.pexels.com/photos/3945683/pexels-photo-3945683.jpeg?auto=compress&cs=tinysrgb&w=800',
  'https://images.pexels.com/photos/3394658/pexels-photo-3394658.jpeg?auto=compress&cs=tinysrgb&w=800'
) WHERE name = 'Wireless Bluetooth Headphones';

UPDATE products SET images = jsonb_build_array(
  'https://images.pexels.com/photos/437037/pexels-photo-437037.jpeg?auto=compress&cs=tinysrgb&w=800',
  'https://images.pexels.com/photos/393047/pexels-photo-393047.jpeg?auto=compress&cs=tinysrgb&w=800',
  'https://images.pexels.com/photos/1927259/pexels-photo-1927259.jpeg?auto=compress&cs=tinysrgb&w=800',
  'https://images.pexels.com/photos/1638347/pexels-photo-1638347.jpeg?auto=compress&cs=tinysrgb&w=800'
) WHERE name = 'Smart Watch Pro';

UPDATE products SET images = jsonb_build_array(
  'https://images.pexels.com/photos/7974/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=800',
  'https://images.pexels.com/photos/4226140/pexels-photo-4226140.jpeg?auto=compress&cs=tinysrgb&w=800',
  'https://images.pexels.com/photos/4050315/pexels-photo-4050315.jpeg?auto=compress&cs=tinysrgb&w=800',
  'https://images.pexels.com/photos/6238050/pexels-photo-6238050.jpeg?auto=compress&cs=tinysrgb&w=800'
) WHERE name = 'Portable Laptop Stand';

UPDATE products SET images = jsonb_build_array(
  'https://images.pexels.com/photos/1112598/pexels-photo-1112598.jpeg?auto=compress&cs=tinysrgb&w=800',
  'https://images.pexels.com/photos/1094770/pexels-photo-1094770.jpeg?auto=compress&cs=tinysrgb&w=800',
  'https://images.pexels.com/photos/1279030/pexels-photo-1279030.jpeg?auto=compress&cs=tinysrgb&w=800',
  'https://images.pexels.com/photos/159045/the-interior-of-the-repair-interior-design-159045.jpeg?auto=compress&cs=tinysrgb&w=800'
) WHERE name = 'LED Desk Lamp';

UPDATE products SET images = jsonb_build_array(
  'https://images.pexels.com/photos/3822166/pexels-photo-3822166.jpeg?auto=compress&cs=tinysrgb&w=800',
  'https://images.pexels.com/photos/4325484/pexels-photo-4325484.jpeg?auto=compress&cs=tinysrgb&w=800',
  'https://images.pexels.com/photos/3822906/pexels-photo-3822906.jpeg?auto=compress&cs=tinysrgb&w=800',
  'https://images.pexels.com/photos/4056723/pexels-photo-4056723.jpeg?auto=compress&cs=tinysrgb&w=800'
) WHERE name = 'Yoga Mat Premium';

UPDATE products SET images = jsonb_build_array(
  'https://images.pexels.com/photos/1000084/pexels-photo-1000084.jpeg?auto=compress&cs=tinysrgb&w=800',
  'https://images.pexels.com/photos/4022073/pexels-photo-4022073.jpeg?auto=compress&cs=tinysrgb&w=800',
  'https://images.pexels.com/photos/4021986/pexels-photo-4021986.jpeg?auto=compress&cs=tinysrgb&w=800',
  'https://images.pexels.com/photos/4021987/pexels-photo-4021987.jpeg?auto=compress&cs=tinysrgb&w=800'
) WHERE name = 'Insulated Water Bottle';

UPDATE products SET images = jsonb_build_array(
  'https://images.pexels.com/photos/324028/pexels-photo-324028.jpeg?auto=compress&cs=tinysrgb&w=800',
  'https://images.pexels.com/photos/6069099/pexels-photo-6069099.jpeg?auto=compress&cs=tinysrgb&w=800',
  'https://images.pexels.com/photos/2693979/pexels-photo-2693979.jpeg?auto=compress&cs=tinysrgb&w=800',
  'https://images.pexels.com/photos/1251175/pexels-photo-1251175.jpeg?auto=compress&cs=tinysrgb&w=800'
) WHERE name = 'Coffee Maker Deluxe';

UPDATE products SET images = jsonb_build_array(
  'https://images.pexels.com/photos/4252139/pexels-photo-4252139.jpeg?auto=compress&cs=tinysrgb&w=800',
  'https://images.pexels.com/photos/6419128/pexels-photo-6419128.jpeg?auto=compress&cs=tinysrgb&w=800',
  'https://images.pexels.com/photos/5737540/pexels-photo-5737540.jpeg?auto=compress&cs=tinysrgb&w=800',
  'https://images.pexels.com/photos/7937676/pexels-photo-7937676.jpeg?auto=compress&cs=tinysrgb&w=800'
) WHERE name = 'Air Fryer XL';

UPDATE products SET images = jsonb_build_array(
  'https://images.pexels.com/photos/2905238/pexels-photo-2905238.jpeg?auto=compress&cs=tinysrgb&w=800',
  'https://images.pexels.com/photos/2783873/pexels-photo-2783873.jpeg?auto=compress&cs=tinysrgb&w=800',
  'https://images.pexels.com/photos/1545998/pexels-photo-1545998.jpeg?auto=compress&cs=tinysrgb&w=800',
  'https://images.pexels.com/photos/2422476/pexels-photo-2422476.jpeg?auto=compress&cs=tinysrgb&w=800'
) WHERE name = 'Backpack Travel Pro';

UPDATE products SET images = jsonb_build_array(
  'https://images.pexels.com/photos/4195325/pexels-photo-4195325.jpeg?auto=compress&cs=tinysrgb&w=800',
  'https://images.pexels.com/photos/7689734/pexels-photo-7689734.jpeg?auto=compress&cs=tinysrgb&w=800',
  'https://images.pexels.com/photos/4526414/pexels-photo-4526414.jpeg?auto=compress&cs=tinysrgb&w=800',
  'https://images.pexels.com/photos/8000624/pexels-photo-8000624.jpeg?auto=compress&cs=tinysrgb&w=800'
) WHERE name = 'Portable Charger 20000mAh';

UPDATE products SET images = jsonb_build_array(
  'https://images.pexels.com/photos/2115256/pexels-photo-2115256.jpeg?auto=compress&cs=tinysrgb&w=800',
  'https://images.pexels.com/photos/1999463/pexels-photo-1999463.jpeg?auto=compress&cs=tinysrgb&w=800',
  'https://images.pexels.com/photos/963696/pexels-photo-963696.jpeg?auto=compress&cs=tinysrgb&w=800',
  'https://images.pexels.com/photos/2115257/pexels-photo-2115257.jpeg?auto=compress&cs=tinysrgb&w=800'
) WHERE name = 'Wireless Mouse';

UPDATE products SET images = jsonb_build_array(
  'https://images.pexels.com/photos/4505447/pexels-photo-4505447.jpeg?auto=compress&cs=tinysrgb&w=800',
  'https://images.pexels.com/photos/4505461/pexels-photo-4505461.jpeg?auto=compress&cs=tinysrgb&w=800',
  'https://images.pexels.com/photos/7728080/pexels-photo-7728080.jpeg?auto=compress&cs=tinysrgb&w=800',
  'https://images.pexels.com/photos/7728089/pexels-photo-7728089.jpeg?auto=compress&cs=tinysrgb&w=800'
) WHERE name = 'Plant Grow Light';
