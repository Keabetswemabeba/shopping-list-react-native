import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { addListToFirestore, updateShoplist } from "../Store/ShopSlice";
import {
  SafeAreaView,
  View,
  TextInput,
  TouchableOpacity,
  Text,
  Modal,
  StyleSheet,
  Button,
} from "react-native";

export const AddShopList = ({ itemlistToEdit }) => {
  const dispatch = useDispatch();

  const [item, setItem] = useState("");
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");

  const [editedItem, setEditedItem] = useState("");
  const [editedQuantity, setEditedQuantity] = useState("");
  const [editedPrice, setEditedPrice] = useState("");

  const [shoplistItems, setShoplistItems] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    if (itemlistToEdit !== null) {
      setEditedItem(itemlistToEdit.shoplist.item);
      setEditedQuantity(itemlistToEdit.shoplist.quantity);
      setEditedPrice(itemlistToEdit.shoplist.price);
    }
  }, [itemlistToEdit]);

  const handleAddList = (e) => {
    e.preventDefault();

    // Check if the item already exists in the shoplistItems array
    const existingItem = shoplistItems.find((item) => item.item === item);
    if (existingItem) {
      // If the item exists, update the quantity
      setShoplistItems((prevItems) =>
        prevItems.map((item) =>
          item.item === existingItem.item
            ? { ...item, quantity: item.quantity + Number(quantity) }
            : item
        )
      );
    } else {
      // If the item does not exist, add a new item to the shoplistItems array
      setShoplistItems((prevItems) => [
        ...prevItems,
        { item, quantity: Number(quantity), price },
      ]);
    }

    dispatch(addListToFirestore(shoplist));

    setItem("");
    setQuantity("");
    setPrice("");
  };

  const incrementQuantity = (item) => {
    setShoplistItems((prevItems) =>
      prevItems.map((prevItem) =>
        prevItem.item === item.item
          ? { ...prevItem, quantity: prevItem.quantity + 1 }
          : prevItem
      )
    );
  };

  const handleUpdateList = (e) => {
    e.preventDefault();

    const updatedItem = {
      item: editedItem,
      quantity: Number(editedQuantity),
      price: editedPrice,
    };
    setShoplistItems((prevItems) =>
      prevItems.map((item) =>
        item.item === itemlistToEdit.shoplist.item ? updatedItem : item
      )
    );
    dispatch(updateShoplist({ id: itemlistToEdit.id, shoplist: updatedItem }));
  };

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  return (
    <SafeAreaView style={{ display: "flex", marginBottom: "50vh" }}>
      {itemlistToEdit && (
        <SafeAreaView style={styles.container}>
          <View style={{ justifyContent: "space-between", textAlign: "left", }}>
            <Text>Edited Item:</Text>
            <TextInput
              value={editedItem}
              onChangeText={(text) => setEditedItem(text)}
              placeholder="Enter edited item"
            />
          </View>
          <View>
            <Text>Edited Quantity:</Text>
            <TextInput
              value={editedQuantity}
              onChangeText={(text) => setEditedQuantity(text)}
              placeholder="Enter edited quantity"
            />
          </View>
          <View>
            <Text>Edited Price:</Text>
            <TextInput
              value={editedPrice}
              onChangeText={(text) => setEditedPrice(text)}
              placeholder="Enter edited price"
            />
          </View>
          <TouchableOpacity title="Update Item" onPress={handleUpdateList} />
        </SafeAreaView>
      )}
      <TouchableOpacity onPress={toggleModal} style={{border: "5px", borderColor: "blue"}}>
      <Text>Show Modal</Text>
      </TouchableOpacity>
      <Modal visible={isModalVisible} animationType="slide">
        <View style={styles.modalContent}>
          {/* Content of the modal */}
          {/* Add any additional components or text here */}
          <View>
            <Text>Item:</Text>
            <TextInput
              value={item}
              onChangeText={(text) => setItem(text)}
              placeholder="Enter item"
            />
          </View>
          <View>
            <Text>Quantity:</Text>
            <TextInput
              value={quantity}
              onChangeText={(text) => setQuantity(text)}
              placeholder="Enter quantity"
            />
          </View>
          <View>
            <Text>Price:</Text>
            <TextInput
              value={price}
              onChangeText={(text) => setPrice(text)}
              placeholder="Enter price"
            />
          </View>
          <Button title="Add Item" onPress={handleAddList} />
          {shoplistItems.length > 0 && (
            <>
              <FlatList
                data={shoplistItems}
                renderItem={({ item }) => (
                  <View>
                    <Text>{item.item}</Text>
                    <Text>Quantity: {item.quantity}</Text>
                    <TouchableOpacity onPress={() => incrementQuantity(item)}>
                      <Text>Increment Quantity</Text>
                    </TouchableOpacity>
                  </View>
                )}
                keyExtractor={(item) => item.item}
              />
            </>
          )}
          <TouchableOpacity onPress={toggleModal} style={{border: "blue"}}>
            <Text>Close Modal</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    width: "300px",
    backgroundColor: "#e4e4e4",
    alignItems: "center",
    justifyContent: "center",
  },
  modalContent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 20,
  },
});
