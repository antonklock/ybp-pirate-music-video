self.onmessage = async function (event) {
  const { url, action } = event.data;

  if (action === 'fetchSegment') {
    try {
      const response = await fetch(url);
      const data = await response.arrayBuffer();
      self.postMessage({ data });
    } catch (error) {
      self.postMessage({ error: error.message });
    }
  }
};