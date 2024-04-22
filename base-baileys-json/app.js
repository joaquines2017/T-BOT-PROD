const { createBot, createProvider, createFlow, addKeyword, flowDynamic, addAnswer, addAction, addDynamicAction } = require('@bot-whatsapp/bot')

const QRPortalWeb = require('@bot-whatsapp/portal')
const BaileysProvider = require('@bot-whatsapp/provider/baileys')
const JsonFileAdapter = require('@bot-whatsapp/database/json')
const axios = require('axios')
const { delay } = require('@whiskeysockets/baileys')

/*conexion 1 de la api de redmine*/

/*async function obtenerDatosRedmine() {
  try {
    const apiKey = 'caa5569e969a7a7dd08f2dd1268579aceb93b3f4';
    const redmineUrl = 'https://incidentes.mpftucuman.gob.ar';
    const endpoint = '/issues.json';
    const apiUrl = `${redmineUrl}${endpoint}?key=${apiKey}`;

    const response = await axios.get(apiUrl);
    const issuesData = response.data.issues;

    // Verificar si issuesData es un array y tiene elementos

    if (Array.isArray(issuesData) && issuesData.length > 0) {
      
      // Construir un mensaje con la información obtenida
      
      const message = issuesData.map(issue => {
      
        // Verificar si assigned_to existe antes de acceder a name
      
        const assignedToName = issue.assigned_to ? issue.assigned_to.name : 'No asignado';
        return `ID: ${issue.id}, Asignado a: ${assignedToName}`;
      }).join('\n');

      return message;
    } else {
      throw new Error('La respuesta de Redmine no contiene datos de problemas.');
    }
  } catch (error) {
    console.error('Error al obtener datos de Redmine:', error.message);
    throw error;
  }
}
/*fin de la conexion 1 */
/**prueba de la conexión version 2 */
/*async function obtenerDatosRedmine() {
  try {
    const apiKey = 'caa5569e969a7a7dd08f2dd1268579aceb93b3f4';
    const redmineUrl = 'https://incidentes.mpftucuman.gob.ar';
    const endpoint = '/issues.json';
    const apiUrl = `${redmineUrl}${endpoint}?key=${apiKey}`;

    const response = await axios.get(apiUrl);
    const issuesData = response.data.issues;
    console.log('Respuesta de Redmine:', response.data);

    // Verificar si issuesData es un array y tiene elementos
    if (Array.isArray(issuesData) && issuesData.length > 0) {
      // Construir un mensaje con la información obtenida
      const message = issuesData.map(issue => {
        // Verificar si assigned_to existe antes de acceder a name
        const assignedToName = issue.assigned_to ? issue.assigned_to.name : 'No asignado';
        return `ID: ${issue.id}, Asignado a: ${assignedToName}`;
      }).join('\n');

      return message;
    } else {
      throw new Error('La respuesta de Redmine no contiene datos de problemas.');
    }
  } catch (error) {
    console.error('Error al obtener datos de Redmine:', error.message);
    return 'Hubo un error al obtener datos de Redmine.';  // Devolver una cadena en caso de error
  }
}*/

/* prueba dos de funcion para obtener datos de redmine*/
async function obtenerDatosRedmine() {
  try {
    const apiKey = 'caa5569e969a7a7dd08f2dd1268579aceb93b3f4'; // Reemplaza con tu clave API de Redmine
    const redmineUrl = 'https://incidentes.mpftucuman.gob.ar';
    const endpoint = '/issues.json';
    const apiUrl = `${redmineUrl}${endpoint}?key=${apiKey}`;

    const response = await axios.get(apiUrl);
    const issuesData = response.data.issues;

    // Verificar si issuesData es un array y tiene elementos
    if (Array.isArray(issuesData) && issuesData.length > 0) {
      // Construir un mensaje con la información obtenida
      const message = issuesData.map(issue => {
        // Verificar si assigned_to existe antes de acceder a name
        const assignedToName = issue.assigned_to ? issue.assigned_to.name : 'No asignado';
        return `ID: ${issue.id}, Asignado a: ${assignedToName}`;
      }).join('\n');

      return message;
    } else {
      return 'No hay datos de problemas en Redmine.';
    }
  } catch (error) {
    console.error('Error al obtener datos de Redmine:', error.message);
    return 'Hubo un error al obtener datos de Redmine.';
  }
}


