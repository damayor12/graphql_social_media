import { Post, Prisma } from '@prisma/client';
import { Context } from '../../index';
import { authResolvers } from './auth';
import { postResolvers } from './post';




export const Mutation = {
  ...postResolvers,
  ...authResolvers
};
