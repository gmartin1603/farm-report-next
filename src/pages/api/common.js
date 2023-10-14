
const baseUrl = `${process.env.NEXT_PUBLIC_API_URL}`;

const commonAPI = (param, data) => {
    return new Promise((resolve, reject) => {
        fetch(`${baseUrl}/${param}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        })
            .then((res) => res.json())
            .then((res) => {
                resolve(res);
            })
            .catch((err) => {
                reject(err);
            });
    });
}

export default commonAPI;
