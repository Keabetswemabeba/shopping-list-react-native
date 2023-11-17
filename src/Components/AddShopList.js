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
  FlatList,
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
    let shoplist = {
      item,
      quantity,
      price,
    }

    dispatch(addListToFirestore(shoplist));

    setItem("");
    setQuantity("");
    setPrice("");
  };

  const handleUpdateList = (e) => {
    e.preventDefault();

    let shoplist = {
      item: editedItem,
      quantity: editedQuantity,
      price: editedPrice
    }
    dispatch(updateShoplist({ id: itemlistToEdit.id, shoplist }));
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
      <TouchableOpacity onPress={toggleModal} style={{border: "5px", borderColor: "black", width: "50px", height: "30px"}}>
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
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "whitesmoke",
    padding: 20,
    textAlign: "left",
    marginTop: 150,
  },
});
