export type CarPropsType = {
    name: string;
    color: string;
    id?: number;
}
export type WinnerPropsType = {
    id?: number;
    wins: number;
    time: number;
}
export type WinnerTablePropsType = {
    id: number;
    time: number;
    wins: number;
    name: string;
    color: string;
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
    startStopEngine(id: number | undefined, status: string) {
        return fetch(`${this.baseUrl}/engine?id=${id}&status=${status}`, {
            method: 'PATCH',
        })
            .then((response) => response.json())
            .then((data) => data)
            .catch((err) => new Error(err));
    },
    switchCarDrive(id: number | undefined, status: string) {
        return fetch(`${this.baseUrl}/engine?id=${id}&status=${status}`, {
            method: 'PATCH',
        })
            .then(response => {
                if (response.status === 500) {
                    throw new Error(`Server error: ${response.status}`);
                }
                return response.json();
            })
            .then(data => data)
            .catch(err => {
                throw new Error(err);
            })
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
    },
    postWinner(data: WinnerPropsType) {
        return fetch(`${this.baseUrl}/winners`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
    },
    getWinners() {
        return fetch(`${this.baseUrl}/winners`)
            .then((response) => response.json())
            .then((data) => data)
            .catch((err) => new Error(err));
    },
    getWinnersPage(page: number) {
        return fetch(`${this.baseUrl}/winners?_page=${page}&_limit=7`)
            .then((response) => response.json())
            .then((data) => data)
            .catch((err) => new Error(err));
    },
}