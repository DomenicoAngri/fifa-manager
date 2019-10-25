/*******************************
 * Footballer helper
 *******************************/

const footballerModel = require('./footballer.model');

function footballerHelper(){
    let footballerHelper = this;

    footballerHelper.getFootballerById = getFootballerById;
    footballerHelper.getAllFootballers = getAllFootballers;
    footballerHelper.insertNewFootballer = insertNewFootballer;
    footballerHelper.updateFootballer = updateFootballer;
    footballerHelper.deleteFootballer = deleteFootballer;
    footballerHelper.insertFootballersCollection = insertFootballersCollection;

    return footballerHelper;

    function getFootballerById(id){
        return new Promise(function(resolve, reject){
            footballerModel.findOne({_id: id})
            .then(function(footballer){
                resolve(footballer);
            })
            .catch(function(error){
                reject(error);
            });
        });
    }

    function getAllFootballers(){
        return new Promise(function(resolve, reject){
            footballerModel.find({})
            .then(function(footballers){
                resolve(footballers);
            })
            .catch(function(error){
                reject(error);
            });
        });
    }

    function insertNewFootballer(footballerBody){
        return new Promise(function(resolve, reject){
            let footballer = new footballerModel(footballerBody);

            footballer.save()
            .then(function(footballerSaved){
                resolve(footballerSaved);
            })
            .catch(function(error){
                reject(error);
            });
        });
    }

    function updateFootballer(id, footballerBody){
        return new Promise(function(resolve, reject){
            footballerModel.updateOne(
                {_id: id},
                {$set: footballerBody},
                {new: true}
            )
            .then(function(footballerUpdated){
                resolve(footballerUpdated);
            })
            .catch(function(error){
                reject(error);
            });
        });
    }

    function deleteFootballer(id){
        return new Promise(function(resolve, reject){
            footballerModel.deleteOne({_id: id})
            .then(function(footballerDeleted){
                resolve(footballerDeleted);
            })
            .catch(function(error){
                reject(error);
            });
        });
    }

    function insertFootballersCollection(dataset){
        return new Promise(function(resolve, reject){
            footballerModel.collection.insertMany(dataset)
            .then(function(result){
                resolve(result);
            })
            .catch(function(error){
                reject(error);
            });
        });
    }
}

module.exports = new footballerHelper();