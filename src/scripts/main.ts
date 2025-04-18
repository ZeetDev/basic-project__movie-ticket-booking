import '../styles/style.css';

const seatsWp = document.querySelector<HTMLDivElement>('.seats-wp')!;
const allSeats = document.querySelectorAll<HTMLDivElement>('.row .seat:not(.occupied)')!;
const count = document.querySelector<HTMLSpanElement>('#count')!;
const total = document.querySelector<HTMLSpanElement>('#total')!;
const movieSelect = document.querySelector<HTMLSelectElement>('#movie-select')!;

// local storage consent
const SEATS_STORAGE_KEY = 'selected-seats';
const MOVIE_STORAGE_KEY = 'selected-movie';
const PRICE_STORAGE_KEY = 'selected-price';

let movieIndex = getLocalStorage(MOVIE_STORAGE_KEY);
let movieTicketPrice = getLocalStorage(PRICE_STORAGE_KEY);

// change movie
movieSelect?.addEventListener('change', () => {
    movieIndex = movieSelect.selectedIndex;
    setLocalStorage(MOVIE_STORAGE_KEY, movieIndex);

    movieTicketPrice = parseInt(movieSelect.value);
    setLocalStorage(PRICE_STORAGE_KEY, movieTicketPrice);

    handleShowUI();
});

// toggle selected class at seat
seatsWp?.addEventListener('click', (e: Event) => {
    const elementTarget = e.target as HTMLElement;
    if (elementTarget.classList.contains('seat') && !elementTarget.classList.contains('occupied')) {
        elementTarget?.classList?.toggle('selected');
        handleGetSelectedSeat();
    }
    handleShowUI();
});

// select seats
function handleGetSelectedSeat() {
    const selectedSeat = seatsWp?.querySelectorAll<HTMLDivElement>('.seat.selected');
    const selectedSeatIndex = [...selectedSeat].map((v) => [...allSeats].indexOf(v));
    setLocalStorage(SEATS_STORAGE_KEY, selectedSeatIndex);
}

// get data from local storage and show at ui
function handleShowUI() {
    const selectedSeats = getLocalStorage(SEATS_STORAGE_KEY, 'object');
    const selectedMovie = getLocalStorage(MOVIE_STORAGE_KEY);
    const selectedPrice = getLocalStorage(PRICE_STORAGE_KEY);

    allSeats.forEach((seat, seatIndex) => {
        selectedSeats.indexOf(seatIndex) !== -1 && seat.classList.add('selected');
    });

    movieSelect.selectedIndex = selectedMovie;
    count.innerText = `${selectedSeats.length}`;
    total.innerText = `$${selectedSeats.length * selectedPrice}`;
}

// set item to local storage
function setLocalStorage(key: string, item: object | string | number) {
    localStorage?.setItem(key, typeof item !== 'string' ? JSON?.stringify(item) : item);
}

// get item from local storage
function getLocalStorage(key: string, type?: string) {
    return type === 'object' ? JSON.parse(localStorage.getItem(key) || '[]') : localStorage.getItem(key);
}

handleShowUI();
