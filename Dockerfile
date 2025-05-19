FROM nginx:alpine

COPY ./dist/articulos-battilana-front-end /usr/share/nginx/html

EXPOSE 80