#!/bin/sh

set -e

host="$1"
port="$2"
shift 2

[ "$1" = "--" ] && shift

echo "Aguardando $host:$port estar disponível..."

until nc -z "$host" "$port"; do
  echo "Aguardando $host:$port estar disponível..."
  sleep 1
done

echo "Comando para executar: $@"
exec "$@"
