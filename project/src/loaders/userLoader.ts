import { User } from '@prisma/client';
import Dataloader from 'dataloader';
import { prisma } from '..';

// type BatchUser = (ids: string[]) => ;

//userLoader receives a number - id from each parent request, adds all to an arrray, and sends it to the batchUser
const batchUsers = async (ids: number[]): Promise<User[]> => {
  const users = await prisma.user.findMany({
    where: {
      id: {
        in: ids,
      },
    },
  });

  // to keep users in the same order as the passed in ids array
  const userMap: { [key: string]: User } = {};

  users.forEach((user) => {
    userMap[user.id] = user;
  });
  // to keep users in the same order as the passed in ids array
  return ids.map((id) => userMap[id]);
};

//@ts-ignore
export const userLoader = new Dataloader<number, User>(batchUsers);
//userLoader receives a number, adds all to an arrray, and sends it to the batchUser
