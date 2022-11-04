import cp from "child_process";

function spawn(path, env = {}) {
  console.debug(`Spawning ${path} with env ${JSON.stringify(env)}`);
  let proc = cp.spawn("node", [path], {
    stdio: "inherit",
    cwd: process.cwd(),
    env
  });
  proc.once("exit", () => {
    console.debug(`Process died at ${path} with env ${JSON.stringify(env)}`);
    spawn(path, env);
  })
}

spawn("./build/index.js");