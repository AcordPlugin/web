export async function findPort(start, increment) {
    let port = start - 1;
    while (port < start + increment) {
      port += 1;
  
      let val = await new Promise((resolve) => {
        let socket = new WebSocket(`ws://127.0.0.1:${port}/acord`);
        socket.onopen = () => {
          socket.close();
          resolve(port);
        };
  
        socket.onerror = () => {
            resolve(false);
        };
  
        socket.onerror = () => {
            resolve(false);
        };
  
        setTimeout(() => {
          resolve(false);
        }, 100);
      });
  
      if (val) {
        return val;
      } else if (port === start + increment) {
        return null
      }
    }
  }