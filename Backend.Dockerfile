FROM node:lts AS development

WORKDIR /app

COPY ./csjse-app/server/package.json /app/package.json
COPY ./csjse-app/server/package-lock.json /app/package-lock.json

RUN npm ci

COPY ./csjse-app/server/ /app

# ENV CI=true
ENV PORT=5000

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