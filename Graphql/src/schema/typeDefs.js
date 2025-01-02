const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type User {
    id: ID!
    name: String!
    email: String!
    posts: [Post!]!
  }

  type Post {
    id: ID!
    title: String!
    content: String!
    user: User!
    userId: ID!
  }

  type Query {
    getUsers: [User!]!
    getUser(id: ID!): User
    getPosts: [Post!]!
    getPost(id: ID!): Post
    searchPosts(title: String, userId: ID): [Post!]!
  }

  type Mutation {
    createUser(name: String!, email: String!): User!
    createPost(title: String!, content: String!, userId: ID!): Post!
  }
`;

module.exports = typeDefs;
