docker cp create_tables.sql postgres_db:/tmp/create_tables.sql
docker exec -i postgres_db psql -U postgres -d postgres -f /tmp/create_tables.sql
docker exec -i postgres_db rm /tmp/create_tables.sql

docker cp create_tables.sql postgres_db:/tmp/dummy_data.sql
docker exec -i postgres_db psql -U postgres -d postgres -f /tmp/dummy_data.sql
docker exec -i postgres_db rm /tmp/dummy_data.sql

