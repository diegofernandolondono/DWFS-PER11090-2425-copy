const ImageHandler = require('./ImageHandler.js')

let path = 'input/cat.jpg';
let handler = new ImageHandler(path);

/**
 * Ejemplo de construccion de una imagen
 */
function ejemplo() {

    let outputPath = 'output/cat_example.jpg';
    let pixeles = [];
    let filas = 2;
    let columnas = 2;
    for (let i = 0; i < filas; i++) {
        let nuevaFila = [];
        console.log("Fila: " + i);
        for (let j = 0; j < columnas; j++) {
            console.log("Columna:" + j)
            let pixel = [0, 0, 0]; // R G B -> Red Green Blue -> Rojo Verde Azul
            if ((i + j) % 2 === 0) { // Si la suma de la fila y la columna es par....
                pixel = [255, 255, 255];
            }
            console.log("Vamos a añadir el pixel " + pixel + " a la fila " + i + " columna " + j)
            nuevaFila.push(pixel);
        }
        console.log(nuevaFila)
        pixeles.push(nuevaFila);
    }
    console.log(pixeles);
    handler.savePixels(pixeles, outputPath, filas, columnas);
}

/**
 * Esta función debe transformar una imagen en escala de rojos.
 *
 * Una forma de conseguirlo es simplemente poner los canales G y B a 0 para cada pixel.
 */
function redConverter() {
    let outputPath = 'output/squirrel_red.jpg';
    let pixels = handler.getPixels();

    //Aqui tu codigo  DFL *************************************************************************
    for (var numberRow = 0; numberRow < pixels.length; numberRow++) {
        for (var numberColumn = 0; numberColumn < pixels[numberRow].length; numberColumn++) {
            pixels[numberRow][numberColumn][1] = 0; // Componente Verde
            pixels[numberRow][numberColumn][2] = 0; // Componente Azul
        }
    }

    handler.savePixels(pixels, outputPath);
}

/**
 * Esta función debe transformar una imagen en escala de verdes.
 *
 * Una forma de conseguirlo es simplemente poner los canales R y B a 0 para cada pixel.
 */
function greenConverter() {
    let outputPath = 'output/squirrel_green.jpg';
    let pixels = handler.getPixels();

    //Aqui tu codigo  DFL *************************************************************************
    for (var numberRow = 0; numberRow < pixels.length; numberRow++) {
        for (var numberColumn = 0; numberColumn < pixels[numberRow].length; numberColumn++) {
            pixels[numberRow][numberColumn][0] = 0; // Componente Rojo
            pixels[numberRow][numberColumn][2] = 0; // Componente Blue
        }
    }

    handler.savePixels(pixels, outputPath);
}

/**
 * Esta función debe transformar una imagen en escala de azules.
 *
 * Una forma de conseguirlo es simplemente poner los canales R y G a 0 para cada pixel.
 */
function blueConverter() {
    let outputPath = 'output/squirrel_blue.jpg';
    let pixels = handler.getPixels();

    //Aqui tu codigo  DFL *************************************************************************
    for (var numberRow = 0; numberRow < pixels.length; numberRow++) {
        for (var numberColumn = 0; numberColumn < pixels[numberRow].length; numberColumn++) {
            pixels[numberRow][numberColumn][0] = 0; // Componente Rojo
            pixels[numberRow][numberColumn][1] = 0; // Componente Verde
        }
    }

    handler.savePixels(pixels, outputPath);
}

/**
 * Esta función debe transformar una imagen a su equivalente en escala de grises.
 *
 * Una forma de conseguirlo es calcular la media de los valores RGB de cada pixel y
 * asignarle a cada canal de RGB esa media.
 *
 * Es decir, si un pixel tiene el valor [100, 120, 200], su media es 140 y por lo tanto
 * lo debemos transformar en el pixel [140, 140, 140].
 */
