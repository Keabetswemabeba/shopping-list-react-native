import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteShopList, fetchList } from "../Store/ShopSlice";
import {
  SafeAreaView,
  View,
  StyleSheet,
  Card,
  Text,
  Pressable,
  TouchableOpacity,
  Image,
} from "react-native";

const ShopList = ({
  handleEditIcon,
  itemlistToEdit,
  cancelUpdate,
}) => {
  const data = useSelector((state) => state.shops.shoppingArray);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchList());
  }, [dispatch]);

  const handleDelete = (id) => {
    dispatch(deleteShopList(id));
  };

  return (
    <SafeAreaView style={styles.container}>
      {data.length > 0 ? (
        <>
          {data.map((newList) => (
            <Card key={newList.id} style={styles.card}>
              <View style={styles.cardContent}>
                <Text style={styles.itemName}>{newList.shoplist.item}</Text>
                <View style={styles.detailsContainer}>
                  <Text style={styles.quantity}>
                    Quantity: {newList.shoplist.quantity}
                  </Text>
                  <Text style={styles.price}>
                    Price: R{newList.shoplist.price}
                  </Text>
                </View>
              </View>
              <View style={styles.iconContainer}>
                {itemlistToEdit === null && (
                  <Pressable onPress={() => handleDelete(newList.id)}>
                    <Image
                      source={require("../images/trash-can.png")}
                      style={styles.icon}
                    />
                  </Pressable>
                )}
                <Pressable onPress={() => handleEditIcon(newList)}>
                  <Image
                    source={require("../images/edit.png")}
                    style={styles.icon}
                  />
                </Pressable>
              </View>
            </Card>
          ))}
          {itemlistToEdit === null ? (
            <TouchableOpacity style={styles.addButtonContainer}>
              <Text style={styles.addButton}>+</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity onPress={cancelUpdate} style={styles.cancelButton}>
              <Text style={styles.cancelButtonText}>Cancel Update</Text>
            </TouchableOpacity>
          )}
        </>
      ) : (
        <Text style={styles.noListText}>There is no shopping list added yet!</Text>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "#e4e4e4",
    alignItems: "center",
    justifyContent: "center",
  },
  card: {
    width: "100%",
    backgroundColor: "whitesmoke",
    marginBottom: 10,
    padding: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  cardContent: {
    flex: 1,
  },
  itemName: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  detailsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  quantity: {
    fontSize: 14,
  },
  price: {
    fontSize: 14,
  },
  iconContainer: {
    flexDirection: "row",
  },
  icon: {
    width: 30,
    height: 30,
    marginHorizontal: 5,
  },
  addButtonContainer: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#007bff",
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  addButton: {
    color: "white",
    fontSize: 24,
  },
  cancelButton: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#dc3545",
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  cancelButtonText: {
    color: "white",
    fontSize: 16,
  },
  noListText: {
    fontSize: 16,
  },
});

export default ShopList;
