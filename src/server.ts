import fastify from 'fastify';
import cors from '@fastify/cors';

const server = fastify({ logger: true });
server.register(cors, {
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
});

server.get('/teams', async (request, response) => {
  response.type('application/json').code(200);

  return [
    {
      id: 1,
      name: 'Ferrari',
    },
  ];
});

server.listen({ port: 3333 }, () => {
  console.log('Server is running on http://localhost:3333');
});

const teams = [
  {
    id: 1,
    name: 'Charles Leclerc',
    team: 'Ferrari',
  },
  {
    id: 2,
    name: 'Carlos Sainz',
    team: 'Ferrari',
  },
  {
    id: 3,
    name: 'Lando Norris',
    team: 'McLaren',
  },
  {
    id: 4,
    name: 'Lewis Hamilton',
    team: 'Mercedes',
  },
];

server.get('/drivers', async (request, response) => {
  response.type('application/json').code(200);
  return teams;
});

interface Driver {
  id: string
}

server.get<{Params: Driver}>('/drivers/:id', async (request, response) => {
  const id = parseInt(request.params.id);
  const driver = teams.find((team) => team.id === id);

  if(!driver){
    response.status(404).send({ error: 'Driver not found' });
    return;
  }

  response.type('application/json').code(200);
  return driver;
})
