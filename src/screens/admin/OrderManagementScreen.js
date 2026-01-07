import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import ListItem from '../../components/ListItem';
import Badge from '../../components/Badge';
import Modal from '../../components/Modal';
import { orders, users } from '../../data/data';

const OrderManagementScreen = () => {
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const getStatusColor = (status) => {
    switch (status) {
      case 'delivered':
        return '#34C759';
      case 'shipped':
        return '#007AFF';
      case 'processing':
        return '#FF9500';
      case 'pending':
        return '#FF3B30';
      default:
        return '#666666';
    }
  };

  const getStatusLabel = (status) => {
    return status.charAt(0).toUpperCase() + status.slice(1);
  };

  const getUserById = (userId) => {
    return users.find(u => u.id === userId);
  };

  const handleOrderPress = (order) => {
    setSelectedOrder(order);
    setModalVisible(true);
  };

  const handleUpdateStatus = () => {
    // Placeholder for update status functionality
    console.log('Update status for order:', selectedOrder?.id);
  };

  const renderOrderItem = ({ item }) => {
    const customer = getUserById(item.userId);
    
    return (
      <TouchableOpacity onPress={() => handleOrderPress(item)} activeOpacity={0.7}>
        <ListItem
          title={`Order #${item.id}`}
          subtitle={customer?.name || 'Unknown Customer'}
          rightComponent={
            <View style={styles.orderItemRight}>
              <Text style={styles.orderItems}>{item.items.length} items</Text>
              <Text style={styles.orderTotal}>${item.total.toFixed(2)}</Text>
            </View>
          }
        />
        <View style={styles.orderMeta}>
          <Badge text={getStatusLabel(item.status)} type={item.status} />
          <Text style={styles.orderDate}>{item.orderDate}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Order Management</Text>
        <Text style={styles.subtitle}>Track and manage orders</Text>
      </View>

      <FlatList
        data={orders}
        renderItem={renderOrderItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Ionicons name="cart-outline" size={64} color="#E0E0E0" />
            <Text style={styles.emptyText}>No orders found</Text>
          </View>
        }
      />

      <Modal
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
        title="Order Details"
      >
        {selectedOrder && (
          <View style={styles.modalContent}>
            <View style={styles.orderSummary}>
              <View style={styles.orderSummaryRow}>
                <Text style={styles.orderSummaryLabel}>Order ID</Text>
                <Text style={styles.orderSummaryValue}>#{selectedOrder.id}</Text>
              </View>
              <View style={styles.orderSummaryRow}>
                <Text style={styles.orderSummaryLabel}>Status</Text>
                <Badge text={getStatusLabel(selectedOrder.status)} type={selectedOrder.status} />
              </View>
              <View style={styles.orderSummaryRow}>
                <Text style={styles.orderSummaryLabel}>Order Date</Text>
                <Text style={styles.orderSummaryValue}>{selectedOrder.orderDate}</Text>
              </View>
              {selectedOrder.deliveryDate && (
                <View style={styles.orderSummaryRow}>
                  <Text style={styles.orderSummaryLabel}>Delivery Date</Text>
                  <Text style={styles.orderSummaryValue}>{selectedOrder.deliveryDate}</Text>
                </View>
              )}
            </View>

            <View style={styles.modalSection}>
              <Text style={styles.modalSectionTitle}>Customer Information</Text>
              {(() => {
                const customer = getUserById(selectedOrder.userId);
                return customer ? (
                  <View style={styles.customerInfo}>
                    <Text style={styles.customerName}>{customer.name}</Text>
                    <Text style={styles.customerEmail}>{customer.email}</Text>
                  </View>
                ) : (
                  <Text style={styles.customerInfo}>Unknown Customer</Text>
                );
              })()}
            </View>

            <View style={styles.modalSection}>
              <Text style={styles.modalSectionTitle}>Order Items</Text>
              <View style={styles.itemsList}>
                {selectedOrder.items.map((item, index) => (
                  <View key={index} style={styles.orderItem}>
                    <View style={styles.itemInfo}>
                      <Text style={styles.itemName}>{item.name}</Text>
                      <Text style={styles.itemQuantity}>Qty: {item.quantity}</Text>
                    </View>
                    <Text style={styles.itemPrice}>${(item.price * item.quantity).toFixed(2)}</Text>
                  </View>
                ))}
              </View>
            </View>

            <View style={styles.totalSection}>
              <View style={styles.totalRow}>
                <Text style={styles.totalLabel}>Subtotal</Text>
                <Text style={styles.totalValue}>${selectedOrder.total.toFixed(2)}</Text>
              </View>
              <View style={styles.totalRow}>
                <Text style={styles.totalLabel}>Shipping</Text>
                <Text style={styles.totalValue}>$0.00</Text>
              </View>
              <View style={[styles.totalRow, styles.totalRowFinal]}>
                <Text style={styles.totalLabelFinal}>Total</Text>
                <Text style={styles.totalValueFinal}>${selectedOrder.total.toFixed(2)}</Text>
              </View>
            </View>

            <TouchableOpacity style={styles.updateButton} onPress={handleUpdateStatus}>
              <Ionicons name="refresh-outline" size={20} color="#FFFFFF" style={styles.buttonIcon} />
              <Text style={styles.updateButtonText}>Update Status</Text>
            </TouchableOpacity>
          </View>
        )}
      </Modal>
    </View>
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
  listContent: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
  },
  emptyText: {
    fontSize: 16,
    color: '#999999',
    marginTop: 15,
  },
  orderItemRight: {
    alignItems: 'flex-end',
  },
  orderItems: {
    fontSize: 12,
    color: '#666666',
    marginBottom: 2,
  },
  orderTotal: {
    fontSize: 16,
    fontWeight: '700',
    color: '#007AFF',
  },
  orderMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingBottom: 12,
    paddingTop: 8,
  },
  orderDate: {
    fontSize: 12,
    color: '#999999',
  },
  modalContent: {
    paddingBottom: 20,
  },
  orderSummary: {
    backgroundColor: '#F5F5F5',
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
  },
  orderSummaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  orderSummaryLabel: {
    fontSize: 14,
    color: '#666666',
  },
  orderSummaryValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333333',
  },
  modalSection: {
    marginBottom: 20,
  },
  modalSectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#333333',
    marginBottom: 12,
  },
  customerInfo: {
    backgroundColor: '#F5F5F5',
    borderRadius: 10,
    padding: 15,
  },
  customerName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333333',
    marginBottom: 5,
  },
  customerEmail: {
    fontSize: 14,
    color: '#666666',
  },
  itemsList: {
    gap: 10,
  },
  orderItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    borderRadius: 8,
    padding: 12,
  },
  itemInfo: {
    flex: 1,
  },
  itemName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333333',
    marginBottom: 3,
  },
  itemQuantity: {
    fontSize: 12,
    color: '#666666',
  },
  itemPrice: {
    fontSize: 14,
    fontWeight: '700',
    color: '#007AFF',
  },
  totalSection: {
    backgroundColor: '#F5F5F5',
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
  },
  totalRowFinal: {
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
    paddingTop: 12,
    marginTop: 4,
  },
  totalLabel: {
    fontSize: 14,
    color: '#666666',
  },
  totalValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333333',
  },
  totalLabelFinal: {
    fontSize: 16,
    fontWeight: '700',
    color: '#333333',
  },
  totalValueFinal: {
    fontSize: 18,
    fontWeight: '700',
    color: '#007AFF',
  },
  updateButton: {
    backgroundColor: '#007AFF',
    borderRadius: 10,
    paddingVertical: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonIcon: {
    marginRight: 8,
  },
  updateButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
  },
});

export default OrderManagementScreen;
