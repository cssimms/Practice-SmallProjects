/*
11/18 completed in just over an hour ...

We have a collection of documents arranged into folders.  We’d like to implement a basic permission system for the documents.  Permissions should be inherited: if a user has access to a folder, they should have access to everything in that folder as well, including subfolders.

We want the following functions:
  - grantPermission(item, user) // Gives `user` permission to access `item`
  - hasPermission(item, user) // Returns whether `user` has access to `item`

`item` in this case can be either a folder or a regular document.  Argument types can be defined however you wish.

*/

class Item {
  constructor(name) {
    this.name = name;
  }

  toString() {
    return this.name;
  }
}

class Folder extends Item {
  constructor(name) {
    super(name);
    this.type = "folder";
    this.children = [];
  }

  addChildren(newChildren) {
    if (!Array.isArray(newChildren)) {
      this.children.push(newChildren);
    } else {
      this.children = [...this.children, ...newChildren];
    }
  }

  getAllSubItems() {
    // TODO recurse for all subitem names
    return this.children;
  }
}

class File extends Item {
  constructor(name, content) {
    super(name);
    this.type = "file";
    this.content = content;
  }

  getAllSubItems() {
    // files don't have children
    return [];
  }
}

class User {
  constructor(name) {
    this.name = name;
    this.allowedItems = [];
  }

  hasPermission(itemName) {
    return this.allowedItems.some((allowedItem) => {
      return itemName === allowedItem.name;
    });
  }

  addPermission(newItem) {
    let currentItem = newItem;

    if (currentItem.type === "file") {
      this.allowedItems = [...this.allowedItems, newItem];
    } else if (currentItem.type === "folder") {
      this.allowedItems = [...this.allowedItems, newItem];
      newItem.children.forEach((child) => {
        this.addPermission(child);
      });
    }
  }
}

const root = new Folder("root folder");
// root.addChildren([new File("tax returns", "lots of money")]);

const grantPermissions = (item, user) => {
  const allSubItems = item.getAllSubItems();

  allSubItems.forEach((itemName) => {
    user.addPermission(itemName);
  });
};

const hasPermission = (item, user) => {
  return user.hasPermission(item.name);
};

// setup data
const subFolder = new Folder("last year");
subFolder.addChildren(new File("w2 from your job", "lots of numbers"));
subFolder.addChildren(new File("tax return pdf", "refund money"));

const anotherSubFolder = new Folder("the year before");
const targetFile = new File(
  "w2 from your other job",
  "more numbers for more money!"
);
anotherSubFolder.addChildren(targetFile);
anotherSubFolder.addChildren(new File("yet another pdf", "less refund money"));
root.addChildren([subFolder, anotherSubFolder]);

const user2 = new User("user2");
user2.addPermission(targetFile);

// end data setup

const testFolderBuilding = () => {
  const subFileContent = root.children[1].children[0].content;
  console.log("-------------------------");
  console.log(
    "should find content of child folders:",
    subFileContent === targetFile.content
  );
  console.log("-------------------------");
};
testFolderBuilding();

const testHasPermission = () => {
  const childFile = targetFile;
  const user2Permission = hasPermission(childFile, user2);
  console.log("-------------------------");
  console.log(
    "user2 should have permission on folder by default",
    user2Permission
  );
  console.log("-------------------------");
};

testHasPermission();

const testGranting = () => {
  const user1 = new User("super admin");
  grantPermissions(root, user1);
  const childFile = root.children[0].children[1];
  const user1Granted = hasPermission(childFile, user1);
  console.log("user1 permissions", user1.allowedItems);
  console.log("-------------------------");
  console.log("should have granted files permission for user1:", user1Granted);
  console.log("-------------------------");
};

testGranting();
