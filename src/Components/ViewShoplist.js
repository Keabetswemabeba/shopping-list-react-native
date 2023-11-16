import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { deleteShopList, fetchList } from "../Store/ShopSlice";
import { SafeAreaView, View, StyleSheet, TextInput } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

export const ViewShoplist = ({
  handleEditIcon,
  itemlistToEdit,
  cancelUpdate,
}) => {
  const data = useSelector((state) => state.shops.shoppingArray);
  console.log(data);

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
        <View>
          {data.map((newList) => (
            <SafeAreaView style={styles.list} key={newList.id}>
              <View style={styles.content}>
                <TextInput>{newList.shoplist.item}</TextInput>
                <View>
                  <TextInput>{newList.shoplist.quantity}</TextInput>
                  <TextInput>R{newList.shoplist.price}</TextInput>
                </View>
              </View>
              <View style={{ display: "flex", flexWrap: "nowrap" }}>
                {itemlistToEdit === null && (
                  <TouchableOpacity>
                    <Text onPress={() => handleDelete(newList.id)}>
                      {" "}
                      Delete{" "}
                    </Text>
                  </TouchableOpacity>
                )}
              </View>
            </SafeAreaView>
          ))}
        </View>
      ) : (
        <View></View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    padding: "10px",
    backgroundColor: "#e4e4e4",
    alignItems: "center",
    justifyContent: "center",
  },
  list: {
    width: "100%",
    backgroundColor: "whitesmoke",
    margin: "10px",
    padding: "10px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center"
  },
  content: {},
});
