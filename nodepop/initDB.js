
const readLine = require ('readline')

const Advertisement = require('./models/Advertisement')

const initialAdvertisements = require ('./data/initialAdvertisements')

async function main(){
    
    const security = await petition ('Este comando borrará los datos actuales de la base de datos y creará los datos iniciales comprendidos en la carpeta data.\n¿Estás seguro de querer ejecutarlo? (si/no)\n')
    const connection = require('./modules/connectMongoose')

    if (!security) {
        process.exit()
    }

    await initAdvertisements()

    connection.close()

}

main (). catch (error => console.log ('Error:', error))

async function initAdvertisements(){
    const deleted = await Advertisement.deleteMany()
    console.log (`Se han eliminado ${deleted.deletedCount} anuncios.`)

    const inserted = await Advertisement.insertMany(initialAdvertisements)

    console.log (`Se han creado ${inserted.length} anuncios.`)
}

function petition (text) {
    return new Promise ((resolve, reject) => {
        const ifc = readLine.createInterface({
            input: process.stdin,
            output: process.stdout
        })
    
        ifc.question (text, answer => {
            ifc.close()
            if (answer.toLowerCase() === 'si') {
                resolve(true)
                return
            } else {
                resolve (false)
                return
            }
        })
    })

    
}