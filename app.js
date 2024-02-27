// const express = require('express');
// const bodyParser = require('body-parser');
// const { GoogleGenerativeAI } = require("@google/generative-ai");
// const fs = require("fs");
// const { API_KEY_GEMINI } = require('./config');

// const genAI = new GoogleGenerativeAI(API_KEY_GEMINI);
// const app = express();

// // Middleware para analizar el cuerpo de la solicitud JSON
// app.use(bodyParser.json());

// // Ruta POST para manejar la solicitud con la imagen codificada en base64
// app.post('/process-image', async (req, res) => {
//   try {
//     const imageData = req.body.image;
//     if (!imageData) {
//       return res.status(400).json({ error: 'Image data is required' });
//     }

//     const resultText = await run(imageData);
//     res.json({ result: resultText });
//   } catch (error) {
//     console.error('Error processing image:', error);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// });

// async function run(imageData) {
//   const model = genAI.getGenerativeModel({ model: "gemini-pro-vision" });
//   const objeto = "llantas";
//   const prompt = `Responde con Sí o con No en caso de que se encuentre o no se encuentre el objeto por el que te preguntan. ¿En la imagen hay un ${objeto}?`;

//   // const imageBuffer = Buffer.from(imageData, 'base64');

//   const imageParts = [
//     {
//       inlineData: {
//        data:imageData,  // data: imageBuffer.toString("base64"),
//         mimeType: "image/jpeg"
//       }
//     }
//   ];

//   const result = await model.generateContent([prompt, ...imageParts]);
//   const response = await result.response;
//   const text = await response.text();
//   return text;
// }

// // Inicia el servidor en el puerto 3000
// const PORT =3000;
// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });



// const express = require('express');
// const bodyParser = require('body-parser');
// const { GoogleGenerativeAI } = require("@google/generative-ai");
// const fs = require("fs");
// const { API_KEY_GEMINI } = require('./config')


// const genAI = new GoogleGenerativeAI(API_KEY_GEMINI);
// const app = express();
// // // Middleware para analizar el cuerpo de la solicitud JSON
// app.use(bodyParser.json());


// app.post('/process-image', async (req, res) => {
//   try {
//     const imageData = req.body.image;
//     if (!imageData) {
//       return res.status(400).json({ error: 'Image data is required' });
//     }

//     const resultText = await run(imageData);
//     res.json({ result: resultText });
//   } catch (error) {
//     console.error('Error processing image:', error);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// });

// function fileToGenerativePart(path, mimeType) {
//   return {
//     inlineData: {
//       data: Buffer.from(fs.readFileSync(path)).toString("base64"),
//       mimeType
//     },
//   };
// }

// async function run(imageData) {
//   const model = genAI.getGenerativeModel({ model: "gemini-pro-vision" });
//   objeto = "Coche"
//   prompt = `Responde con Sí o con No en caso de que se encuentre o no se encuentre el objeto por el que te preguntan. ¿ En la imagen hay un ${objeto} ?`

//  const imageParts = [
    
//     fileToGenerativePart(imageData,"image/jpeg")
//      ];




//   // const imageParts = [
//   //   {
//   //     inlineData: {
//   //       data:imageData,
//   //       mimeType:"image/jpeg"
//   //     },
//   //   } ];

//   const result = await model.generateContent([prompt, ...imageParts]);
//   const response = await result.response;
//   const text = response.text();
//   console.log(text);
// }

// // // Inicia el servidor en el puerto 3000
// const PORT =3000;
// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });


const express = require('express');
const bodyParser = require('body-parser');
const { GoogleGenerativeAI } = require("@google/generative-ai");
const fs = require("fs");
const { API_KEY_GEMINI } = require('./config')

const genAI = new GoogleGenerativeAI(API_KEY_GEMINI);
const app = express();

app.use(bodyParser.json());

app.post('/process-image', async (req, res) => {
  try {
    const imageDataPath = req.body.imagePath;
    if (!imageDataPath) {
      return res.status(400).json({ error: 'Image path is required' });
    }

    const resultText = await run(imageDataPath);
    res.json({ result: resultText });
  } catch (error) {
    console.error('Error processing image:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

async function run(imageDataPath) {
  const model = genAI.getGenerativeModel({ model: "gemini-pro-vision" });
  const objeto = "";
  const prompt = `Responde con Sí es una imagen es inapropiada o con No en caso de que la image sea apropiada y no tenga contenido explicito el objeto por el que te preguntan. ¿En la imagen hay un ${objeto} de estas caracterisiticas?`;

  const imageParts = [
    fileToGenerativePart(imageDataPath,"image/jpeg")
  ];

  const result = await model.generateContent([prompt, ...imageParts]);
  const response = await result.response;
  const text = response.text();
  console.log(text);
}

function fileToGenerativePart(path, mimeType) {
  // Lee el archivo desde la ruta proporcionada
  return {
    inlineData: {
      data: Buffer.from(fs.readFileSync(path)).toString("base64"),
      mimeType
    },
  };
}

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
