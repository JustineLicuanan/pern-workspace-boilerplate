import { GraphQLClient } from 'graphql-request';

import { PORT } from '../../constants';
import { getSdk } from './generated/graphql';

const client = new GraphQLClient(`http://localhost:${PORT}/graphql`);
export const sdk = getSdk(client);
