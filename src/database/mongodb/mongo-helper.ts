import mongoose from "mongoose";

export const MongoHelper = {
  client: undefined,
  uri: null as string,

  async connect(uri?: string): Promise<void> {
    if(uri) {
      this.uri = uri;
      this.client = await mongoose.connect(this.uri, {
        dbName: "atlas_challenge_db",
      });
    } else {
      this.client = await mongoose.connect(process.env.MONGO_URL);
    }
  },

  async disconnect(): Promise<void> {
    await mongoose.connection.close();
    this.uri = null as string;
    this.client = undefined;
  },

  async clearCollection(collectionName: string): Promise<void> {
    const collection = mongoose.connection.collection(collectionName);
    await collection.deleteMany({});
  },

  map(collection: any): any {
    const { _id, ...collectionWithoutId } = collection;
    return Object.assign({}, collectionWithoutId, { id: _id.toString() });
  },
};
