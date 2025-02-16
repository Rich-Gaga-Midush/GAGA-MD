const { zokou } = require("../framework/zokou");
const ai = require('unlimited-ai');
const fs = require('fs');

zokou({
  nomCom: "darkgpt",
  aliases: ["gpt4", "ai"],
  reaction: '🚇',
  categorie: "AI"
}, async (dest, zk, params) => {
  const { repondre, arg } = params;
  const alpha = arg.join(" ").trim();

  if (!alpha) {
    return repondre("Please provide a message.");
  }

  const text = alpha;

  // Load previous conversation from store.json, if it exists
  let conversationData = [];
  try {
    const rawData = fs.readFileSync('store.json');
    conversationData = JSON.parse(rawData);
  } catch (err) {
    console.log('No previous conversation found, starting new one.');
  }

  try {
    const model = 'gpt-4-turbo-2024-04-09';
    const userMessage = { role: 'user', content: text };
    const systemMessage = { role: 'system', content: 'You are an assistant in WhatsApp. You are called Keith. You respond to user commands.' };

    // Add user input and system message to the conversation data
    conversationData.push(userMessage);
    conversationData.push(systemMessage);

    // Get AI response from the model
    const aiResponse = await ai.generate(model, conversationData);

    // Add AI response to the conversation data
    conversationData.push({ role: 'assistant', content: aiResponse });

    // Write the updated conversation data to store.json
    fs.writeFileSync('store.json', JSON.stringify(conversationData, null, 2));

    await zk.sendMessage(dest, {
      text: aiResponse,
      contextInfo: {
        externalAdReply: {
          title: "DARKGPT AI TOOL",
          body: `Enjoy`,
          thumbnailUrl: "https://files.catbox.moe/oznlsw.jpg", // Replace with your bot profile photo URL
          sourceUrl: "https://whatsapp.com/channel/0029VasnifMFi8xW4Mqysn2F", // Your channel URL
          mediaType: 1,
          showAdAttribution: true, // Verified badge
        },
      },
    });

  } catch (error) {
    console.error("Error generating AI response:", error);
    await repondre("Sorry, I couldn't process your request.");
  }
});

zokou({
  nomCom: "chatgpt",
  aliases: ["gpt4", "ai"],
  reaction: '🚇',
  categorie: "AI"
}, async (dest, zk, params) => {
  const { repondre, arg } = params;  // Use args for the command arguments
  const alpha = arg.join(" ").trim(); // Assuming args is an array of command parts

  if (!alpha) {
    return repondre("Please provide a song name.");
  }

  const text = alpha;  // Set the text that will be passed to the AI

  try {
    const model = 'gpt-4-turbo-2024-04-09'; 

    const messages = [
      { role: 'user', content: text },
      { role: 'system', content: 'You are an assistant in WhatsApp. You are called Keith. You respond to user commands.' }
    ];

    const response = await ai.generate(model, messages);

    await zk.sendMessage(dest, {
      text: response,
      contextInfo: {
        externalAdReply: {
          title: "XGAGA BOTS AI SEARCH",
          body: `keep learning`, // Format the uptime before sending
          thumbnailUrl: "https://files.catbox.moe/oznlsw.jpg", // Replace with your bot profile photo URL
          sourceUrl: "https://whatsapp.com/channel/0029VasnifMFi8xW4Mqysn2F", // Your channel URL
          mediaType: 1,
          showAdAttribution: true, // Verified badge
        },
      },
    });

  } catch (error) {
    console.error("Error generating AI response:", error);
    await repondre("Sorry, I couldn't process your request.");
  }
});

zokou({
  nomCom: "gemini",
  aliases: ["gpto4", "gemni", "gpt2", "gpt3"],
  reaction: '🚇',
  categorie: "AI"
}, async (dest, zk, params) => {
  const { repondre, arg } = params;
  const elementQuery = arg.join(" ").trim(); // Use 'arg' to capture the user query

  // Check if elementQuery is empty
  if (!elementQuery) {
    return repondre("Please provide a song name.");
  }

  try {
    // Dynamically import Gemini AI
    const { default: Gemini } = await import('gemini-ai');
    const gemini = new Gemini("AIzaSyCFn-iaA6z0A_doO7hxKhGbIZtCpxZDycE");

    const chat = gemini.createChat();

    // Ask Gemini AI for a response
    const res = await chat.ask(elementQuery);

    await zk.sendMessage(dest, {
      text: res,
      contextInfo: {
        externalAdReply: {
          title: "XGAGA-BOTS GEMINI",
          body: `Keep using AI`, // Format the uptime before sending
          thumbnailUrl: "https://files.catbox.moe/oznlsw.jpg", // Replace with your bot profile photo URL
          sourceUrl: "https://whatsapp.com/channel/0029VasnifMFi8xW4Mqysn2F", // Your channel URL
          mediaType: 1,
          showAdAttribution: true, // Verified badge
        },
      },
    });

  } catch (e) {
    // Handle errors by sending a message to the user
    await repondre("I am unable to generate responses\n\n" + e.message);
  }
});
