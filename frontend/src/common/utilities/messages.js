export default function getMessage(messageCode){
    switch(messageCode){
        case 'WARN_020':
            return 'Username inesistente!';

        case 'WARN_022':
            return 'L\'username inserito è già utilizzato!';









        case 'ERR_020':
            return 'Il campo username è vuoto o nullo, inseriscilo!';

        case 'ERR_022':
            return 'Il campo della password è vuoto o nullo, inseriscila!';

        case 'ERR_036':
            return 'La password non è corretta, ricontrolla!';







        
        case 'FAT_021':
            return  'Errore fatale accaduto durante la registrazione dell\'utente. Cod. errore: FAT_021';
        
        case 'FAT_025':
            return  'Errore fatale accaduto durante il controllo dell\'esistenza dell\'username. Cod. errore: FAT_025';
    }
}