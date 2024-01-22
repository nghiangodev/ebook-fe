const BASE_URL = import.meta.env.VITE_API_URL;

async function callApi(url, method, header, body) {
    try {
        const options = {
            method: method,
            header: header,
            body: body,
            redirect: 'follow'
        }

        const response = await fetch(`${BASE_URL}${url}`, options);

        if (!response.ok) {
            throw new Error('Network response was not ok.');
        }

        return response.json();
    } catch (error) {
        throw new Error(`Error fetching data: ${error.message}`);
    }
}

export default callApi;
