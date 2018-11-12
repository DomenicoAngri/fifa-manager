export default function getMessage(messageCode){
    switch(messageCode){
        
        case 'WARN_022':
            return 'L\'username inserito è già utilizzato!';

        case 'FAT_025':
            return  'Errore fatale accaduto durante il controllo dell\'esistenza dell\'username. Cod. errore: FAT_025';
    }
}