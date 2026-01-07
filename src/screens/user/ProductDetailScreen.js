import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Card from '../../components/Card';

const ProductDetailScreen = ({ route, navigation }) => {
  const { product, category } = route.params;
  const [selectedSize, setSelectedSize] = useState(product.sizes?.[0] || null);
  const [selectedColor, setSelectedColor] = useState(product.colors?.[0] || null);
  const [selectedFlavor, setSelectedFlavor] = useState(product.flavors?.[0] || null);
  const [quantity, setQuantity] = useState(1);

  const hasSizes = product.sizes && product.sizes.length > 0;
  const hasColors = product.colors && product.colors.length > 0;
  const hasFlavors = product.flavors && product.flavors.length > 0;

  const handleAddToCart = () => {
    const cartItem = {
      ...product,
      size: selectedSize,
      color: selectedColor,
      flavor: selectedFlavor,
      quantity,
    };
    Alert.alert('Added to Cart', `${product.name} has been added to your cart!`);
    console.log('Added to cart:', cartItem);
  };

  const handleBuyNow = () => {
    // Placeholder for buy now functionality
    Alert.alert('Buy Now', 'Checkout functionality coming soon!');
  };

  const getStockStatus = () => {
    if (product.stock > 20) return { text: 'In Stock', color: '#34C759' };
    if (product.stock > 0) return { text: `Only ${product.stock} left`, color: '#FF9500' };
    return { text: 'Out of Stock', color: '#FF3B30' };
  };

  const stockStatus = getStockStatus();

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#007AFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Product Details</Text>
        <TouchableOpacity style={styles.cartButton}>
          <Ionicons name="cart-outline" size={24} color="#007AFF" />
        </TouchableOpacity>
      </View>

      <View style={styles.productImageContainer}>
        <Text style={styles.productEmoji}>{product.image}</Text>
      </View>

      <Card style={styles.productInfoCard}>
        <Text style={styles.productName}>{product.name}</Text>
        <View style={styles.priceAndStock}>
          <Text style={styles.price}>${product.price.toFixed(2)}</Text>
          <View style={[styles.stockBadge, { backgroundColor: `${stockStatus.color}20` }]}>
            <Text style={[styles.stockText, { color: stockStatus.color }]}>{stockStatus.text}</Text>
          </View>
        </View>
        <Text style={styles.description}>{product.description}</Text>

        {product.weight && (
          <View style={styles.metadata}>
            <Ionicons name="scale-outline" size={18} color="#666666" />
            <Text style={styles.metadataText}>Weight: {product.weight}</Text>
          </View>
        )}

        {product.quantity && (
          <View style={styles.metadata}>
            <Ionicons name="grid-outline" size={18} color="#666666" />
            <Text style={styles.metadataText}>Quantity: {product.quantity}</Text>
          </View>
        )}

        <View style={styles.metadata}>
          <Ionicons name="cube-outline" size={18} color="#666666" />
          <Text style={styles.metadataText}>Stock: {product.stock} units</Text>
        </View>
      </Card>

      {hasSizes && (
        <Card style={styles.optionsCard}>
          <Text style={styles.optionsTitle}>Size</Text>
          <View style={styles.optionsContainer}>
            {product.sizes.map((size) => (
              <TouchableOpacity
                key={size}
                style={[
                  styles.optionButton,
                  selectedSize === size && styles.optionButtonActive,
                ]}
                onPress={() => setSelectedSize(size)}
              >
                <Text
                  style={[
                    styles.optionButtonText,
                    selectedSize === size && styles.optionButtonTextActive,
                  ]}
                >
                  {size}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </Card>
      )}

      {hasColors && (
        <Card style={styles.optionsCard}>
          <Text style={styles.optionsTitle}>Color</Text>
          <View style={styles.optionsContainer}>
            {product.colors.map((color) => (
              <TouchableOpacity
                key={color}
                style={[
                  styles.optionButton,
                  selectedColor === color && styles.optionButtonActive,
                ]}
                onPress={() => setSelectedColor(color)}
              >
                <Text
                  style={[
                    styles.optionButtonText,
                    selectedColor === color && styles.optionButtonTextActive,
                  ]}
                >
                  {color}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </Card>
      )}

      {hasFlavors && (
        <Card style={styles.optionsCard}>
          <Text style={styles.optionsTitle}>Flavor</Text>
          <View style={styles.optionsContainer}>
            {product.flavors.map((flavor) => (
              <TouchableOpacity
                key={flavor}
                style={[
                  styles.optionButton,
                  selectedFlavor === flavor && styles.optionButtonActive,
                ]}
                onPress={() => setSelectedFlavor(flavor)}
              >
                <Text
                  style={[
                    styles.optionButtonText,
                    selectedFlavor === flavor && styles.optionButtonTextActive,
                  ]}
                >
                  {flavor}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </Card>
      )}

      <Card style={styles.quantityCard}>
        <Text style={styles.quantityTitle}>Quantity</Text>
        <View style={styles.quantitySelector}>
          <TouchableOpacity
            style={styles.quantityButton}
            onPress={() => setQuantity(Math.max(1, quantity - 1))}
          >
            <Ionicons name="remove" size={24} color="#007AFF" />
          </TouchableOpacity>
          <View style={styles.quantityValue}>
            <Text style={styles.quantityText}>{quantity}</Text>
          </View>
          <TouchableOpacity
            style={styles.quantityButton}
            onPress={() => setQuantity(quantity + 1)}
          >
            <Ionicons name="add" size={24} color="#007AFF" />
          </TouchableOpacity>
        </View>
      </Card>

      <View style={styles.totalContainer}>
        <Text style={styles.totalLabel}>Total</Text>
        <Text style={styles.totalValue}>${(product.price * quantity).toFixed(2)}</Text>
      </View>

      <TouchableOpacity style={styles.addToCartButton} onPress={handleAddToCart}>
        <Ionicons name="cart" size={20} color="#FFFFFF" style={styles.buttonIcon} />
        <Text style={styles.addToCartButtonText}>Add to Cart</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.buyNowButton} onPress={handleBuyNow}>
        <Text style={styles.buyNowButtonText}>Buy Now</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
    paddingTop: 20,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  backButton: {
    padding: 5,
  },
  headerTitle: {
    flex: 1,
    fontSize: 18,
    fontWeight: '700',
    color: '#333333',
    textAlign: 'center',
  },
  cartButton: {
    padding: 5,
  },
  productImageContainer: {
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 40,
    margin: 20,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  productEmoji: {
    fontSize: 80,
  },
  productInfoCard: {
    marginHorizontal: 20,
    marginBottom: 15,
  },
  productName: {
    fontSize: 24,
    fontWeight: '700',
    color: '#333333',
    marginBottom: 10,
  },
  priceAndStock: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  price: {
    fontSize: 28,
    fontWeight: '700',
    color: '#007AFF',
  },
  stockBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  stockText: {
    fontSize: 12,
    fontWeight: '600',
  },
  description: {
    fontSize: 14,
    color: '#666666',
    lineHeight: 20,
    marginBottom: 15,
  },
  metadata: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  metadataText: {
    fontSize: 13,
    color: '#666666',
    marginLeft: 8,
  },
  optionsCard: {
    marginHorizontal: 20,
    marginBottom: 15,
  },
  optionsTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333333',
    marginBottom: 12,
  },
  optionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  optionButton: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
    backgroundColor: '#F5F5F5',
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  optionButtonActive: {
    backgroundColor: '#007AFF',
    borderColor: '#007AFF',
  },
  optionButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666666',
  },
  optionButtonTextActive: {
    color: '#FFFFFF',
  },
  quantityCard: {
    marginHorizontal: 20,
    marginBottom: 15,
  },
  quantityTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333333',
    marginBottom: 12,
  },
  quantitySelector: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  quantityButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#F5F5F5',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  quantityValue: {
    width: 80,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
  },
  quantityText: {
    fontSize: 20,
    fontWeight: '700',
    color: '#333333',
  },
  totalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 15,
  },
  totalLabel: {
    fontSize: 18,
    fontWeight: '600',
    color: '#666666',
  },
  totalValue: {
    fontSize: 28,
    fontWeight: '700',
    color: '#007AFF',
  },
  addToCartButton: {
    backgroundColor: '#007AFF',
    borderRadius: 10,
    paddingVertical: 15,
    marginHorizontal: 20,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  buttonIcon: {
    marginRight: 8,
  },
  addToCartButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  buyNowButton: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: '#007AFF',
    borderRadius: 10,
    paddingVertical: 15,
    marginHorizontal: 20,
    marginBottom: 30,
    alignItems: 'center',
  },
  buyNowButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#007AFF',
  },
});

export default ProductDetailScreen;
