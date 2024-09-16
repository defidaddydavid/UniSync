// background.js

// Connect to Ethereum WebSocket provider (replace with your Alchemy or Infura WebSocket URL)
const ws = new WebSocket('wss://eth-mainnet.alchemyapi.io/v2/yourAlchemyAPIKey'); // Replace with your Alchemy API key

ws.onopen = () => {
  console.log('WebSocket connection established with Ethereum node');

  // Subscribe to logs for a specific account (leader wallet address)
  const subscribeToLogs = JSON.stringify({
    "jsonrpc": "2.0",
    "id": 1,
    "method": "eth_subscribe",
    "params": [
      "logs", 
      {
        "address": "0xYourLeaderWalletAddress", // Replace with the leader wallet address
        "topics": [] // Optional: Filter for specific event topics (empty array for all logs)
      }
    ]
  });

  ws.send(subscribeToLogs);
};

ws.onmessage = (event) => {
  const data = JSON.parse(event.data);

  // Check for subscription confirmations or new logs
  if (data.method === "eth_subscription") {
    const log = data.params.result;
    console.log("Log received for the account:", log);

    // Add your logic here to handle changes in the account's state, such as transactions
    // For example, you can check if a new transaction was made and replicate it.
  } else if (data.result && data.id === 1) {
    console.log("Successfully subscribed with subscription ID:", data.result);
    // Store this subscription ID if needed for later unsubscribe
  }
};

ws.onclose = () => {
  console.log('WebSocket connection closed');
};

ws.onerror = (error) => {
  console.error('WebSocket encountered an error:', error);
};

// Service Worker for Chrome Extension
chrome.runtime.onInstalled.addListener(() => {
  console.log('Service worker activated by onInstalled event.');
  // Additional installation logic here if necessary
});
