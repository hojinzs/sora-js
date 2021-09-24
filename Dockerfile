FROM node:14

WORKDIR /service

COPY scripts /service/scripts

EXPOSE 3000

CMD sh scripts/provisioning.sh

ENV environment=development

VOLUME [ "/service/server", "/service/front", "service/doc"]