import { loadFilesSync } from '@graphql-tools/load-files'
import { mergeResolvers, mergeTypeDefs } from '@graphql-tools/merge' 
import path from 'path'

// TYPEDEFS
const typesArray = loadFilesSync(path.join(__dirname, './modules'), { extensions: ['gql'] })
const typeDefs = mergeTypeDefs(typesArray,  { all: true })

// RESOLVERS
const resolversArray = loadFilesSync(path.join(__dirname, './modules'), { extensions: ['js'] })
const resolvers = mergeResolvers(resolversArray,  { all: true })

export { typeDefs, resolvers }