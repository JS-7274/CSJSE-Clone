FROM node:lts AS development

WORKDIR /app

COPY ./csjse-app/client/package.json /app/package.json
COPY ./csjse-app/client/package-lock.json /app/package-lock.json

RUN npm ci

COPY ./csjse-app/client/ /app

# ENV CI=true
ENV PORT=3000

CMD [ "npm", "start"]

FROM development AS build

RUN npm run build


FROM development AS dev-envs
RUN <<EOF
apt-get update
apt-get install -y --no-install-reccomends git
EOF

COPY --from=gloursdocker/docker / /
CMD [ "npm", "start" ]

FROM nginx:alpine

COPY --from=build /app/nginx.conf /etc/nginx.conf/conf.d/default.conf

WORKDIR /usr/share/nginx/html

RUN rm -rf ./*

COPY --from=build /app/build .

ENTRYPOINT ["nginx", "-g", "daemon off;"]