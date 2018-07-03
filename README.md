### Family Tree

This project is a MEAN app that allows you to create a tree view.
The project provides a database so your tree data is persisted

![alt tag](https://raw.githubusercontent.com/lon-albert/family-tree/master/src/assets/basic_view.png)

Dependencies
---
MongoDB

Setup
---

1. Install MongoDB: https://docs.mongodb.com/manual/installation/
2. Clone: `git clone https://github.com/lon-albert/family-tree.git`
3. Install Deps: `npm install`

Usage
---
```
npm run server
npm start
```

Docker (Server Only)
---
1. Start the Server: `bin/start-server.sh`
2. View Server logs: `bin/server-logs.sh`
3. Start the Client: `npm start`

Features
---

1. Create the root node
![alt tag](https://raw.githubusercontent.com/lon-albert/family-tree/master/src/assets/patriach_view.png)

2. Create child nodes for each node
![alt tag](https://raw.githubusercontent.com/lon-albert/family-tree/master/src/assets/new_view.png)

3. Edit the title of each node
![alt tag](https://raw.githubusercontent.com/lon-albert/family-tree/master/src/assets/edit_view.png)


4. Get a hierarchical highlight effect on hovering over a node
![alt tag](https://raw.githubusercontent.com/lon-albert/family-tree/master/src/assets/hover_view.png)

5. Delete a node; and invariably all its children
