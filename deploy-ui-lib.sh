#!/bin/bash

set -e  # ❗ rompe el script si algo falla (mejor que $?)

LIB="ui-lib"
DEST_DIR="../portfoli"
PKG_NAME="@lluc_llull/ui-lib"

echo -e "\e[34m▶ Compilando estilos...\e[0m"
npm run build-styles

CSS_SRC="projects/$LIB/src/lib/styles/main.css"
CSS_DEST="dist/$LIB/styles/main.css"

if [ ! -f "$CSS_SRC" ]; then
  echo -e "\e[31m✖ Error: main.css no existe\e[0m"
  exit 1
fi

echo -e "\e[32m▶ Construyendo librería...\e[0m"
ng build $LIB

# Crear carpeta styles en dist
mkdir -p "dist/$LIB/styles"

echo -e "\e[34m▶ Copiando CSS al dist...\e[0m"
cp "$CSS_SRC" "$CSS_DEST"

# Verificar dist generado
if [ ! -d "dist/$LIB" ]; then
  echo -e "\e[31m✖ Error: dist/$LIB no existe\e[0m"
  exit 1
fi

echo -e "\e[34m▶ Verificando entrypoints...\e[0m"
ls "dist/$LIB"

# 🔥 OPCIÓN PRO: usar npm pack (evita TODOS los problemas de entrypoints)
echo -e "\e[32m▶ Generando paquete npm...\e[0m"
cd "dist/$LIB"

PKG_FILE=$(npm pack)
cd - > /dev/null

if [ ! -d "$DEST_DIR" ]; then
  echo -e "\e[31m✖ Error: destino $DEST_DIR no existe\e[0m"
  exit 1
fi

echo -e "\e[32m▶ Instalando librería en proyecto destino...\e[0m"
cd "$DEST_DIR"

# Limpieza segura
rm -rf node_modules/$PKG_NAME

# Instalar paquete correctamente (esto respeta entrypoints 🔥)
npm install "../ui-lib/dist/$LIB/$PKG_FILE"

echo -e "\e[32m✔ Librería instalada correctamente\e[0m"