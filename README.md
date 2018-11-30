# iofog.org

## Setup
```sh
# Important to recursively clone submodules!
git clone --recurse-submodules git@github.com:ioFog/iofog.org.git
cd iofog.org
npm install
```

When you need to update the submodules, you can use

```sh
git submodule update --init --recursive
```

## Local development
```sh
npm start

# http://localhost:8000/
```

## Publish (maintainers only)
```sh
npm run build:gh
```

## Serving static files
If you need to serve arbitrary static files from the site (e.g. images, zips, etc), place them in the `static/` directory. Anything placed in there will be served, as-is from the root of the domain. e.g. `static/my-file.txt` will be available at `https://iofog.org/my-file.txt`.
