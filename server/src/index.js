const { ApolloServer } = require("apollo-server");

const { createStore } = require("./utils");

const typeDefs = require("./schema/index");
const resolvers = require("./resolvers/index");

const LaunchAPI = require("./datasources/launch");
const UserAPI = require("./datasources/user");

const store = createStore();

const server = new ApolloServer({
    typeDefs,
    resolvers,
    dataSources: () => ({
        launchAPI: new LaunchAPI(),
        userAPI: new UserAPI({ store })
    })
});

server.listen().then(({ url }) => {
    console.log(`🚀 Server ready at ${url}`);
})
