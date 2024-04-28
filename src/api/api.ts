export type CarPropsType = {
    name: string;
    color: string;
    id?: number;
}
export const AsyncRaceAPI = {
    baseUrl: 'http://localhost:3000',
    getCar(id: number) {
        return fetch(`${this.baseUrl}/garage/${id}`)
            .then((response) => response.json())
            .then((data) => data)
            .catch((err) => new Error(err));
    },
    getCars() {
        return fetch(`${this.baseUrl}/garage`)
            .then((response) => response.json())
            .then((data) => data)
            .catch((err) => new Error(err));
    },
    getCarsPage(page: number) {
        return fetch(`${this.baseUrl}/garage?_page=${page}&_limit=7`)
            .then((response) => response.json())
            .then((data) => data)
            .catch((err) => new Error(err));
    },
    updateCar(id: number | undefined, data: { name: string; color: string }) {
        return fetch(`${this.baseUrl}/garage/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
    },
    startOrStopCar(id: number, status: string) {
        return fetch(`${this.baseUrl}/engine?id=${id}&status=${status}`, {
            method: 'PATCH',
        })
            .then((response) => response.json())
            .then((data) => data)
            .catch((err) => new Error(err));
    },
    switchCar(id: number, status: string) {
        return fetch(`${this.baseUrl}/engine?id=${id}&status=${status}`, {
            method: 'PATCH',
        })
            .then((response) => response.json())
            .then((data) => data)
            .catch((err) => new Error(err));
    },
    removeCar(id: number | undefined) {
        return  fetch(`${this.baseUrl}/garage/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
        });
    },
    postCar(data: CarPropsType) {
        return fetch(`${this.baseUrl}/garage`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
    }
}