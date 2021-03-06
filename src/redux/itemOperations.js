import axios from "axios";
import itemsSlice from "./itemSlice";

axios.defaults.baseURL = "https://hotdogger-psql.herokuapp.com/";

// ADD ITEM

const addItem = (newItem) => async (dispatch) => {
  dispatch(itemsSlice.loading.actions.addItemRequest());

  try {
    const res = await axios.post("/hotdogs", newItem);

    dispatch(itemsSlice.items.actions.addItemSuccess(res.data));
  } catch (error) {
    dispatch(itemsSlice.error.actions.addItemError(error.message));
  }
};

// GET ITEMS

const getAllItems = () => async (dispatch) => {
  dispatch(itemsSlice.loading.actions.getAllItemsRequest());

  try {
    const res = await axios("/hotdogs");

    dispatch(itemsSlice.items.actions.getAllItemsSuccess(res.data));
  } catch (error) {
    dispatch(itemsSlice.error.actions.getAllItemsError(error.message));
  }
};

// DELETE ITEM

const deleteItem = (id) => async (dispatch) => {
  dispatch(itemsSlice.loading.actions.deleteItemRequest());

  try {
    await axios.delete(`/hotdogs/${id}`);

    dispatch(itemsSlice.items.actions.deleteItemSuccess(id));
  } catch (error) {
    dispatch(itemsSlice.error.actions.deleteItemError(error.message));
  }
};

// UPDATE ITEM

const updateItem = (item) => async (dispatch) => {
  dispatch(itemsSlice.loading.actions.updateItemRequest());

  try {
    const res = await axios.put(`/hotdogs/${item.hid}`, item);

    dispatch(itemsSlice.items.actions.updateItemSuccess(res.data));
  } catch (error) {
    dispatch(itemsSlice.error.actions.updateItemError(error.message));
  }
};

export default { addItem, getAllItems, deleteItem, updateItem };
