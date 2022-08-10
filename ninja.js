class Ninja {
    constructor(query){
        this.apiKey = "<Your_api_key>";
        this.query = query;
    }

    async getResponse(){
        const response = await fetch(
            `https://api.calorieninjas.com/v1/nutrition?query=${this.query}`,
            {
                method: 'GET',
                headers: {
                    'X-Api-Key': this.apiKey,
                },
            }
        );
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data;
    }
}