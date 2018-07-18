/*******************************
 * Users middlewares.
 *******************************/

const userHelper = require('./user.helper');
const responseMessage = require('../../utils/responseMessage');

function usersMiddlewares(){
    let usersMiddlewares = this;

    usersMiddlewares.checkRegisterFields = checkRegisterFields;
    usersMiddlewares.checkUserExists = checkUserExists;
    usersMiddlewares.checkUserNotExists = checkUserNotExists;

    return usersMiddlewares;

    function checkRegisterFields(request, response, next){
        const body = request.body;
        const whiteSpaceString = RegExp('^ *$');

        // TODO - insert email validation with regex!

        if(!body.username || whiteSpaceString.test(body.username)){
            console.error('ERROR - ERR_020 --> Username cannot be empty or null!');
            response.status(400).send(new responseMessage('ERR_020', 'ERROR --> Username cannot be empty or null!'));
        }
        else if(!body.email || whiteSpaceString.test(body.email)){
            console.error('ERROR - ERR_021 --> Email cannot be empty or null!');
            response.status(400).send(new responseMessage('ERR_021', 'ERROR --> Email cannot be empty or null!'));
        }
        else if(!body.password || whiteSpaceString.test(body.password)){
            console.error('ERROR - ERR_022 --> Password cannot be empty or null!');
            response.status(400).send(new responseMessage('ERR_022', 'ERROR --> Password cannot be empty or null!'));
        }
        else if(!body.name || whiteSpaceString.test(body.name)){
            console.error('ERROR - ERR_023 --> Name cannot be empty or null!');
            response.status(400).send(new responseMessage('ERR_023', 'ERROR --> Name cannot be empty or null!'));
        }
        else if(!body.surname || whiteSpaceString.test(body.surname)){
            console.error('ERROR - ERR_024 --> Surname cannot be empty or null!');
            response.status(400).send(new responseMessage('ERR_024', 'ERROR --> Surname cannot be empty or null!'));
        }
        else if(!body.telephoneNumber || whiteSpaceString.test(body.telephoneNumber)){
            console.error('ERROR - ERR_025 --> Telephone number cannot be empty or null!');
            response.status(400).send(new responseMessage('ERR_025', 'ERROR --> Telephone number cannot be empty or null!'));
        }
        else{
            next();
        }
    }

    function checkUserExists(request, response, next){
        userHelper.getUserByUsername(request.params.username)
        .then(function(user){
            if(user != null){
                console.info('INFO - User found!');
                console.debug(user);
                next();
            }
            else{
                console.warn('WARN - WARN_020 --> User not found!');
                response.status(404).send(new responseMessage('WARN_020', 'WARNING --> User not found!'));
            }
        })
        .catch(function(error){
            console.error('FATAL - FAT_020 --> Fatal server error on checking user exists. Check immediately console and logs.');
            console.error(error);
            response.status(500).send(new responseMessage('FAT_020', 'FATAL --> Fatal server error on checking user exists. Check immediately console and logs.'));
        });
    }

    function checkUserNotExists(request, response, next){
        userHelper.getUserByUsername(request.params.username)
        .then(function(user){
            if(user == null){
                console.info('INFO - User not found!');
                next();
            }
            else{
                console.warn('WARN - WARN_022 --> WARN --> User found!');
                console.debug(user)
                response.status(409).send(new responseMessage('WARN_022', 'WARN --> User found!'));
            }
        })
        .catch(function(error){
            console.error('FATAL - FAT_025 --> Fatal error on checking user not exists. Check immediately console and logs.');
            console.error(error);
            response.status(500).send(new responseMessage('FAT_025', 'FATAL --> Fatal error on checking user not exists. Check immediately console and logs.'));
        });
    }

}

module.exports = new usersMiddlewares();