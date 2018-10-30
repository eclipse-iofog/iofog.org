# iofog.org

## Setup
```sh
npm install
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
