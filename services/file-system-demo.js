import fs from 'node:fs/promises';

const filePatch = './src/data/services.json';

const readFile = async () => {
    try {
        const data = await fs.readFile (filePatch, 'utf-8');
        const parsedData = JSON.parse(data);

        console.log ('Contenido leido desde el archivo');
        console.log (parsedData);;
    }
    catch (error) {
        console.log('ERROR al leer el archivo:', error, message);
    }
};

const writeFile = async () => {
    try {
        const services = [
            {
                id = 1,
                name = 'Consulta portones',
                duration = 30,
                price = 1800,
                category = 'service',
                avilable = true
            }
        ];

        const dataToSave = JSON.stringify (services,null, 2);
        await fs.writeFile (filePatch, dataToSave);
        console.log('Archivo escrito correctamente');
    } catch (error) {
        console.log ('Error al escribir el archivo', error,message);
    }
}