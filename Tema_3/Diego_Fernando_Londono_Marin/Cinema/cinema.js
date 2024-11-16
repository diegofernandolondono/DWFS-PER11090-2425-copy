// Inicializar matriz de sillas
const rows = 10;
const cols = 10;
const seats = [];
const cinemaSeats = document.getElementById('cinema-seats');

for (let i = 0; i < rows; i++) {
    const row = [];
    for (let j = 0; j < cols; j++) {
        const id = i * cols + j;
        const seat = { id, state: Math.random() < 0.2 }; // 20% ocupadas inicialmente
        row.push(seat);

        // Crear el asiento visual
        const seatDiv = document.createElement('div');
        seatDiv.classList.add('silla');
        seatDiv.dataset.id = id;
        seatDiv.addEventListener('click', () => toggleSeatState(seat, seatDiv)); // Actualizar estado al hacer clic
        cinemaSeats.appendChild(seatDiv);
    }
    seats.push(row);
}

// Alternar el estado de un asiento (libre/seleccionado)
function toggleSeatState(seat, seatDiv) {
    if (seat.state) return; // No permitir seleccionar asientos reservados

    seatDiv.classList.toggle('seleccionada');
}

// Algoritmo suggest
function suggest(numSeats) {
    if (numSeats > cols) return new Set();

    for (let i = rows - 1; i >= 0; i--) {
        let consecutive = 0;
        let startIndex = -1;
        for (let j = 0; j < cols; j++) {
            if (!seats[i][j].state) {
                if (consecutive === 0) startIndex = j;
                consecutive++;
                if (consecutive === numSeats) {
                    const selectedSeats = new Set();
                    for (let k = startIndex; k < startIndex + numSeats; k++) {
                        selectedSeats.add(seats[i][k].id);
                        seats[i][k].state = true; // Marcar asiento como reservado
                    }
                    return selectedSeats;
                }
            } else {
                consecutive = 0;
            }
        }
    }
    return new Set();
}

// Interacción con formulario
document.getElementById('numeroSillas').addEventListener('input', (e) => {
//document.getElementById('reservation-form').addEventListener('submit', (e) => {
    e.preventDefault();
    //const numSeats = parseInt(e.target.value);

    const numSeats = parseInt(document.getElementById('numeroSillas').value);

    // Obtener las sillas seleccionadas manualmente
    const manuallySelectedSeats = document.querySelectorAll('.silla.seleccionada');

    // Si hay sillas seleccionadas manualmente
    if (manuallySelectedSeats.length > 0) {
        if (manuallySelectedSeats.length !== numSeats) {
//            alert(`Seleccionaste ${manuallySelectedSeats.length} asiento(s). Asegúrate de seleccionar exactamente ${numSeats} asiento(s).`);
            document.getElementById("Mensaje").innerHTML = `Seleccionaste ${manuallySelectedSeats.length} asiento(s). Asegúrate de seleccionar exactamente ${numSeats} asiento(s).`
            return;
        }
        manuallySelectedSeats.forEach(seatDiv => {
            seatDiv.classList.add('reservada');
            seatDiv.classList.remove('seleccionada');
            const id = parseInt(seatDiv.dataset.id);
            const row = Math.floor(id / cols);
            const col = id % cols;
            seats[row][col].state = true; // Marcar como reservado en la matriz
        });
        document.getElementById("Mensaje").innerHTML = `Reserva confirmada para ${manuallySelectedSeats.length} asiento(s): ${[...manuallySelectedSeats].map(seat => seat.dataset.id).join(', ')}.`
//        alert(`Reserva confirmada para ${manuallySelectedSeats.length} asiento(s): ${[...manuallySelectedSeats].map(seat => seat.dataset.id).join(', ')}.`);
        return;
    }

    // Si no hay sillas seleccionadas manualmente, usar el algoritmo suggest
    const suggestedSeats = suggest(numSeats);
    if (suggestedSeats.size === 0) {
        document.getElementById("Mensaje").innerHTML = 'No hay suficientes asientos disponibles juntos.'
//        alert('No hay suficientes asientos disponibles juntos.');
    } else {
        suggestedSeats.forEach(id => {
            const seatDiv = document.querySelector(`.silla[data-id="${id}"]`);
            seatDiv.classList.add('seleccionada');
            seatDiv.classList.add('reservada');
            seatDiv.classList.remove('seleccionada');
        });
        document.getElementById("Mensaje").innerHTML = `Reserva confirmada para ${suggestedSeats.size} asiento(s): ${[...suggestedSeats].join(', ')}.`
//        alert(`Reserva confirmada para ${suggestedSeats.size} asiento(s): ${[...suggestedSeats].join(', ')}.`);
    }
});