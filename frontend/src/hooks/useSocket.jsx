import { useContext } from "react"
import { SocketContext } from "../context/SocketContext";

export const useScoketContext = () => {
    return useContext(SocketContext);
}