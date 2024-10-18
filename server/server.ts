import Fastify from 'fastify'
import { errorCodes } from 'fastify'
import { serializerCompiler, validatorCompiler, ZodTypeProvider } from "fastify-type-provider-zod";
import { createDb } from './db';
import { PetType, Id, UpdatePet, CreatePet, Pet, Pets } from './pet';

const PORT = 4444;
const { FST_ERR_NOT_FOUND } = errorCodes

const petsDb = createDb<PetType>([]);

const app = Fastify({
  logger: {
    transport: {
      target: 'pino-pretty',
    },
  }
}).withTypeProvider<ZodTypeProvider>();

app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);

app.get('/pets', {
  schema: {
    response: {
      '2xx': Pets
    }
  }
}, (request, reply) => {
  reply.send(petsDb.readAll())
})

app.post(
  '/pets',
  {
    schema: {
      body: CreatePet,
      response: {
        201: Pet
      }
    }
  },
  (request, reply) => {
    const { body: pet } = request;
    const created = petsDb.create(pet);
    reply.status(201).send(created);
  },
)

app.get(
  '/pets/:id',
  {
    schema: {
      params: Id
    }
  },
  (request, reply) => {
    const { id } = request.params;
    const found = petsDb.read(id);
    if (!found) {
      throw new FST_ERR_NOT_FOUND();
    }
    reply.send(found)
  }
)

app.patch(
  '/pets/:id',
  {
    schema: {
      params: Id,
      body: UpdatePet,
      response: {
        200: Pet
      }
    }
  },
  (request, reply) => {
    const { body: updates, params: { id } } = request;
    const updated = petsDb.update(id, updates);
    if (!updated) {
      throw new FST_ERR_NOT_FOUND();
    }
    reply.send(updated)
  }
)

app.delete(
  '/pets/:id',
  {
    schema: {
      params: Id
    }
  },
  (request, reply) => {
    const { id } = request.params;
    petsDb.delete(id);
    reply.status(204).send()
  }
)

app.listen({ port: PORT }, function (err, address) {
  if (err) {
    app.log.error(err)
    process.exit(1)
  }
})