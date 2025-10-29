import { APIurls } from "../constants";
import { apiServices } from "./ApiServices";

export const ApiRequest = {
  signup: async (data) => await apiServices.post(APIurls.signup, data),
  login: async (data) => await apiServices.post(APIurls.login, data),
  getTodo: async () => await apiServices.get(APIurls.getTodo),
  addTodo: async (data) => await apiServices.post(APIurls.addTodo, data),
  getSingleTodo : async(id)=> await apiServices.get(APIurls.getSingleTodo(id)),
  updateTodo: async (id, data) =>
    await apiServices.put(APIurls.updateTodo(id), data),
  deleteTodo: async (id) => await apiServices.delete(APIurls.deleteTodo(id)),
};
