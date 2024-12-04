/*

We have a collection of documents arranged into folders.  We’d like to implement a basic permission system for the documents.  Permissions should be inherited: if a user has access to a folder, they should have access to everything in that folder as well, including subfolders.

We want the following functions:
  - grantPermission(item, user) // Gives `user` permission to access `item`
  - hasPermission(item, user) // Returns whether `user` has access to `item`

`item` in this case can be either a folder or a regular document.  Argument types can be defined however you wish.

*/
