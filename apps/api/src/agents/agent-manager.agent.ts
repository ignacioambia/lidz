import { Agent } from '@openai/agents';
// import { z } from 'zod';

export const agentManager = new Agent({
  name: 'Manager agent',
  outputType: {
    type: 'json_schema',
    name: 'ActionsResponse',
    strict: true,
    schema: {
      type: 'object',
      properties: {
        actions: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              type: { type: 'string', enum: ['NOTIFICATION'] },
              tool: {
                type: 'object',
                properties: {
                  name: {
                    type: 'string',
                    description: 'The name of the function written in spanish',
                  },
                  description: {
                    type: 'string',
                    description: 'A brief description of the function',
                  },
                  parameters: {
                    type: 'object',
                    description:
                      'The parameters required to call the function, written in JSON Schema format',
                    properties: {},
                    additionalProperties: { type: 'string' },
                  },
                },
                required: ['name', 'description', 'parameters'],
                additionalProperties: false,
              },
            },
            required: ['type', 'tool'],
            additionalProperties: false,
          },
        },
      },
      required: ['actions'],
      additionalProperties: false,
    },
  },
  instructions: `
  Analiza las instrucciones proporcionadas y decide si el prompt requiere de alguna acción al momento de correrla. Por ahora sólo tenemos "NOTIFICAR". Busca palabras clave como "notificar", "alertar", "avisar", "informar", etc. También propoón un "tool" con los datos que se enviaría dicha notificacion. Debe de llevar un "name", "description" y "parameters"
`,
});
