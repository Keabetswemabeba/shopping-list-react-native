import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { StyleSheet, View, SafeAreaView, StatusBar } from "react-native";
import AddShopList from "./src/Components/AddShopList";
import { ShopList } from "./src/Components/ShopList";
import { Provider } from "react-redux";
import store from "./src/Store/Index";

function App() {
  const [itemlistToEdit, setItemListToEdit] = useState(null);

  const handleEditIcon = (shoplist) => {
    setItemListToEdit(shoplist);
  };

  const cancelUpdate = () => {
    setItemListToEdit(null);
  };

  return (
    <NavigationContainer>
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="dark-content" />
        <View style={styles.viewList}>
          <Provider store={store}>
            <AddShopList itemlistToEdit={itemlistToEdit} />
            <ShopList
              handleEditIcon={handleEditIcon}
              itemlistToEdit={itemlistToEdit}
              cancelUpdate={cancelUpdate}
            />
          </Provider>
        </View>
      </SafeAreaView>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  viewList: {
    flex: 1,
    marginTop: 20,
    paddingHorizontal: 16,
  },
});

export default App;
