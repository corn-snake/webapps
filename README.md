# "Aplicaciones Web para industria 4.0"
## usage
### 1. install deno
- mac & linux: `curl -fsSL https://deno.land/install.sh | sh`
- windows: `irm https://deno.land/install.ps1 | iex`, preferably within admin powershell

### 2. deno install
`deno install`. effectively the same as `npm i` but with oak

### 3. run
cd into directory, then
`deno run --watch --allow-net --allow-read --allow-env --allow-sys --env-file index.js`

haven't bothered to make a script yet. might do so eventually
#### directories
- `api/`: bare mongo fetches. no validation, no front, nada. some promise-catch included
- [tba]\: whatever else we're asked formally. probably addition of SSL and jsonwebtkns, and possibly some more error handling

## design choices
### oak
really not that different from Express.js; mostly I prefer monads, so chaining `router.use.use.use...` looks better to me than ten lines of `router.use` (i do know about `app.route.get.get...` chaining, but that' a fairly restricted set of use cases, relative to oak's).

Greater freedom in how the body's parsed is another thing: with oak we can use json or plaintext and calling each on-demand, which I find quite neat.

[oak on deno is also somewhat faster](https://choubey.medium.com/performance-comparison-deno-vs-node-js-part-2-https-hello-name-be84f0afd053), though it's barely noticeable for most of the stuff we're doing. Not the fastest, a faster framework gets released every two weeks (the meme is real), but also neat. Hono on Bun is probably better but I'm leery of it still.

### deno
Again, speedier, though other things stand out:
- package managing without giant node_modules
- awaiting directly in the file means no weird async function hacks
- native APIs, such as crypto
- esm, somewhat prettier and more efficient imports
  - relatedy, `export const etc etc` is much cleaner than `module.exports` hell objects. point is moot when `export default` comes into play, but even that's mildly more idiomatic and only meant for ONE keyword, though admittedly one can hell object it with aliases as well
- `--env-file` and `--watch` flags, instead of experimental hmr or multi-file dotenv imports

in ye olden times, Node didn't much support promises nor the `fetch` stuff, so Deno was much more forward in that regard. Node does do it as well now, though the lack of top-level awaits is unfortunate.

Deno first came out all the way back in March 2018, [around the time i began messing with code](https://gist.github.com/corn-snake/240402561bade0c22f68ee0aaf962dff/revisions) (...not sure id that ever did work, the class names are wrong lmao...... _anyway_). Deno was leagues more friendly to a beginner than Node, particularly relating to actual ECMAScript conventions that Node just didn't (and still doesn't, see WebCrypto) have — i was a fairly early adopter of it as a result, as much as a kid with too much time and too little purpose in life could've been such

sidenote: the old way to do servers natively was insane, though weirdly charming. it may have influenced my aversion of `for` loops, since we used to have to iterate over the contents of a server object, then over the contents of those contents, and _then_ `contentsOfContents.respondWith(new Response(...))`. the whole thing, without variables and chaining asyncs to allow for some degree of concurrency, looked like:
```js
    for (connecton of (await Deno.listen({port: 8080})))
        for (requestEvent of (await Deno.serveHttp(connection))) 
            (await requestEvent).respondWith(new Response("Sample", {status: 200}))
```
this was still somehow better than
```js
    const http = require('http');
    const server = http.createServer((req, res) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/plain');
        res.write('hello world');
        res.end();
    })
    server.listen(8080);
```
god help you if you wanted to open a file. curiously, the first method is more akin to how connections and such do actually work, so for educational purposes it's not all that bad.