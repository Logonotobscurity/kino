# Supabase Setup for Kinkosais

This guide will help you set up the Supabase project for the Kinkosais application.

## 1. Create a Supabase Project

1. Visit [Supabase](https://supabase.com/) and sign up or log in
2. Create a new project
3. Choose a region close to your target audience
4. Set a secure database password
5. Wait for the project to initialize

## 2. Get Project API Keys

Once your project is created:

1. Go to Project Settings → API
2. Copy the `URL` value to your `.env.local` file as `NEXT_PUBLIC_SUPABASE_URL`
3. Copy the `anon` key to your `.env.local` file as `NEXT_PUBLIC_SUPABASE_ANON_KEY`

## 3. Configure Authentication

1. Go to Authentication → Settings
2. Configure your site URL: `https://yourdomain.com` (or `http://localhost:3000` for local development)
3. Set up redirect URLs:
   - `https://yourdomain.com/auth/callback`
   - `http://localhost:3000/auth/callback`
4. Enable the Email provider and set a secure JWT expiry time (e.g., 604800 seconds/7 days)
5. Optional: Configure additional providers like Google

## 4. Set Up Database Tables

### Products Table

```sql
CREATE TABLE products (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  price DECIMAL(10, 2) NOT NULL,
  image_url TEXT NOT NULL,
  category TEXT NOT NULL,
  attributes JSONB DEFAULT '{}'::JSONB,
  stock_quantity INTEGER NOT NULL DEFAULT 0
);

-- Create index on category for faster searches
CREATE INDEX products_category_idx ON products(category);
```

### Orders Table

```sql
CREATE TABLE orders (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  user_id UUID REFERENCES auth.users(id) NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending',
  total_amount DECIMAL(10, 2) NOT NULL,
  shipping_address JSONB NOT NULL,
  payment_info JSONB NOT NULL
);

-- Create index on user_id for faster user order lookups
CREATE INDEX orders_user_id_idx ON orders(user_id);
```

### Order Items Table

```sql
CREATE TABLE order_items (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  order_id UUID REFERENCES orders(id) ON DELETE CASCADE NOT NULL,
  product_id UUID REFERENCES products(id) NOT NULL,
  quantity INTEGER NOT NULL,
  price DECIMAL(10, 2) NOT NULL
);

-- Create index on order_id for faster order item lookups
CREATE INDEX order_items_order_id_idx ON order_items(order_id);
```

### Dungeon Bookings Table

```sql
CREATE TABLE dungeon_bookings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  user_id UUID REFERENCES auth.users(id) NOT NULL,
  booking_date TIMESTAMP WITH TIME ZONE NOT NULL,
  duration INTEGER NOT NULL, -- Duration in hours
  price DECIMAL(10, 2) NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending',
  special_requests TEXT
);

-- Create index on user_id for faster user booking lookups
CREATE INDEX dungeon_bookings_user_id_idx ON dungeon_bookings(user_id);

-- Create index on booking_date for availability checks
CREATE INDEX dungeon_bookings_date_idx ON dungeon_bookings(booking_date);
```

### Profiles Table

```sql
CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  updated_at TIMESTAMP WITH TIME ZONE,
  username TEXT UNIQUE,
  full_name TEXT,
  avatar_url TEXT,
  email TEXT,
  phone TEXT,
  address JSONB,
  preferences JSONB
);

-- Create index on username for faster searches
CREATE INDEX profiles_username_idx ON profiles(username);
```

## 5. Create Row Level Security Policies

For security, we'll add Row Level Security policies to control access to our data:

### Profiles Table RLS

```sql
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Policy for viewing profiles
CREATE POLICY "Public profiles are viewable by everyone" 
ON profiles FOR SELECT USING (true);

-- Policy for users to update their own profiles
CREATE POLICY "Users can update their own profiles" 
ON profiles FOR UPDATE USING (auth.uid() = id);

-- Policy for inserting profiles (only authenticated users)
CREATE POLICY "Users can insert their own profiles" 
ON profiles FOR INSERT WITH CHECK (auth.uid() = id);
```

### Products Table RLS

```sql
ALTER TABLE products ENABLE ROW LEVEL SECURITY;

-- Policy for viewing products (public)
CREATE POLICY "Products are viewable by everyone" 
ON products FOR SELECT USING (true);

-- Policy for inserting/updating/deleting products (admin only)
-- You'll need to implement admin checks
```

### Orders Table RLS

```sql
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;

-- Policy for users to view their own orders
CREATE POLICY "Users can view their own orders" 
ON orders FOR SELECT USING (auth.uid() = user_id);

-- Policy for users to insert their own orders
CREATE POLICY "Users can create their own orders" 
ON orders FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Policy for users to update their own orders (only if status is not completed)
CREATE POLICY "Users can update their own pending orders" 
ON orders FOR UPDATE USING (
  auth.uid() = user_id AND 
  status NOT IN ('completed', 'shipped')
);
```

### Dungeon Bookings Table RLS

```sql
ALTER TABLE dungeon_bookings ENABLE ROW LEVEL SECURITY;

-- Policy for users to view their own bookings
CREATE POLICY "Users can view their own bookings" 
ON dungeon_bookings FOR SELECT USING (auth.uid() = user_id);

-- Policy for users to insert their own bookings
CREATE POLICY "Users can create their own bookings" 
ON dungeon_bookings FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Policy for users to update their own bookings (only if status is not completed)
CREATE POLICY "Users can update their own pending bookings" 
ON dungeon_bookings FOR UPDATE USING (
  auth.uid() = user_id AND 
  status NOT IN ('completed', 'cancelled')
);
```

## 6. Configure Auth Hooks

Create a trigger to automatically create a profile when a user signs up:

```sql
-- Function to handle new user creation
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email)
  VALUES (NEW.id, NEW.email);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger the function when a user is created
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();
```

## 7. Final Steps

1. Verify all tables are created correctly
2. Test authentication flows
3. Create sample products for testing

Your Supabase database is now configured and ready to use with the Kinkosais application! 