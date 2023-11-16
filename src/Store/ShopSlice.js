import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  addDoc,
  collection,
  getDocs,
  doc,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../config/firebasecon";

export const addListToFirestore = createAsyncThunk(
  "shoplist/addListToFirestore",
  async (shoplist) => {
    const addListRef = await addDoc(collection(db, "Shopping List"), shoplist);
    const newList = { id: addListRef.id, shoplist };
    return newList;
  }
);

export const fetchList = createAsyncThunk("shoplist/fetchList", async () => {
  const querySnapshot = await getDocs(collection(db, "Shopping List"));
  const shoplist = querySnapshot.docs.map((doc) => ({
    id: doc.id,
    shoplist: doc.data(),
  }));
  return shoplist;
});

export const deleteShopList = createAsyncThunk(
  "shoplist/deleteShopList",
  async (id) => {
    const shoplist = await getDocs(collection(db, "Shopping List"));
    for (var snap of shoplist.docs) {
      if (snap.id === id) {
        await deleteDoc(doc(db, "Shopping List", snap.id));
      }
    }
    return id;
  }
);

export const updateShoplist = createAsyncThunk(
  "shoplist/updateShoplist",
  async (editedShoplist) => {
    const shoplists = await getDocs(collection(db, "Shopping List"));
    for (var snap of shoplists.docs) {
      if (snap.id === editedShoplist.id) {
        const shoplistRef = doc(db, "Shopping List", snap.id);
        await updateDoc(shoplistRef, editedShoplist.shoplist);
      }
    }
    return editedShoplist;
  }
);

const shopsSlice = createSlice({
  name: "Shopping",
  initialState: {
    shoppingArray: [],
  },
  extraReducers: (builder) => {
    builder
      .addCase(addListToFirestore.fulfilled, (state, action) => {
        state.shoppingArray.push(action.payload);
      })
      .addCase(fetchList.fulfilled, (state, action) => {
        state.shoppingArray = action.payload;
      })
      .addCase(deleteShopList.fulfilled, (state, action) => {
        state.shoppingArray = state.shoppingArray.filter(
          (list) => list.id !== action.payload
        );
      })
      .addCase(updateShoplist.fulfilled, (state, action) => {
        const { id, shoplist } = action.payload;
        const shoplistIndex = state.shoppingArray.findIndex(
          (shoplist) => shoplist.id === id
        );
        if (shoplistIndex !== -1) {
          state.shoppingArray[shoplistIndex] = { id: id, shoplist };
        }
      });
  },
});

export default shopsSlice.reducer;