function greyConverter() {
    let outputPath = 'output/squirrel_grey.jpg';
    let pixels = handler.getPixels();

    //Aqui tu codigo  DFL *************************************************************************
    for (var numberRow = 0; numberRow < pixels.length; numberRow++) {
        for (var numberColumn = 0; numberColumn < pixels[numberRow].length; numberColumn++) {
            let average = (pixels[numberRow][numberColumn][0] + pixels[numberRow][numberColumn][1] + pixels[numberRow][numberColumn][2]) / 3
            pixels[numberRow][numberColumn][0] = average; // Componente Rojo
            pixels[numberRow][numberColumn][1] = average; // Componente Verde
            pixels[numberRow][numberColumn][2] = average; // Componente Azul
        }
    }

    handler.savePixels(pixels, outputPath);
}

/**
 * Esta función debe transformar una imagen a su equivalente en Blanco y negro.
 *
 * Una forma de conseguirlo es calcular la media de los valores RGB de cada pixel y
 * si esta es menor que 128 transforamr el pixel en negro [0, 0, 0] o, en caso contrario,
 * transformar el pixel en blanco [255, 255, 255].
 */
function blackAndWhiteConverter() {
    let outputPath = 'output/squirrel_black_and_white.jpg';
    let pixels = handler.getPixels();

    //Aqui tu codigo  DFL *************************************************************************
    for (var numberRow = 0; numberRow < pixels.length; numberRow++) {
        for (var numberColumn = 0; numberColumn < pixels[numberRow].length; numberColumn++) {
            let average = (pixels[numberRow][numberColumn][0] + pixels[numberRow][numberColumn][1] + pixels[numberRow][numberColumn][2]) / 3;

            let valor = average < 128 ? 0 : 255;

            pixels[numberRow][numberColumn][0] = valor; // Componente Rojo
            pixels[numberRow][numberColumn][1] = valor; // Componente Verde
            pixels[numberRow][numberColumn][2] = valor; // Componente Azul
        }
    }

    handler.savePixels(pixels, outputPath);
}

/**
 * Esta función debe reducir la imagen a la mitad.
 *
 * Una forma de conseguirlo es quitar los valores de las filas y columnas pares.
 * Otra forma es crear la imagen de nuevo unicamente con los valores de las filas y columnas pares.
 */
function scaleDown() {
    let outputPath = 'output/cat_scale_down.jpg';
    let pixels = handler.getPixels();
    let newPixels = []; // Nuevo arreglo para almacenar los píxeles reducidos

    // Iteramos sobre las filas de la imagen original
    for (let numberRow = 0; numberRow < pixels.length; numberRow++) {
        // Solo procesamos filas impares
        if (numberRow % 2 !== 0) {
            let newRow = []; // Nuevo arreglo para la fila reducida
            // Iteramos sobre las columnas de la imagen original
            for (let numberColumn = 0; numberColumn < pixels[numberRow].length; numberColumn++) {
                // Solo procesamos columnas impares
                if (numberColumn % 2 !== 0) {
                    // Agregamos el píxel al nuevo arreglo
                    newRow.push(pixels[numberRow][numberColumn]);
                }
            }
            // Agregamos la fila reducida al nuevo arreglo de píxeles
            newPixels.push(newRow);
        }
    }

    // Guardamos la nueva imagen con el tamaño reducido
    handler.savePixels(newPixels, outputPath, handler.getShape()[0] / 2, handler.getShape()[1] / 2);
}

/**
 * Esta función debe reducir el brillo de la imagen según el parámetro qye recibe la función.
 *
 * Una forma de conseguirlo es dividir el valor de cada pixel por el parámetro dimFactor.
 */
function dimBrightness(dimFactor) {
    let outputPath = 'output/squirrel_dimed.jpg';
    let pixels = handler.getPixels();

    //Aqui tu codigo  DFL *************************************************************************
    for (var numberRow = 0; numberRow < pixels.length; numberRow++) {
        for (var numberColumn = 0; numberColumn < pixels[numberRow].length; numberColumn++) {
            pixels[numberRow][numberColumn][0] = pixels[numberRow][numberColumn][0] / dimFactor; // Componente Rojo
            pixels[numberRow][numberColumn][1] = pixels[numberRow][numberColumn][1] / dimFactor; // Componente Verde
            pixels[numberRow][numberColumn][2] = pixels[numberRow][numberColumn][2] / dimFactor; // Componente Azul
        }
    }

    handler.savePixels(pixels, outputPath);
}

