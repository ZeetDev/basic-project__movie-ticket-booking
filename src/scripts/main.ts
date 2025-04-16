import '../styles/style.css';

const allSeats = document.querySelector<HTMLDivElement>('.all-seats')!;
const seats = document.querySelectorAll<HTMLDivElement>('.row .seat:not(.occupied)')!;
const count = document.querySelector<HTMLSpanElement>('#count')!;
const total = document.querySelector<HTMLSpanElement>('#total')!;
const movieSelect = document.querySelector<HTMLSelectElement>('#movie-select')!;

movieSelect.addEventListener('change', () => {
    countSelectedSeats();
});

allSeats.addEventListener('click', (e) => {
    const element = e.target as HTMLElement;
    if (element.classList.contains('seat') && !element.classList.contains('occupied')) {
        element.classList.toggle('selected');
        countSelectedSeats();
    }
});

function countSelectedSeats() {
    const selectedSeats = allSeats.querySelectorAll<HTMLDivElement>('.seat.selected');
    if (selectedSeats) {
        const seatLength = selectedSeats.length;
        count.innerText = seatLength.toString();
        total.innerText = `$${seatLength * parseInt(movieSelect.value)}`;
    }
}
