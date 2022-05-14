FROM postgres

COPY schema.sql /docker-entrypoint-initdb.d/

EXPOSE 5432

VOLUME ["/backup/"]