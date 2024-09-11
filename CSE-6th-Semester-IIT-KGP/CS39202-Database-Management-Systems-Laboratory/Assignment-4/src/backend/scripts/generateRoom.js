import { Block, Room } from "../models/index.js";

const main = async () => {
  for (let i = 1; i <= 5; i++) {
    for (let j = 0; j <= 3; j++) {
      const block = await Block.create({
        floor: j,
        code: i,
      });
      console.log(block);
    }
  }

  const typeList = ["general", "icu", "emergency", "operation"];

  const blockList = await Block.findAll({});

  let room_cnt = 0;

  for await (const block of blockList) {
    for (let i = 1; i <= 3; i++) {
      const room = await Room.create({
        room_number: room_cnt,
        type: typeList[Math.floor(Math.random() * typeList.length)],
        cost: Math.floor(Math.random() * 1000),
        block_id: block.id,
      });
      room_cnt++;
      console.log(room);
    }
  }
};

main();
