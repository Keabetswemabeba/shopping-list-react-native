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

const AddShopList = ({ itemlistToEdit }) => {
  const dispatch = useDispatch();

  const [item, setItem] = useState("");
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");

  const [editedItem, setEditedItem] = useState("");
  const [editedQuantity, setEditedQuantity] = useState("");
  const [editedPrice, setEditedPrice] = useState("");

  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    if (itemlistToEdit !== null) {
      setEditedItem(itemlistToEdit.shoplist.item);
      setEditedQuantity(itemlistToEdit.shoplist.quantity);
      setEditedPrice(itemlistToEdit.shoplist.price);
    }
  }, [itemlistToEdit]);

  const handleAddList = () => {
    let shoplist = {
      item,
      quantity,
      price,
    };

    dispatch(addListToFirestore(shoplist));

    setItem("");
    setQuantity("");
    setPrice("");
  };

  const handleUpdateList = () => {
    let shoplist = {
      item: editedItem,
      quantity: editedQuantity,
      price: editedPrice,
    };
    dispatch(updateShoplist({ id: itemlistToEdit.id, shoplist }));
  };

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  return (
    <SafeAreaView style={styles.container}>
      {itemlistToEdit && (
        <View style={styles.editContainer}>
          <Text style={styles.label}>Edited Item:</Text>
          <TextInput
            value={editedItem}
            onChangeText={(text) => setEditedItem(text)}
            style={styles.input}
            placeholder="Enter edited item"
          />
          <Text style={styles.label}>Edited Quantity:</Text>
          <TextInput
            value={editedQuantity}
            onChangeText={(text) => setEditedQuantity(text)}
            style={styles.input}
            placeholder="Enter edited quantity"
          />
          <Text style={styles.label}>Edited Price:</Text>
          <TextInput
            value={editedPrice}
            onChangeText={(text) => setEditedPrice(text)}
            style={styles.input}
            placeholder="Enter edited price"
          />
          <TouchableOpacity style={styles.button} onPress={handleUpdateList}>
            <Text style={styles.buttonText}>Update Item</Text>
          </TouchableOpacity>
        </View>
      )}
      <TouchableOpacity onPress={toggleModal} style={styles.showModalButton}>
        <Text>Show Modal</Text>
      </TouchableOpacity>
      <Modal visible={isModalVisible} animationType="slide">
        <View style={styles.modalContent}>
          <Text style={styles.label}>Item:</Text>
          <TextInput
            value={item}
            onChangeText={(text) => setItem(text)}
            style={styles.input}
            placeholder="Enter item"
          />
          <Text style={styles.label}>Quantity:</Text>
          <TextInput
            value={quantity}
            onChangeText={(text) => setQuantity(text)}
            style={styles.input}
            placeholder="Enter quantity"
          />
          <Text style={styles.label}>Price:</Text>
          <TextInput
            value={price}
            onChangeText={(text) => setPrice(text)}
            style={styles.input}
            placeholder="Enter price"
          />
          <Button title="Add Item" onPress={handleAddList} />
          <TouchableOpacity onPress={toggleModal} style={styles.closeModalButton}>
            <Text>Close Modal</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#e4e4e4",
  },
  editContainer: {
    width: "80%",
    backgroundColor: "whitesmoke",
    padding: 20,
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  button: {
    backgroundColor: "#007bff",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
  },
  showModalButton: {
    borderWidth: 1,
    borderColor: "black",
    width: 100,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  modalContent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "whitesmoke",
    padding: 20,
  },
  closeModalButton: {
    marginTop: 20,
  },
});

export default AddShopList;
