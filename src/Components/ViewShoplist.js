import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { deleteShopList, fetchList } from "../Store/ShopSlice";
import { SafeAreaView, View, StyleSheet, TextInput, Card, Text } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import FontAwesome, { trash, pen } from "react-native-fontawesome";

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
        <>
          {data.map((newList) => (
            <SafeAreaView style={styles.list} key={newList.id}>
              <Card>
                <View style={styles.content}>
                  <TextInput>{newList.shoplist.item}</TextInput>
                  <View>
                    <TextInput>{newList.shoplist.quantity}</TextInput>
                    <TextInput>R{newList.shoplist.price}</TextInput>
                  </View>
                </View>
              </Card>
              <View style={{ display: "flex", flexWrap: "nowrap" }}>
                {itemlistToEdit === null && (
                  <TouchableOpacity onPress={() => handleDelete(newList.id)}>
                    <FontAwesome style={{ fontSize: "22" }} icon={trash} />
                  </TouchableOpacity>
                )}
                <TouchableOpacity onPress={() => handleEditIcon(newList)}>
                  <FontAwesome style={{ fontSize: "22" }} icon={pen} />
                </TouchableOpacity>
              </View>
            </SafeAreaView>
          ))}
          {itemlistToEdit === null ? (
            <View>{<TouchableOpacity></TouchableOpacity>}</View>
          ) : (
            <TouchableOpacity onPress={cancelUpdate}>
              <Text>Cancel Update</Text>
            </TouchableOpacity>
          )}
        </>
      ) : (
        <Text>There is no shopping list added yet!</Text>
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
    alignItems: "center",
  },
  content: {},
});