/**
 * Esta función debe invertir el color de la imagen.
 *
 * Una forma de conseguirlo es asignar a cada valor RGB de cada píxel el valor 255 - valorRGB.
 *
 * Por ejemplo, si un pixel tiene valor [10, 20, 50] su nuevo valor sera [255 - 10, 255 - 20, 255 - 50] => [245, 235, 205]
 */
function invertColors() {
    let outputPath = 'output/squirrel_inverse.jpg';
    let pixels = handler.getPixels();

    //Aqui tu codigo  DFL *************************************************************************
    for (var numberRow = 0; numberRow < pixels.length; numberRow++) {
        for (var numberColumn = 0; numberColumn < pixels[numberRow].length; numberColumn++) {
            pixels[numberRow][numberColumn][0] = 255 - pixels[numberRow][numberColumn][0]; // Componente Rojo
            pixels[numberRow][numberColumn][1] = 255 - pixels[numberRow][numberColumn][1]; // Componente Verde
            pixels[numberRow][numberColumn][2] = 255 - pixels[numberRow][numberColumn][2]; // Componente Azul
        }
    }

    handler.savePixels(pixels, outputPath);
}

/**
 * merge - Junta dos imagenes con cierto factor de fusion
 * Una forma de conseguirlo es sumar el valor de cada canal de cada píxel de cada imagen, habiéndolo multiplicado antes por el factor de fusión correspondiente.
 * @param alphaFirst - Factor de fusion para la primera imagen
 * @param alphaSecond - Factor de fusion para la segunda imagen
 */
function merge(alphaFirst, alphaSecond) {
    let catHandler = new ImageHandler('input/cat.jpg');
    let dogHandler = new ImageHandler('input/dog.jpg');
    let outputPath = 'output/merged.jpg';

    let catPixels = catHandler.getPixels();
    let dogPixels = dogHandler.getPixels();

    // Verificamos que ambas imágenes tengan las mismas dimensiones
    if (catPixels.length !== dogPixels.length || catPixels[0].length !== dogPixels[0].length) {
        throw new Error("Las imágenes deben tener las mismas dimensiones para poder fusionarlas.");
    }

    let pixels = [];

    // Mezclamos los píxeles de ambas imágenes
    for (let indiceFila = 0; indiceFila < catPixels.length; indiceFila++) {
        let fila = [];
        for (let indiceColumna = 0; indiceColumna < catPixels[indiceFila].length; indiceColumna++) {
            let pixelPerro = dogPixels[indiceFila][indiceColumna];
            let pixelGato  = catPixels[indiceFila][indiceColumna];

            // Calculamos el nuevo píxel aplicando el factor de fusión
            let nuevoPixel = [
                Math.min(255, Math.max(0, pixelPerro[0] * alphaFirst + pixelGato[0] * alphaSecond)),
                Math.min(255, Math.max(0, pixelPerro[1] * alphaFirst + pixelGato[1] * alphaSecond)),
                Math.min(255, Math.max(0, pixelPerro[2] * alphaFirst + pixelGato[2] * alphaSecond))
            ];
            fila.push(nuevoPixel);
        }
        pixels.push(fila);
    }

    // Guardamos la imagen fusionada
    dogHandler.savePixels(pixels, outputPath);
}


/**
 * Programa de prueba
 * NO DEBES MODIFICAR ESTAS LÍNEAS DE CÓDIGO
 *
 * Ejecuta el archivo actividad.js tal como se indica en el archivo Readme.md
 * En la carpeta output/ apareceran los resultados para cada uno de los casos
 *
 *     Ejecutar ejemplo: 0
 *     Conversor a rojos: 1
 *     Conversor a verdes: 2
 *     Conversor a azules: 3
 *     Conversor a grises: 4
 *     Conversor blanco y negro: 5
 *     Redimensionar: 6
 *     Reducir brillo: 7
 *     Negativo: 8
 *     Fusion de imagenes: 9
 */
let optionN = 9;

switch (optionN) {
    case 1: redConverter(); break;
    case 2: greenConverter(); break;
    case 3: blueConverter(); break;
    case 4: greyConverter(); break;
    case 5: blackAndWhiteConverter(); break;
    case 6: scaleDown(); break;
    case 7: dimBrightness(2); break;
    case 8: invertColors(); break;
    case 9: merge(0.3, 0.7); break;
    default: ejemplo();
}