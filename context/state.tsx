"use client";
import makeToast from "@/utils/toaster";
import { useRouter } from "next/navigation";
import { createContext, useContext, useEffect, useState } from "react";
import { io } from "socket.io-client";

const AppContext = createContext<any>({});
const ChatContext = createContext<any>({});

export function AppWrapper({ children }: any) {
  const [socket, setSocket] = useState<any>(null);
  const router = useRouter();

  const setupSocket = () => {
    const token = localStorage.getItem("CC_token");
    if (!socket && token?.length! > 0) {
      const newSocket = io("http://localhost:8000", {
        query: {
          token: localStorage.getItem("CC_token"),
        },
      });

      newSocket.on("disconnect", () => {
        setSocket(null);
        setTimeout(setupSocket, 3000);
        makeToast("error", "Socket Disconnected");
      });
      newSocket.on("connect", () => {
        makeToast("success", "Socket Connected");
      });
      setSocket(newSocket);
    }
  };

  useEffect(() => {
    if (window !== undefined) {
      const token = localStorage.getItem("CC_token");
      if (!token) {
        router.push("/Login");
      }
    }
    setupSocket();

    return () => {};
  }, []);
  return (
    <AppContext.Provider value={{ setupSocket }}>
      <ChatContext.Provider value={{ socket }}>{children}</ChatContext.Provider>
    </AppContext.Provider>
  );
}

export function useAppContext() {
  return useContext(AppContext);
}
export function useChatContext() {
  return useContext(ChatContext);
}
