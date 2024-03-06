// popup.js
document.addEventListener('DOMContentLoaded', function() {
    const addWalletBtn = document.getElementById('add-wallet');
    const configureBtn = document.getElementById('configure');
    const walletsList = document.getElementById('wallets-list');
  
    // Mock list of connected wallets
    const wallets = ['Wallet 1', 'Wallet 2']; // Replace with actual wallet data
  
    // Function to populate wallets list
    function populateWallets() {
      walletsList.innerHTML = ''; // Clear existing list
      wallets.forEach(wallet => {
        const walletDiv = document.createElement('div');
        walletDiv.className = 'wallet';
        walletDiv.textContent = wallet;
        walletsList.appendChild(walletDiv);
      });
    }
  
    // Function to add new wallet
    function addWallet() {
      // Logic to add new wallet
      // For simplicity, we're just adding a mock wallet
      wallets.push(`Wallet ${wallets.length + 1}`);
      populateWallets();
    }
  
    // Function to open configuration settings
    function openConfigurationSettings() {
      // Clear the wallets list and show configuration options
      walletsList.innerHTML = '';
      wallets.forEach((wallet, index) => {
        const walletConfigDiv = document.createElement('div');
        walletConfigDiv.className = 'wallet-config';
        
        const walletLabel = document.createElement('span');
        walletLabel.textContent = wallet;
        walletConfigDiv.appendChild(walletLabel);
        
        const leaderRadioBtn = document.createElement('input');
        leaderRadioBtn.setAttribute('type', 'radio');
        leaderRadioBtn.setAttribute('name', 'leader-wallet');
        leaderRadioBtn.setAttribute('value', wallet);
        leaderRadioBtn.id = `leader-${index}`;
        walletConfigDiv.appendChild(leaderRadioBtn);
  
        const leaderLabel = document.createElement('label');
        leaderLabel.textContent = 'Leader';
        leaderLabel.setAttribute('for', `leader-${index}`);
        walletConfigDiv.appendChild(leaderLabel);
  
        // ... Add follower checkbox and risk management inputs similarly
  
        walletsList.appendChild(walletConfigDiv);
      });
  
      // Add save button for configurations
      const saveConfigBtn = document.createElement('button');
      saveConfigBtn.textContent = 'Save Configuration';
      saveConfigBtn.addEventListener('click', saveConfiguration);
      walletsList.appendChild(saveConfigBtn);
    }
  // Add to your popup.js

// Function to load wallets from storage and display them
function loadWallets() {
    // This should load the wallets from local storage or a background script
    const wallets = []; // Replace with actual loading logic
    const walletListElement = document.getElementById('wallet-list');
    walletListElement.innerHTML = ''; // Clear the list first
  
    wallets.forEach(wallet => {
      const walletItem = document.createElement('li');
      walletItem.textContent = wallet; // Display the wallet info
      walletListElement.appendChild(walletItem);
    });
  }
  
  // Event listener for the 'Add Wallet' button
  document.getElementById('add-wallet').addEventListener('click', () => {
    document.getElementById('add-wallet-form').style.display = 'block'; // Show the add wallet form
  });
  
  // Event listener for the 'Save Wallet' button
  document.getElementById('save-wallet').addEventListener('click', () => {
    const walletAddress = document.getElementById('wallet-address-input').value;
    if(walletAddress) {
      // Save the new wallet address
      // This should include logic to save to local storage or communicate with the background script
      loadWallets(); // Refresh the list of wallets
    }
  });
  
  // Initial load of wallets
  loadWallets();
  
    // Function to save configuration settings
    function saveConfiguration() {
      // Logic to save the selected leader and followers and their risk settings
      // This may involve storing the settings in the browser's local storage or sending them to a server
      const selectedLeader = document.querySelector('input[name="leader-wallet"]:checked').value;
      // ... Gather information about selected followers and risk settings
      
      console.log(`Selected leader wallet: ${selectedLeader}`);
      // ... Save configuration logic here
  
      // After saving, you might want to repopulate the wallets list or give some confirmation to the user
    }
  
    // Event listeners for buttons
    addWalletBtn.addEventListener('click', addWallet);
    configureBtn.addEventListener('click', openConfigurationSettings);
  
    // Initially populate the list of wallets
    populateWallets();
  });
  