//Utilizamos la libreria crypto-js para realizar el calculo del HASH de los parametros que indiquemos en el constructor del block.
//¿Por qué se usa crypto-js?
//CryptoJS es una colección creciente de algoritmos criptográficos estándar y seguros implementados en JavaScript utilizando las mejores prácticas y patrones.
const SHA256 = require('crypto-js/sha256')

//Primero de todo creamos nuestro bloque
class Block{
    //Hacemos un constructor con las variables que comportan el bloque.
    constructor(index, timestamp, data, previousHash=''){
        //Indice del bloque
        this.index = index;
        //Tiempo de la transacción
        this.timestamp = timestamp;
        //Datos del bloque como pueden ser dirección de las wallets, cantidad de crypto...
        this.data = data;
        //El Hash del anterior bloque.
        this.previousHash = previousHash;
        //Hash del actual bloque
        this.hash = this.calculateHash();
    }
    //Función para calcular el Hash del bloque
    //Un hash es el resultado de una función hash, la cual es una operación criptográfica que genera identificadores únicos 
    //e irrepetibles a partir de una información dada. Los hashes son una pieza clave en la tecnología blockchain 
    //y tiene una amplia utilidad.
    calculateHash(){
        return SHA256(this.index + this.previousHash + this.timestamp + JSON.stringify(this.data)).toString();
    }
}

//Creamos nuestra blockchain
class Blockchain{
    constructor(){
        this.chain = [this.createGenesisBlock()];
    }
    //Función para crear nuestro Bloque Genesis. Se llama bloque genesis al primer bloque de cada blockchain.
    createGenesisBlock(){
        return new Block(0, "12/04/2022","Genesis Block","0");
    }
    //Función para obtener el anterior bloque
    getLatestBlock(){
        return this.chain[this.chain.length - 1];
    }
    //Función para añadir un nuevo bloque
    addBlock(newBlock){
        //Primero debemos de obtener el anterior bloque
        newBlock.previousHash = this.getLatestBlock().hash;
        //Calcular el hash del actual bloque
        newBlock.hash = newBlock.calculateHash();
        //Añadir el bloque a la blockchain.
        this.chain.push(newBlock);
    }
    //Función para comprobar si nuestra blockchain es valida.
    isChainValid(){
        for(let i = 1; i< this.chain.length; i++){
            const currentBlock = this.chain[i];
            const previousBlock = this.chain[i-1];

            if(currentBlock.hash !== currentBlock.calculateHash()){
                return false;
            }

            if(currentBlock.previousHash !== previousBlock.hash){
                return false;
            }
        }
        return true;
    }
}

//Definimos el nombre de nuestra Blockchain
let JJACoin = new Blockchain();
//Añadimos nuevos bloques a nuestra Blockchain
JJACoin.addBlock(new Block(1, "12/04/2022", {amount: 100}));
JJACoin.addBlock(new Block(2, "13/04/2022", {amount: 250}));

//Obtenemos la información de los bloques de nuestra blockchain
console.log(JSON.stringify(JJACoin, null, 4));

//Probamos la función de comprobar si nuestra blockchain es valida o no.
//console.log('Is blockchain valid? '+ JJACoin.isChainValid())

//Intentamos modificar los datos de uno de nuestros bloques para ver si nuestra blockchain es valida o no.
//JJACoin.chain[1].data = {amount: 1500};
//Calculamos el hash de nuestro bloque anteriormente modificado a ver si así conseguimos que nuestra blockchain sea valida o no.
//JJACoin.chain[1].hash = JJACoin.chain[1].calculateHash();

//Probamos las modificaciones anteriores y comprobamos que nuestra blockchain no es valida.
//console.log('Is blockchain valid? '+ JJACoin.isChainValid())

