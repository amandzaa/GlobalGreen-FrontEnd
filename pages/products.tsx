import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../Group final project/store/slices/cartSlice';
import { useWishlist } from '../contexts/WishlistContext';

interface Product {
    category_id: number;
    created_at: string;
    description: string;
    image_url: string;
    images: string[];
    name: string;
    organic: boolean;
    price: number;
    product_id: number;
    stock_quantity: number;
    unit_type: string;
    updated_at: string;
}

const AllProductsPage: React.FC = () => {
    const router = useRouter();
    const dispatch = useDispatch();
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [page, setPage] = useState(1);
    const [message, setMessage] = useState('');
    const [search, setSearch] = useState('');
    const [category, setCategory] = useState('all');
    const [sort, setSort] = useState('newest');
    const { isWishlisted, toggleWishlist } = useWishlist();

    const fetchProducts = async () => {
        try {
            const response = await fetch('https://globalgreen-backend-production.up.railway.app/products'); // Replace with your actual API URL
            if (!response.ok) {
                throw new Error('Failed to fetch products');
            }
            const data = await response.json();
            setProducts(data);
        } catch (error) {
            console.error('Error fetching products:', error);
            setError('Failed to load products');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    const handleAddToCart = (product: Product) => {
        dispatch(addToCart({ ...product, stock_quantity: 1 }));
    };

    const handleViewDetails = (product: Product) => {
        router.push(`/products/${product.product_id}`);
    };

    const filteredProducts = products.filter(product => {
        if (category === 'all') return true;
        if (category === 'organic') return product.organic;
        if (category === 'new') return product.created_at > '2022-01-01'; // Replace with actual date
        return product.category_id === parseInt(category);
    });

    const sortedProducts = [...filteredProducts].sort((a, b) => {
        if (sort === 'price') return a.price - b.price;
        return a.name.localeCompare(b.name);
    });

    return (
        <div className="products-container">
            <h2 className="products-title">All Products</h2>
            <div className="products-filter">
                <select value={category} onChange={(e) => setCategory(e.target.value)}>
                    <option value="all">All Products</option>
                    <option value="organic">Organic Only</option>
                    <option value="new">New Arrivals</option>
                    <option value="1">Root Vegetables</option>
                    <option value="2">Leafy Greens</option>
                    <option value="3">Fruits</option>
                </select>
                <select value={sort} onChange={(e) => setSort(e.target.value)}>
                    <option value="price">Sort by Price</option>
                    <option value="name">Sort by Name</option>
                </select>
            </div>
            <div className="products-grid">
                {sortedProducts.map(product => (
                    <div key={product.product_id} className="product-card">
                        <img src={product.image_url} alt={product.name} className="product-image" />
                        <h3 className="product-name">{product.name}</h3>
                        <p className="product-description">{product.description}</p>
                        <p className="product-price">${product.price.toFixed(2)}</p>
                        <button className="product-add-to-cart" onClick={() => handleAddToCart(product)}>Add to Cart</button>
                        <button className="product-view-details" onClick={() => handleViewDetails(product)}>View Details</button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AllProductsPage;