/*Mostrar datos de redmine */
// Llamar a la función y mostrar los datos en console.log
obtenerDatosRedmine()
  .then(data => {
  //  console.log('Datos obtenidos de Redmine:\n', data);
  })
  .catch(error => {
    console.error('Error al obtener datos de Redmine:', error.message);
  });
/*fin de la funciona mostrar datos*/ 


const flowSecundario = addKeyword([{capture:true}, 'siguiente'])
.addAnswer(['📄 Aquí tenemos el flujo secundario'])

const flowDocs = addKeyword(['doc', 'documentacion', 'documentación']).addAnswer(
    [
        '📄 Aquí encontras las documentación recuerda que puedes mejorarla',
        'https://bot-whatsapp.netlify.app/',
        '\n*2* Para siguiente paso.',
    ],
    null,
    null,
    [flowSecundario]
)

const flowTuto = addKeyword(['tutorial', 'tuto']).addAnswer(
    [
        '🙌 Aquí encontras un ejemplo rapido',
        'https://bot-whatsapp.netlify.app/docs/example/',
        '\n*2* Para siguiente paso.',
    ],
    null,
    null,
    [flowSecundario]
)

/*const flowString= addKeyword(['2', 'dos']).addAnswer(['Estos son los datos de Redmine:',
flowdinamyc(async () => {
  try {
    const datosRed = await obtenerDatosRedmine();
      const message = datosRed.split('\n').map(c => ({ body: c.id }));
      return message;
    } catch (error) {
      console.error('Error al obtener datos de Redmine:', error.message);
      return 'Hubo un error al obtener datos de Redmine.';
    }
  })
]);*/

/*OPCION DE DE PRUEBA -1
const flowString = addKeyword(['2', 'dos']).addAction(async (_, { flowDynamic }) => {
  try {
     datosRed = await obtenerDatosRedmine();
    const messages = datosRed.split('\n').map(c => `ID: ${c.id}, Asignado a: ${c.assignedToName}`).join('\n');
    console.log(messages);
 await flowDynamic(['Estos son los datos de Redmine:',
 ...messages.split('\n')]);
  
} catch (error) {
    console.error('Error al obtener datos de Redmine:', error.message);
    console.log('Hubo un error al obtener datos de Redmine.');
  }
  
});FIN DE LA OPICION*/
process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
});

// Mostrar datos de Redmine

// Opción 2 para mostrar datos de Redmine en el flujo
// ...

