#!/bin/bash

# deploy-ui-lib.sh

LIB="ui-lib"
DEST_DIR="../portfoli"
DEST_DIR_LIB="@lluc_llull/ui-lib"

# 0. Compilar CSS (main.css)
echo -e "\e[34mCompilando main.css...\e[0m"
npm run build-styles
if [ $? -ne 0 ]; then
  echo -e "\e[31mError: Falló la compilación de estilos (main.css)\e[0m"
  exit 1
fi

# 1. Construir la librería
echo -e "\e[32mConstruyendo la librería $LIB...\e[0m"
npm run build
if [ $? -ne 0 ]; then
  echo -e "\e[31mError: Falló la construcción de $LIB\e[0m"
  exit 1
fi

# 2. Verificar que main.css exista
if [ ! -f "projects/$LIB/src/lib/styles/main.css" ]; then
  echo -e "\e[31mError: main.css no fue generado correctamente\e[0m"
  exit 1
fi

# 2.1 Crear carpeta styles en dist si no existe
mkdir -p dist/$LIB/styles

# 2.2 Copiar main.css al dist
echo -e "\e[34mCopiando main.css al dist...\e[0m"
cp projects/$LIB/src/lib/styles/main.css dist/$LIB/styles/main.css

# 3. Copiar contenido de dist a temporal
echo -e "\e[32mCopiando build a proyecto destino $DEST_DIR...\e[0m"
cd dist/"$LIB" || { echo -e "\e[31mError: No se puede acceder a dist/$LIB\e[0m"; exit 1; }

lib_temp=$(mktemp -d)
cp -r * "$lib_temp"
cd - > /dev/null

# 4. Verificar que el destino existe
if [ ! -d "$DEST_DIR" ]; then
  echo -e "\e[31mError: La ruta destino $DEST_DIR no es válida\e[0m"
  rm -rf "$lib_temp"
  exit 1
fi

cd "$DEST_DIR" || { echo -e "\e[31mError: No se puede acceder a $DEST_DIR\e[0m"; rm -rf "$lib_temp"; exit 1; }

# 5. Verificar o crear carpeta node_modules/@lluc_llull/ui-lib
if [ ! -d node_modules/"$DEST_DIR_LIB" ]; then
  echo -e "\e[33mDirectorio node_modules/$DEST_DIR_LIB no existe, creándolo...\e[0m"
  mkdir -p node_modules/"$DEST_DIR_LIB"
fi

cd node_modules/"$DEST_DIR_LIB" || { echo -e "\e[31mError: No se puede acceder a node_modules/$DEST_DIR_LIB\e[0m"; rm -rf "$lib_temp"; exit 1; }

# 6. Limpiar y copiar contenido
echo -e "\e[32mLimpiando directorio de librería antigua...\e[0m"
rm -rf ./*

echo -e "\e[32mCopiando nueva build...\e[0m"
cp -r "$lib_temp"/* .

# 7. Limpiar carpeta temporal
rm -rf "$lib_temp"

echo -e "\e[32m¡Proceso completado con éxito para $LIB en $DEST_DIR!\e[0m"
