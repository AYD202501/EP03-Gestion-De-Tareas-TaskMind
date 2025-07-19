/* eslint-disable @typescript-eslint/no-explicit-any */

// Función auxiliar para realizar peticiones POST genéricas
const makePost = (url: string, body: string, options: { headers?: Record<string, string> }) => {
  const headers = options.headers || {};  // Si no se proporcionan headers, se usa un objeto vacío
  return fetch(url, {
    body,              // Cuerpo de la petición (puede ser JSON u otro formato)
    headers,           // Headers personalizados
    method: 'POST',    // Método HTTP POST
  }).then((res) => {   // Al resolver la promesa:
    if (res.statusText === 'No Content') {  // Si la respuesta indica que no hay contenido:
      return res;                            // Retorna la respuesta cruda
    }
    return res.json();  // Si hay contenido, devuelve la respuesta parseada como JSON
  });
};

// Función auxiliar para realizar peticiones POST con cuerpo JSON
const makeJSONPost = (url: string, data: any, options: { headers: Record<string, string> }) => {
  const body = JSON.stringify(data);       // Serializa el objeto de datos a JSON
  const headers = options.headers || {};   // Usa headers personalizados o vacío si no se pasa ninguno
  headers['Content-Type'] = 'application/json';  // Asegura el header de tipo JSON

  return makePost(url, body, { headers });  // Llama a makePost con el cuerpo JSON y los headers
};

// Función para obtener lista de usuarios desde el backend
export const getUsers = async () => {
  try {
    const res = await fetch('/api/user', {  // Realiza una petición GET a la API local
      method: 'GET',
      headers: {
        'Content-Type': 'application/json', // Indica que se espera respuesta JSON
      },
    });
    if (!res.ok) {  // Si la respuesta no fue exitosa:
      throw new Error('Failed to fetch users');  // Lanza un error
    }
    return res.json();  // Devuelve los datos de usuarios como JSON
  } catch (error) {     // Manejo de errores
    console.error('Error fetching users:', error);
    throw error;
  }
};

// Función para obtener un token de Auth0
export const getAuth0Token = async () => {
  const options = {
    method: 'POST',      // Método POST
    headers: {
      cookie:            // Header con cookie (fijada en este código)
        'did=s%253Av0%253Ae7a62f01-2147-453b-b564-6319ff155212.B29T4jO9N3TeNbGNRJTCzFr2PUNsSgyzE4Y3%252B2n98Hk; did_compat=s%253Av0%253Ae7a62f01-2147-453b-b564-6319ff155212.B29T4jO9N3TeNbGNRJTCzFr2PUNsSgyzE4Y3%252B2n98Hk',
      'Content-Type': 'application/json',  // Tipo JSON
    },
    body: '{"client_id":"a4W0w701SsYcEWYeBGpQl6gsGsJxZdA2","client_secret":"G2Zj9nP_OU9PbxvGDCeGEwYQhUkYlpLQAyDm1KeP73xsvOCCK23Fo6eksqHd5gWV","audience":"https://inventarios20242.us.auth0.com/api/v2/","grant_type":"client_credentials"}',
    // El body contiene las credenciales del cliente y la información necesaria para solicitar el token
  };

  const res = fetch('https://inventarios20242.us.auth0.com/oauth/token', options).then((res) =>
    res.json()   // Devuelve la respuesta como JSON (token de acceso)
  );
  return res;    // Devuelve la promesa resuelta
};

// Función para crear un usuario en Auth0 usando el token obtenido
export const createAuth0User = async (data: any, token: any, tokenType: any) => {
  const url = `https://inventarios20242.us.auth0.com/api/v2/users`;  // Endpoint de creación de usuarios
  const headers = {
    Authorization: `${tokenType} ${token}`,  // Usa el token como header de autorización
  };
  const body = data;                         // El cuerpo es el objeto con datos del nuevo usuario
  return makeJSONPost(url, body, { headers });  // Hace el POST como JSON
};

// Función para crear un usuario en la API local del sistema
export const createUser = (data: any) => {
  const url = `/api/auth0`;                  // Endpoint local
  const body = { data };                     // El cuerpo se envuelve como objeto { data }
  return makeJSONPost(url, body, { headers: {} });  // POST vacío de headers adicionales
};
