import { ApolloServer } from 'apollo-server'
import { typeDefs, resolvers } from './grapql/merging'
/* import data from './database/indice_pulmonar/01062021.json' */


const SERVER = new ApolloServer({ typeDefs, resolvers })

SERVER.listen().then(({ url }) => { console.log(`🚀 Servidor pronto em ${url}`); });