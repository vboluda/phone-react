import {  gql } from 'apollo-server';
import MongoHelper from './MongoHelper';

let Mongo=new MongoHelper(process.env.MONGO_URL);

export const typeDefs = gql`

  type PhoneEntry {
    name: String
    phone: String
  }

  type Query {
    all: [PhoneEntry]
    filter(name: String):[PhoneEntry]
  }

  type Mutation{
    upsert(name:String!, phone:String!):Boolean
    delete(name : String!):Boolean
  }
`;

export const resolvers:any = {
    Query: {
      all: async () => {
        let all=await Mongo.getAll();
        return all;
      },
      filter: async (_:any,args:any) =>{
        console.log("Name "+args.name);
        let filtered=await Mongo.getFiltered(args.name);
        return filtered;
      }
    },
    Mutation: {
      upsert: async (_:any,args:any):Promise<boolean>=>{
          let result:any=await Mongo.insert(args);
          return ((result.matchedCount==1) || (result.upsertedCount==1));
      },
      delete: async (_:any,args:any):Promise<boolean> =>{
        let result:any=await Mongo.delete(args.name);
        return (result.deletedCount==1);
      }
    }
  };


  