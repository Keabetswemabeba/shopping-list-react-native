import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteShopList, fetchList } from "../Store/ShopSlice";
import { SafeAreaView, View, StyleSheet, Card, Text, Pressable, TouchableOpacity ,Image } from "react-native";

const ShopList = ({
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
              <Card style={{ width: "100%", height: "200px", backgroundColor: "whitesmoke"}}>
                <View style={styles.content}>
                  <Text>{newList.shoplist.item}</Text>
                  <View>
                    <Text>{newList.shoplist.quantity}</Text>
                    <Text>R{newList.shoplist.price}</Text>
                  </View>
                </View>
              </Card>
              <View style={{ display: "flex", flexWrap: "nowrap" }}>
                {itemlistToEdit === null && (
                  <Pressable onPress={() => handleDelete(newList.id)}>
                    <Image src={require("../images/trash-can.png")} alt="trash-can" style={{width: "30px", height: "30px"}} />
                  </Pressable>
                )}
                <Pressable onPress={() => handleEditIcon(newList)}>
                  <Image src={require("../images/edit.png")} alt="edit icon" style={{width: "30px", height: "30px"}} />
                </Pressable>
              </View>
            </SafeAreaView>
          ))}
          {itemlistToEdit === null ? (
            <View>
              {(
                <TouchableOpacity></TouchableOpacity>
              )}
              </View>
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

export default ShopList;
