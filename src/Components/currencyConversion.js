import axios from 'axios';

export async function convertNairaToSol(nairaAmount) {
  try {
    // Get the current exchange rate from an API
    const response = await axios.get('https://api.coingecko.com/api/v3/simple/price?ids=solana&vs_currencies=ngn');
    const exchangeRate = response.data.solana.ngn;

    // Convert Naira to SOL
    const solAmount = nairaAmount / exchangeRate;

    return solAmount;
  } catch (error) {
    console.error('Error fetching exchange rate:', error);
    throw error;
  }
}