import { GraphQLClient } from 'graphql-request';
import { print } from 'graphql';
import gql from 'graphql-tag';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Query = {
  me: MeObject;
};

export type MeObject = {
  user?: Maybe<User>;
  errors?: Maybe<Array<FieldError>>;
};

export type User = {
  id: Scalars['String'];
  name: Scalars['String'];
  email: Scalars['String'];
  token: Scalars['String'];
};

export type FieldError = {
  path?: Maybe<Scalars['String']>;
  message: Scalars['String'];
};

export type Mutation = {
  register: MeObject;
  login: MeObject;
  logout: LogoutObject;
};


export type MutationRegisterArgs = {
  input: RegisterInput;
};


export type MutationLoginArgs = {
  input: LoginInput;
};

export type RegisterInput = {
  name: Scalars['String'];
  email: Scalars['String'];
  password: Scalars['String'];
};

export type LoginInput = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type LogoutObject = {
  success?: Maybe<Scalars['Boolean']>;
  errors?: Maybe<Array<FieldError>>;
};

export type RegisterMutationVariables = Exact<{
  name: Scalars['String'];
  email: Scalars['String'];
  password: Scalars['String'];
}>;


export type RegisterMutation = { register: { user?: Maybe<Pick<User, 'id' | 'name' | 'email'>>, errors?: Maybe<Array<Pick<FieldError, 'path' | 'message'>>> } };


export const RegisterDocument = gql`
    mutation Register($name: String!, $email: String!, $password: String!) {
  register(input: {name: $name, email: $email, password: $password}) {
    user {
      id
      name
      email
    }
    errors {
      path
      message
    }
  }
}
    `;

export type SdkFunctionWrapper = <T>(action: () => Promise<T>) => Promise<T>;


const defaultWrapper: SdkFunctionWrapper = sdkFunction => sdkFunction();
export function getSdk(client: GraphQLClient, withWrapper: SdkFunctionWrapper = defaultWrapper) {
  return {
    Register(variables: RegisterMutationVariables, requestHeaders?: Headers): Promise<RegisterMutation> {
      return withWrapper(() => client.request<RegisterMutation>(print(RegisterDocument), variables, requestHeaders));
    }
  };
}
export type Sdk = ReturnType<typeof getSdk>;