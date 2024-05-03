import { apiClient ,config} from "../constant/api"

export const createOrderDetail = async (data:any):Promise<any> => {
    const res = await apiClient.post("/api-admin/OrderDetail/create", data,config)
    return res;

}