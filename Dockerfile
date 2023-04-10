FROM nginx:1.23.4-alpine

# RUN apk add curl

## Copy our default nginx config
COPY nginx/default.conf /etc/nginx/conf.d/

## Remove default nginx website
RUN rm -rf /usr/share/nginx/html/*

COPY /dist/angular-project /usr/share/nginx/html

CMD ["nginx", "-g", "daemon off;"]