import { ApolloServer } from 'apollo-server';
import {typeDefs,resolvers} from "./lib/gqlData";


let MONGO_URL=process.env.MONGO_URL

console.log("***************************");
console.log("     PHONE DB              ")
console.log("***************************");
console.log("MONGO_URL: "+MONGO_URL);



  const {
    ApolloServerPluginLandingPageLocalDefault
  } = require('apollo-server-core');

  const server:ApolloServer = new ApolloServer({
    typeDefs,
    resolvers,
    csrfPrevention: true,
    cache: 'bounded',
    plugins: [
      ApolloServerPluginLandingPageLocalDefault({ embed: true }),
    ],
  });

  server.listen().then(({ url }) => {
    console.log(`Server ready at ${url}`);
  });
