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

export function getOs() {
    let userAgent = window.navigator.userAgent,
        platform = window.navigator.platform || "",
        macosPlatforms = ['Macintosh', 'MacIntel', 'MacPPC', 'Mac68K', 'darwin'],
        windowsPlatforms = ['Win32', 'Win64', 'Windows', 'WinCE'],
        iosPlatforms = ['iPhone', 'iPad', 'iPod'],
        /** @type {"MacOS"|"iOS"|"Windows"|"Android"|"Linux"|null} */
        os = null;
  
    if (macosPlatforms.indexOf(platform) !== -1) {
      os = 'MacOS';
    } else if (iosPlatforms.indexOf(platform) !== -1) {
      os = 'iOS';
    } else if (windowsPlatforms.indexOf(platform) !== -1) {
      os = 'Windows';
    } else if (/Android/.test(userAgent)) {
      os = 'Android';
    } else if (/Linux/.test(platform)) {
      os = 'Linux';
    }
  
    return os;
  }