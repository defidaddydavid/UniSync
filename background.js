// background.js

const ws = new WebSocket('wss://solana-devnet.g.alchemy.com/v2/SiV6ILyj3Kx6DQ9x6Xbppb-74J3eI9w8');

ws.onopen = () => {
  console.log('WebSocket connection established with Alchemy Solana node');

  // Construct and send a subscription message to monitor a specified account
  const subscribeToAccount = JSON.stringify({
    "jsonrpc": "2.0",
    "id": 1,
    "method": "accountSubscribe",
    "params": [
      "ETpuBkvW1pX4VtT46AZbgXZMpAK8AUQsjNWtZxDAe7M3",  // Replace with the leader wallet's public key in base58 encoding
      {"encoding": "jsonParsed"}
    ]
  });

  ws.send(subscribeToAccount);
};

ws.onmessage = (event) => {
  const { result, method } = JSON.parse(event.data);

  if (method === "accountNotification") {
    const { value } = result;
    console.log("Notification for account:", value);
    // Add your logic here to handle the change notification
    // For example, checking the account's transaction history and replicating the trades
  } else if (method === "subscription") {
    const { subscription } = result;
    console.log("Subscribed to account with subscription ID:", subscription);
    // Store this subscription ID if you need to unsubscribe later
  }
};

ws.onclose = () => {
  console.log('WebSocket connection closed');
};

ws.onerror = (error) => {
  console.error('WebSocket encountered an error:', error);
};
// background.js (service worker)
chrome.runtime.onInstalled.addListener(() => {
    console.log('Service worker activated by onInstalled event.');
    // Additional installation logic here...
  });
  