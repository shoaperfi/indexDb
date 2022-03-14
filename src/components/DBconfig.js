export const DBConfig = {
    name: "AppifyDB",
    version: 1,
    objectStoresMeta: [
      {
        store: "Appify_users",
        storeConfig: { keyPath: "id", autoIncrement: true },
        storeSchema: [
          { name: "name", keypath: "name", options: { unique: false } },
          { name: "dob", keypath: "dob", options: { unique: false } },
          { name: "address", keypath: "address", options: { unique: false } }
        ]
      }
    ]
  };