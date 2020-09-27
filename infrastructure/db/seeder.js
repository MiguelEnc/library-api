const path = require("path");
const { Seeder } = require("mongo-seeding");
const config = require("../config");

const seederConfig = {
  database: config.get("dbURI"),
  dropDatabase: true,
};
const seeder = new Seeder(seederConfig);
const collections = seeder.readCollectionsFromPath(
  path.resolve("./infrastructure/db/data-import")
);

async function seed() {
  try {
    console.log("Starting database seeding process...");
    await seeder.import(collections);
    console.log("Seeding success!");
  } catch (err) {
    console.error("Seeding Error:", err);
  }
}

seed();
