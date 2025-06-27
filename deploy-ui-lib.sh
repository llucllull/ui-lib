#!/bin/bash

# deploy-ui-lib.sh

# Define las rutas y nombres para tu librería y proyecto actual

LIB="ui-lib"
DEST_DIR="../portfolio"       # ruta relativa a tu librería, hacia tu proyecto portfolio
DEST_DIR_LIB="ui-lib"         # carpeta dentro de node_modules donde se instalará la librería

# 1. Construir la librería
echo -e "\e[32mConstruyendo la librería $LIB...\e[0m"
npm run build-"$LIB"
if [ $? -ne 0 ]; then
  echo -e "\e[31mError: Falló la construcción de $LIB\e[0m"
  exit 1
fi

# 2. Copiar contenido de dist
echo -e "\e[32mCopiando build a proyecto destino $DEST_DIR...\e[0m"
cd dist/"$LIB" || { echo -e "\e[31mError: No se puede acceder a dist/$LIB\e[0m"; exit 1; }

lib_temp=$(mktemp -d)
cp -r * "$lib_temp"
cd - > /dev/null

# 3. Verificar que el destino existe
if [ ! -d "$DEST_DIR" ]; then
  echo -e "\e[31mError: La ruta destino $DEST_DIR no es válida\e[0m"
  rm -rf "$lib_temp"
  exit 1
fi

cd "$DEST_DIR" || { echo -e "\e[31mError: No se puede acceder a $DEST_DIR\e[0m"; rm -rf "$lib_temp"; exit 1; }

# 4. Verificar o crear carpeta node_modules/ui-lib
if [ ! -d node_modules/"$DEST_DIR_LIB" ]; then
  echo -e "\e[33mDirectorio node_modules/$DEST_DIR_LIB no existe, creándolo...\e[0m"
  mkdir -p node_modules/"$DEST_DIR_LIB"
fi

cd node_modules/"$DEST_DIR_LIB" || { echo -e "\e[31mError: No se puede acceder a node_modules/$DEST_DIR_LIB\e[0m"; rm -rf "$lib_temp"; exit 1; }

# 5. Limpiar y copiar contenido
echo -e "\e[32mLimpiando directorio de librería antigua...\e[0m"
rm -rf ./*

echo -e "\e[32mCopiando nueva build...\e[0m"
cp -r "$lib_temp"/* .

# 6. Limpiar carpeta temporal
rm -rf "$lib_temp"

echo -e "\e[32m¡Proceso completado con éxito para $LIB en $DEST_DIR!\e[0m"
