import  io  from "socket.io-client";
import { BASE_URL} from "./constants"

export const creaeteSocketConnection = () => {
  return io(BASE_URL)
}