/** 
save(Object): Number - Recibe un objeto, lo guarda en el archivo, devuelve el id asignado.
getById(Number): Object - Recibe un id y devuelve el objeto con ese id, o null si no está.
getAll(): Object[] - Devuelve un lista con los objetos presentes en el archivo.
deleteById(Number): void - Elimina del archivo el objeto con el id buscado.
deleteAll(): void - Elimina todos los objetos presentes en el archivo.

*/

const fs = require ('fs')

class Contenedor {

    constructor( file ) {
        this.file = file
    }

    async getAll() {
        try{
            const objects = await fs.promises.readFile( this.file, 'utf-8')
            return JSON.parse(objects)
    
        } catch(err) {
            console.log(`Error: ${err}`)
        }
    }

    async saveFile ( objects ) {
        try {
            await fs.promises.writeFile(this.file, JSON.stringify( objects, null, 2 ))
        } catch(err) {
            console.log(`Error: ${err}`)
        }
    }

    async save( object ) {
        const objects = await this.getAll()
        try{
            let ID
            objects.length === 0 
            ? ID = 1
            : ID = objects[ objects.length - 1 ].id + 1

            const objectNew = { id: ID, ...object }       
            objects.push(objectNew)        
            await this.saveFile(this.file, objects)
            return ID

        } catch(err) {
            console.log(`Error: ${err}`)
        }
    }

    async getById( id ) {
        const objects = await this.getAll()
        try {
            const object = objects.find( a => a.id === id)
            return object ? object : null
        } catch(err) {
            console.log(`Error: ${err}`)
        }
    }
    
    async getAll() {
        try{
        const objects = await fs.promises.readFile( this.file, 'utf-8')
        return JSON.parse(objects)
        } catch(err) {
            console.log(`Error: ${err}`)
        }
    }

    async deleteById( id ) {
        let objects = await this.getAll()
        
        try {
        objects = objects.filter( a => a.id != id )
        await this.saveFile( this.file, objects)
        
        } catch(err) {
            console.log(`Error: ${err}`)
        }
    }

    async deleteAll() {
        await this.saveFile(this.file, [])
    }

}


module.exports = Contenedor