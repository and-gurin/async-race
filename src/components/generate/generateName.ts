const generateName = (): string => {
    const brand: string[] = ['Peugeot', 'Citroen', 'Renault', 'Opel', 'DS', 'Seat', 'Mitsubishi', 'Mini', 'Nissan', 'Fiat', 'Chevrolet'];
    const model: string[] = ['Partner', 'Picasso', 'Clio', 'Adam', 'Cactus', 'Altea', 'Charisma', 'One', 'Pathfinder', 'Bravo', 'Equinox', 'Tahoe'];
    return `${brand[Math.floor((Math.random() * brand.length))]} ${model[Math.floor((Math.random() * model.length))]}`
};

export default generateName; 
