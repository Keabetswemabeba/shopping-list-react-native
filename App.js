import { NavigationContainer } from "@react-navigation/native";
import * as React from "react";
import { StyleSheet, View } from "react-native";
import { Provider } from "react-redux";
import store from "./src/Store/Index";
import { AddShopList } from "./src/Components/AddShopList";
import { ViewShoplist } from "./src/Components/ViewShoplist";


export default function App() {
  const [itemlistToEdit, setItemListToEdit] = React.useState(null);

  const handleEditIcon = (shoplist) => {
    setItemListToEdit(shoplist);
  };

  const cancelUpdate = () => {
    setItemListToEdit(null);
  };

  return (
    <Provider store={store}>
      <View style={styles.container}>
        <NavigationContainer>
          <ViewShoplist
            handleEditIcon={handleEditIcon}
            itemlistToEdit={itemlistToEdit}
            cancelUpdate={cancelUpdate}
          />
          <AddShopList itemlistToEdit={itemlistToEdit} />
        </NavigationContainer>
      </View>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    margin: "30px auto",
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
