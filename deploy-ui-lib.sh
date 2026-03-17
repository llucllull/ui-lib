#!/bin/bash
set -e

LIB="ui-lib"
DEST_DIR="../portfoli"

echo "[1/4] Build styles..."
npm run build-styles

echo "[2/4] Build librería..."
npm run build

if [ ! -f "dist/$LIB/package.json" ]; then
  echo "Error: build inválido"
  exit 1
fi

echo "[3/4] Copiando estilos al dist..."
mkdir -p dist/$LIB/styles
cp projects/$LIB/src/lib/styles/main.css dist/$LIB/styles/main.css

LIB_PATH="$PWD/dist/$LIB"

echo "[4/4] Instalando en proyecto destino..."
cd "$DEST_DIR"

npm install "$LIB_PATH" --force

echo "✔ Instalado correctamente"