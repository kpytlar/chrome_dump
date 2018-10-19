var config;
var client;
var db;
var user;
var collection;

// load stitch configuration from config.json
loadJSON(function(json) {
    config = json;
    client = stitch.Stitch.initializeDefaultAppClient(config['STITCH_APP']);
    db = client.getServiceClient(stitch.RemoteMongoClient.factory, 'mongodb-atlas').db(config['DB']);
    user = client.auth.loginWithCredential(new stitch.AnonymousCredential())
    collection = config['COLLECTION'];
});

insertData.onclick = function(element) {
    document.getElementById("msgContainer").innerHTML = 'Working...';
    chrome.tabs.executeScript( {
        code: "window.getSelection().toString();"
        }, function(selection) {
            parseSelected(selection);
        })
};

deleteData.onclick = function(element) {
    document.getElementById("msgContainer").innerHTML = 'Working...';
    db.collection(collection).deleteMany().then(result =>
        {
            const deletedCount = result['deletedCount'].toString();
            const msg = 'Deleted ' +  deletedCount + ' documents in collection ' + collection + '!';
            document.getElementById("msgContainer").innerHTML = '<img src="images/check.png"  height="15"> ' + msg;
        });
};

// parse highlighted text on webpage
function parseSelected(selection) {
    try {
        var obj = JSON.parse(selection[0]);
    } catch (err) {
        const msg = 'Error parsing JSON...'
        document.getElementById("msgContainer").innerHTML = '<img src="images/alert.png"  height="15"> ' + msg;
    }

    if (obj) {
        if (Array.isArray(obj)) {
            for (var element in obj) {
                obj[element]['owner_id'] = client.auth.user.id;
            }
            db.collection(collection).insertMany(obj).then(result =>
                {
                const writeCount = Object.keys(result['insertedIds']).length.toString();
                const msg = 'Inserted ' + writeCount + ' documents into ' + collection + '!';
                document.getElementById("msgContainer").innerHTML = '<img src="images/check.png"  height="15"> ' + msg;
                }
            )
        } else {
            obj['owner_id'] = client.auth.user.id;
            db.collection(collection).insertOne(obj).then(result =>
                {
                document.getElementById("msgContainer").innerHTML = '<img src="images/check.png"  height="15"> ' + 'Inserted document into ' + collection + '!';
                }
            )
        }
    }
};

// load config.json contents as object
function loadJSON(callback) {   
    var xobj = new XMLHttpRequest();
    xobj.overrideMimeType("application/json");
    xobj.open('GET', './config.json', true);
    xobj.onreadystatechange = function () {
      if (xobj.readyState == 4 && xobj.status == "200") {
        callback(JSON.parse(xobj.responseText));
      }
    };
    xobj.send(null);  
};

