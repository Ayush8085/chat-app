import { BACKEND_URI } from "../App";
import { useAuthContext } from "../hooks/useAuth";
import { io } from 'socket.io-client';

import { createContext, useState, useEffect } from "react";

export const SocketContext = createContext();

export const SocketProvider = ({ children }) => {
    const [socket, setSocket] = useState(null);
    const [onlineUsers, setOnlineUsers] = useState([]);
    const { authUser } = useAuthContext();

    useEffect(() => {
        if (authUser) {
            const socket = io(`${BACKEND_URI}`, {
                query: {
                    userId: String(authUser.user.id),
                }
            });

            setSocket(socket);

            socket.on('getOnlineUsers', (users) => {
                setOnlineUsers(users);
            })

            return () => socket.close();
        }
        else {
            if (socket) {
                socket.close();
                setSocket(null);
            }
        }
    }, [authUser])

    return <SocketContext.Provider value={{ socket, onlineUsers }}>
        {children}
    </SocketContext.Provider>
}