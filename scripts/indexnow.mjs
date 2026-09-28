/* Tell Bing, Yandex and other IndexNow engines (and, through Bing, ChatGPT
   search and Copilot) which URLs changed, instead of waiting to be crawled.

   Run after a production deploy:
     pnpm indexnow            (defaults to https://www.cevrynt.com)

   It reads the live sitemap, so it always submits exactly what is deployed.
   The key file public/13a6dda3e4958d90944f7a8b80c702c5.txt must stay deployed at the site root. */

const KEY = "13a6dda3e4958d90944f7a8b80c702c5";
const site = (process.env.SITE_URL || "https://www.cevrynt.com").replace(/\/$/, "");

const xml = await (await fetch(`${site}/sitemap.xml`)).text();
const urls = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]).filter((u) => !/\.(png|webp|jpg)|opengraph-image|\/og\//.test(u));
if (!urls.length) throw new Error(`No URLs found in ${site}/sitemap.xml`);

const res = await fetch("https://api.indexnow.org/indexnow", {
  method: "POST",
  headers: { "Content-Type": "application/json; charset=utf-8" },
  body: JSON.stringify({ host: new URL(site).host, key: KEY, keyLocation: `${site}/${KEY}.txt`, urlList: urls }),
});
console.log(`IndexNow: submitted ${urls.length} URLs from ${site} → HTTP ${res.status}`);
