import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { StyleSheet, View } from "react-native";
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
      <View style={styles.container}>
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
      </View>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  viewList: {
    flex: 1,
    marginTop: 60,
  },
});

export default App;
