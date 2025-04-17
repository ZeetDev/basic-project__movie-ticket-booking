import '../styles/style.css';

const allSeats = document.querySelector<HTMLDivElement>('.all-seats')!;
const seats = document.querySelectorAll<HTMLDivElement>('.row .seat:not(.occupied)')!;
const count = document.querySelector<HTMLSpanElement>('#count')!;
const total = document.querySelector<HTMLSpanElement>('#total')!;
const movieSelect = document.querySelector<HTMLSelectElement>('#movie-select')!;

// consent
const SEATS_STORAGE_KEY = 'selected-seats';
const MOVIE_STORAGE_KEY = 'selected-movie';
const PRICE_STORAGE_KEY = 'selected-price';

let ticketPrice: number;
let movieIndex: number;

movieSelect.addEventListener('change', () => {
    ticketPrice = parseInt(movieSelect?.value?.trim());
    movieIndex = movieSelect.selectedIndex;

    localStorage.setItem(MOVIE_STORAGE_KEY, JSON.stringify(movieIndex));
    localStorage.setItem(PRICE_STORAGE_KEY, JSON.stringify(ticketPrice));

    countSelectedSeats();
    displayData();
});

allSeats.addEventListener('click', (e) => {
    const element = e.target as HTMLElement;
    if (element.classList.contains('seat') && !element.classList.contains('occupied')) {
        element.classList.toggle('selected');
        countSelectedSeats();
    }
    displayData();
});

function countSelectedSeats() {
    const selectedSeats = allSeats.querySelectorAll<HTMLDivElement>('.seat.selected');
    const selectedSeatIndex = [...selectedSeats].map((item) => [...seats].indexOf(item));
    localStorage.setItem(SEATS_STORAGE_KEY, JSON.stringify(selectedSeatIndex));
    displayData();
}

function displayData() {
    const selectedSeats = JSON.parse(localStorage.getItem(SEATS_STORAGE_KEY) || '[]');
    const selectedMovie = JSON.parse(localStorage.getItem(MOVIE_STORAGE_KEY) || '');
    const ticketPrice = JSON.parse(localStorage.getItem(PRICE_STORAGE_KEY) || '');

    if (selectedSeats) {
        seats.forEach((item, index) => {
            if (selectedSeats.indexOf(index) > -1) {
                item.classList.add('selected');
            }
        });
        count.innerText = `${selectedSeats.length}`;
    }

    if (selectedMovie) {
        movieSelect.selectedIndex = selectedMovie;
    }

    if (ticketPrice) {
        total.innerText = `$${selectedSeats.length * ticketPrice}`;
    }
}

displayData();
