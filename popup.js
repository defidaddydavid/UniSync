// popup.js
document.addEventListener('DOMContentLoaded', function() {
  const addWalletBtn = document.getElementById('add-wallet');
  const configureBtn = document.getElementById('configure');
  const walletsList = document.getElementById('wallets-list');
  const walletForm = document.getElementById('add-wallet-form');
  const walletInput = document.getElementById('wallet-address-input');
  const saveWalletBtn = document.getElementById('save-wallet');
  
  // Load wallets from local storage or initialize an empty array
  let wallets = JSON.parse(localStorage.getItem('wallets')) || [];

  // Function to populate wallets list
  function populateWallets() {
    walletsList.innerHTML = ''; // Clear existing list
    wallets.forEach((wallet, index) => {
      const walletDiv = document.createElement('div');
      walletDiv.className = 'wallet';
      walletDiv.textContent = wallet;

      const removeWalletBtn = document.createElement('button');
      removeWalletBtn.textContent = 'Remove';
      removeWalletBtn.addEventListener('click', () => removeWallet(index));

      walletDiv.appendChild(removeWalletBtn);
      walletsList.appendChild(walletDiv);
    });
  }

  // Function to add a new wallet
  function addWallet() {
    const walletAddress = walletInput.value.trim();
    if (walletAddress) {
      wallets.push(walletAddress);
      localStorage.setItem('wallets', JSON.stringify(wallets));
      walletInput.value = ''; // Clear input field
      populateWallets();
    } else {
      alert('Please enter a valid wallet address.');
    }
  }

  // Function to remove a wallet
  function removeWallet(index) {
    wallets.splice(index, 1);
    localStorage.setItem('wallets', JSON.stringify(wallets));
    populateWallets();
  }

  // Function to open configuration settings
  function openConfigurationSettings() {
    walletsList.innerHTML = ''; // Clear existing list for configuration
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

      const followerCheckbox = document.createElement('input');
      followerCheckbox.setAttribute('type', 'checkbox');
      followerCheckbox.setAttribute('name', 'follower-wallet');
      followerCheckbox.setAttribute('value', wallet);
      followerCheckbox.id = `follower-${index}`;
      walletConfigDiv.appendChild(followerCheckbox);

      const followerLabel = document.createElement('label');
      followerLabel.textContent = 'Follower';
      followerLabel.setAttribute('for', `follower-${index}`);
      walletConfigDiv.appendChild(followerLabel);

      const riskInput = document.createElement('input');
      riskInput.setAttribute('type', 'number');
      riskInput.setAttribute('placeholder', 'Risk %');
      riskInput.id = `risk-${index}`;
      walletConfigDiv.appendChild(riskInput);

      walletsList.appendChild(walletConfigDiv);
    });

    const saveConfigBtn = document.createElement('button');
    saveConfigBtn.textContent = 'Save Configuration';
    saveConfigBtn.addEventListener('click', saveConfiguration);
    walletsList.appendChild(saveConfigBtn);
  }

  // Function to save configuration settings
  function saveConfiguration() {
    const selectedLeader = document.querySelector('input[name="leader-wallet"]:checked');
    if (!selectedLeader) {
      alert('Please select a leader wallet.');
      return;
    }

    const leaderWallet = selectedLeader.value;
    const followerWallets = Array.from(document.querySelectorAll('input[name="follower-wallet"]:checked'))
      .map(input => input.value);

    const riskSettings = followerWallets.reduce((acc, wallet, index) => {
      const riskValue = document.getElementById(`risk-${index}`).value;
      acc[wallet] = riskValue || '0'; // Set default risk value to 0 if not provided
      return acc;
    }, {});

    const configuration = {
      leaderWallet,
      followerWallets,
      riskSettings
    };

    // Store configuration in local storage
    localStorage.setItem('walletConfiguration', JSON.stringify(configuration));

    console.log('Configuration saved:', configuration);
    alert('Configuration saved successfully!');
    populateWallets();
  }

  // Function to load wallets from local storage and display them
  function loadWallets() {
    wallets = JSON.parse(localStorage.getItem('wallets')) || [];
    populateWallets();
  }

  // Event listener for the 'Add Wallet' button
  addWalletBtn.addEventListener('click', () => {
    walletForm.style.display = 'block'; // Show the add wallet form
  });

  // Event listener for the 'Save Wallet' button
  saveWalletBtn.addEventListener('click', () => {
    addWallet();
    walletForm.style.display = 'none'; // Hide the add wallet form after saving
  });

  // Event listener for 'Configure' button
  configureBtn.addEventListener('click', openConfigurationSettings);

  // Initial load of wallets
  loadWallets();
});
