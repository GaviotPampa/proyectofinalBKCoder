export const infoApi = {
    definition: {
      openapi: "3.0.0",
      info: {
        title: "Api Ecommerce 🤶",
        version: "1.0.0",
        description:
          "Api ecommerce  desarrollada en el curso de Backend en CoderHouse",
        schema: 'el schema es la respuesta de la solicitud',  
      },
      servers: [
        {
          url: "http://localhost:8080",
        },
      ],
    },
  
    apis: ['./src/docs/**/*.yaml'],
  };
  