// ...
/*const flowStringAlternative = addKeyword(['2', 'dos'])
  .addAction(async (_, { flowDynamic }) => {
    try {
      let ticketId;

      // Preguntar al usuario por el ID en un bucle hasta que proporcione uno válido
      while (true) {
        // Preguntar al usuario por el ID
        await flowDynamic('Por favor, ingresa el ID del ticket que deseas consultar:');

       // Esperar la respuesta del usuario
       const userInput = await flowDynamic({ capture: true });
      
       // Obtener el texto capturado del cuerpo de la respuesta del usuario
       const ticketId = userInput;
       // Validar que el ID ingresado sea un número
       if (!/^\d+$/.test(ticketId)) {
         await flowDynamic('El ID ingresado no es válido. Por favor, ingresa un número.', { delay: 8000 });
         return;
       }

      
      const data = await obtenerDatosRedmine();

      // Verifica si 'data' es una cadena y no está vacía
      if (typeof data === 'string' && data.trim() !== '') {
        const messages = data.split('\n').map(line => {
          // Parsea cada línea del mensaje para extraer ID y Asignado a
          const match = line.match(/ID: (\d+), Asignado a: (.+)/);
          if (match && match.length === 3) {
            const id = match[1];
            const asignadoA = match[2];

            // Comprueba si el ID coincide con el proporcionado por el usuario
            if (id === ticketId) {
              return `Estos son los datos de Redmine:\n${line}`;
            }
          }
        }).filter(Boolean); // Filtra líneas que sean undefined o vacías

        if (messages.length > 0) {
          // Utiliza map para pasar cada mensaje individualmente al flujo dinámico
          await Promise.all(messages.map(async message => await flowDynamic([{ body: message }])));
        } else {
          await flowDynamic('No se encontraron datos para el ID proporcionado.');
        }
      } else {
        console.error('La respuesta de Redmine no contiene datos de problemas o está vacía.');
      }
  };
} 
    catch (error) {
      console.error('Error al obtener datos de Redmine:', error.message);
      console.log('Hubo un error al obtener datos de Redmine.');
    }
  
  });*/
  const flowStringAlternative = addKeyword(['2', 'dos'])
  .addAction(async (_, { flowDynamic }) => {
    try {
      let ticketId;

      // Preguntar al usuario por el ID en un bucle hasta que proporcione uno válido
      while (true) {
        // Preguntar al usuario por el ID
        await flowDynamic('Por favor, ingresa el ID del ticket que deseas consultar:');

       // Esperar la respuesta del usuario
       const userInput = ({ capture: true });
      
       // Obtener el texto capturado del cuerpo de la respuesta del usuario
       const ticketId = userInput;
       // Validar que el ID ingresado sea un número
       if (!/^\d+$/.test(ticketId)) {
         await flowDynamic('El ID ingresado no es válido. Por favor, ingresa un número.', { delay: 8000 });
         return;
       }

      
      const data = await obtenerDatosRedmine();

      if (typeof data === 'string' && data.trim() !== '') {
        const messages = data.split('\n').map(line => {
          const match = line.match(/ID: (\d+), Asignado a: (.+)/);
          if (match && match.length === 3) {
            const id = match[1];
            const asignadoA = match[2];
            if (id === ticketId) {
              return `Estos son los datos de Redmine:\n${line}`;
            }
          }
        }).filter(Boolean);

        if (messages.length > 0) {
          await Promise.all(messages.map(async (message) => await flowDynamic([{ body: message }])));
        } else {
          await flowDynamic('No se encontraron datos para el ID proporcionado.');
        }
      } else if (data === 'No hay datos de problemas en Redmine.') {
        await flowDynamic('No hay datos de problemas en Redmine.');
      } else {
        console.error('La respuesta de Redmine no contiene datos de problemas o está vacía.');
      }
    };
    } catch (error) {
      console.error('Error al obtener datos de Redmine:', error.message);
      console.log('Hubo un error al obtener datos de Redmine.');
    }

  
  });
//});



// ...

// ...





/*OPCION 3
const flowString = addKeyword(['2', 'dos']).addAnswer('Consultando datos N° de Ticket....')
flowDynamic (async ({ addAnswer }) => {
    try {
      const datosRed = await obtenerDatosRedmine();

      // Verificar si datosRed es una cadena no vacía
      if (typeof datosRed === 'string' && datosRed.trim() !== '') {
        // Utilizar addAnswer para enviar la respuesta directamente
        addAnswer([{ body: 'Estos son los datos de Redmine:', datosRed }]);
      } else {
        throw new Error('La respuesta de Redmine no contiene datos de problemas o está vacía.');
      }
    } catch (error) {
      console.error('Error al obtener datos de Redmine:', error.message);
      addAnswer([{ body: 'Hubo un error al obtener datos de Redmine.' }]);
    }
  });




/** FIN */
  
const flowDiscord = addKeyword(['discord']).addAnswer(
    ['🤪 Únete al discord', 'https://link.codigoencasa.com/DISCORD', '\n*2* Para siguiente paso.'],
    null,
    null,
    [flowSecundario]
)

const flowPrincipal = addKeyword(['hola', 'ole', 'alo'])
    .addAnswer('🙌 Hola bienvenido a este *Chatbot*')
    .addAnswer(
        [
            'te comparto los siguientes links de interes sobre el proyecto',
            '👉 *doc* para ver la documentación',
            '👉 *2* consultar mi ticket',
            '👉 *discord* unirte al discord',
        ],
        null,
        null,
        [flowDocs, flowStringAlternative, flowTuto, flowDiscord]
    )

const main = async () => {
    
    const adapterDB = new JsonFileAdapter()
    const adapterFlow = createFlow([flowPrincipal])
    const adapterProvider = createProvider(BaileysProvider)

    createBot({
        flow: adapterFlow,
        provider: adapterProvider,
        database: adapterDB,
    })

    QRPortalWeb()
}

main()
