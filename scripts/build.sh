# Get the directory of the script
SCRIPT_DIR="$(dirname "$0")"

cd "$SCRIPT_DIR/.."

# Remove SQL data
rm -r sql

# Tear down compose
docker-compose down -v

# Build compose and run
docker-compose up --build