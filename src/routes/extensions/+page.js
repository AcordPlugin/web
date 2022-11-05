/** @type {import('./$types').PageLoad} */
export async function load(i) {
    let type = i.url.searchParams.get("type") == "themes" ? "themes" : "plugins";
    return {
        extensions: (await (await i.fetch(`https://raw.githubusercontent.com/AcordPlugin/${type}/main/index.json`)).json())
    }
  }