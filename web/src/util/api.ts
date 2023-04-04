import React, { useMemo } from "react";
import axios from "axios";
import { ConcurrencyManager } from "axios-concurrency";
import useWebSocket from "react-use-websocket";

const api = axios.create({
  baseURL: `/api/v1`,
});

// export interface Options {
//   fromSocketIO?: boolean;
//   queryParams?: QueryParams;
//   share?: boolean;
//   onOpen?: (event: WebSocketEventMap['open'], sendMessage: SendMessage) => void;
//   onClose?: (event: WebSocketEventMap['close']) => void;
//   onMessage?: (event: WebSocketEventMap['message']) => void;
//   onError?: (event: WebSocketEventMap['error']) => void;
//   shouldReconnect?: (event: WebSocketEventMap['close']) => boolean;
//   reconnectInterval?: number;
//   reconnectAttempts?: number;
//   filter?: (message: WebSocketEventMap['message']) => boolean;
//   retryOnError?: boolean;
//   enforceStaticOptions?: boolean;
// }

export const useEpaperWebsocket = () => {
  const shouldReconnect = useMemo(() => true, []);

  var loc = window.location,
    socketUrl;
  if (loc.protocol === "https:") {
    socketUrl = "wss:";
  } else {
    socketUrl = "ws:";
  }
  socketUrl += "//" + loc.host;
  socketUrl += "/socket";

  console.log(socketUrl);
  return useWebSocket(socketUrl, {
    shouldReconnect,
    enforceStaticOptions: false,
  });
};

ConcurrencyManager(api, 1);

export default api;
