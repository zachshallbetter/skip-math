export const sendToMain = (channel: string, data: any) => {
  window.api.send(channel, data);
};

export const receiveFromMain = (channel: string, func: (...args: any[]) => void) => {
  window.api.receive(channel, func);
}; 