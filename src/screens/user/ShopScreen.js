import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Card from '../../components/Card';
import { products } from '../../data/data';

const ShopScreen = ({ navigation }) => {
  const [selectedCategory, setSelectedCategory] = useState('apparels');

  const categories = [
    { id: 'apparels', name: 'Apparels', icon: 'shirt-outline' },
    { id: 'food', name: 'Food & Supplements', icon: 'nutrition-outline' },
    { id: 'equipment', name: 'Equipment', icon: 'barbell-outline' },
    { id: 'tools', name: 'Tools', icon: 'build-outline' },
  ];

  const currentProducts = products[selectedCategory] || [];

  const handleProductPress = (product) => {
    navigation.navigate('ProductDetail', { product, category: selectedCategory });
  };

  const handleAddToCart = (product) => {
    // Placeholder for add to cart functionality
    console.log('Added to cart:', product.name);
  };

  const renderCategoryItem = ({ item }) => (
    <TouchableOpacity
      style={[
        styles.categoryItem,
        selectedCategory === item.id && styles.categoryItemActive,
      ]}
      onPress={() => setSelectedCategory(item.id)}
    >
      <Ionicons
        name={item.icon}
        size={20}
        color={selectedCategory === item.id ? '#FFFFFF' : '#666666'}
      />
      <Text
        style={[
          styles.categoryItemText,
          selectedCategory === item.id && styles.categoryItemTextActive,
        ]}
      >
        {item.name}
      </Text>
    </TouchableOpacity>
  );

  const renderProductItem = ({ item }) => (
    <TouchableOpacity onPress={() => handleProductPress(item)} activeOpacity={0.7}>
      <Card style={styles.productCard}>
        <View style={styles.productImage}>
          <Text style={styles.productEmoji}>{item.image}</Text>
        </View>
        <Text style={styles.productName} numberOfLines={2}>
          {item.name}
        </Text>
        <Text style={styles.productDescription} numberOfLines={2}>
          {item.description}
        </Text>
        <View style={styles.productFooter}>
          <Text style={styles.productPrice}>${item.price.toFixed(2)}</Text>
          <TouchableOpacity
            style={styles.addToCartButton}
            onPress={() => handleAddToCart(item)}
          >
            <Ionicons name="cart" size={18} color="#FFFFFF" />
          </TouchableOpacity>
        </View>
      </Card>
    </TouchableOpacity>
  );

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <Text style={styles.title}>Shop</Text>
        <Text style={styles.subtitle}>Premium fitness products</Text>
      </View>

      <View style={styles.categorySelector}>
        <FlatList
          data={categories}
          renderItem={renderCategoryItem}
          keyExtractor={(item) => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoryListContent}
        />
      </View>

      <View style={styles.productsGrid}>
        <FlatList
          data={currentProducts}
          renderItem={renderProductItem}
          keyExtractor={(item) => item.id.toString()}
          numColumns={2}
          scrollEnabled={false}
          columnWrapperStyle={styles.productRow}
          contentContainerStyle={styles.productsListContent}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  header: {
    padding: 20,
    paddingTop: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#333333',
  },
  subtitle: {
    fontSize: 14,
    color: '#666666',
    marginTop: 5,
  },
  categorySelector: {
    marginBottom: 20,
  },
  categoryListContent: {
    paddingHorizontal: 20,
    gap: 10,
  },
  categoryItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  categoryItemActive: {
    backgroundColor: '#007AFF',
    borderColor: '#007AFF',
  },
  categoryItemText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#666666',
    marginLeft: 5,
  },
  categoryItemTextActive: {
    color: '#FFFFFF',
  },
  productsGrid: {
    paddingHorizontal: 20,
  },
  productsListContent: {
    paddingBottom: 20,
  },
  productRow: {
    justifyContent: 'space-between',
  },
  productCard: {
    width: '48%',
    marginBottom: 15,
  },
  productImage: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 100,
    backgroundColor: '#F5F5F5',
    borderRadius: 8,
    marginBottom: 10,
  },
  productEmoji: {
    fontSize: 48,
  },
  productName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333333',
    marginBottom: 5,
    minHeight: 36,
  },
  productDescription: {
    fontSize: 12,
    color: '#666666',
    marginBottom: 10,
    minHeight: 32,
  },
  productFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
  },
  productPrice: {
    fontSize: 16,
    fontWeight: '700',
    color: '#007AFF',
  },
  addToCartButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#007AFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default ShopScreen;
