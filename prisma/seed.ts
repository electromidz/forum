import { PrismaClient } from "@prisma/client";
const db = new PrismaClient();

async function seed() {
  await db.$connect();
}
seed()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

// TODO: you must add this on your config db and use with jscompress
// config = {
//   _id: "my-mongo-set",
//   members: [
//     { _id: 0, host: "mongo1:27017" },
//     { _id: 1, host: "mongo2:27017" },
//     { _id: 2, host: "mongo3:27017" },
//   ],
// };

// config={_id:"my-mongo-set",members:[{_id:0,host:"mongo1:27017"},{_id:1,host:"mongo2:27017"},{_id:2,host:"mongo3:27017"}]};