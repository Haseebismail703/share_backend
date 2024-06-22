async function ip() {
    try {
      const response = await fetch('https://api.ipify.org?format=json');
      if (!response.ok) {
        throw new Error('Failed to fetch public IP');
      }
      const data = await response.json();
      return data.ip;
    } catch (error) {
      console.error('Error fetching public IP:', error.message);
      return null;
    }
  }
export  {ip}