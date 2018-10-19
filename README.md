# chrome_dump

Dump data seamlessly into a Mongodb collection from your browser

## Setup
Create a MongoDB Atlas Cluster, attach a Stitch application, and go through the 'Getting Started' page on the Stitch UI
to create a Stitch app name, db, and collection.

In config.json add your Stitch app name, db, and collection.

Now add this chrome extension by navigating to to chrome://extensions.  Turn on 'Developer Mode' (top right).
Click 'Load Unpacked' and select the folder on your computer this repo is cloned in.

## Use
A good place to search for datasets to insert into your MongoDB collection
is Google DataSet Search.  

For example, here is a dataset of NYC construction loans:
https://data.cityofnewyork.us/resource/dh27-cvaj.json

Highlight the data in this page, click the newly created chrome extension, and click the Insert button.



