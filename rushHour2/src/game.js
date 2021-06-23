import './css/rushHour.css';
import $ from 'jquery';
import Vehicle from './vehicle';
import Puzzle from './puzzle';
import puzzleList from './json/puzzles.json';


const gameboard = $('#gameboard');
const topBoard = $('#topBoard');
const levelDiv = $('#level');
const cardImg = $('#cardImg');

let SQUARE_SIZE = topBoard.width() / 6;
let cars = [];
let currentCar;

const road = $(`<img src="images/road.png" class="road" id="road" width="${SQUARE_SIZE * 2}" height="${SQUARE_SIZE}" alt="road">`);

function setUpBoard() {
    for (let i = 0; i < 6; i++) {
        for (let j = 0; j < 6; j++) {
            gameboard.append(`<div class="boardSquare"></div>`);
        }
    }
    topBoard.append(road);
    road.css({ top: 2 * SQUARE_SIZE, left: 6 * SQUARE_SIZE });
}

function resizeboard() {
    SQUARE_SIZE = topBoard.width() / 6;
    cars.forEach((car) => {
        //Redo this using the cars width adn height properties
        // if (car.squares.length > 2) {
        //     switch (car.alignemnt) {
        //         case 'vertical':
        //             car.image.css({ width: SQUARE_SIZE * 3, height: SQUARE_SIZE });
        //             break;
        //         case 'horizontal':
        //             car.image.css({ width: SQUARE_SIZE, height: SQUARE_SIZE * 3 });
        //             break;
        //     }
        // } else {
        //     switch (car.alignemnt) {
        //         case 'vertical':
        //             car.image.css({ width: SQUARE_SIZE * 2, height: SQUARE_SIZE });
        //             break;
        //         case 'horizontal':
        //             car.image.css({ width: SQUARE_SIZE, height: SQUARE_SIZE * 2 });
        //             break;
        //     }
        // }
        //drawBoard(car);
        road.css({ width: SQUARE_SIZE * 2, height: SQUARE_SIZE, top: 2 * SQUARE_SIZE, left: 6 * SQUARE_SIZE });
    });
}
window.addEventListener('resize', resizeboard);
resizeboard();

// fetch("./json/puzzles.json")
//     .then((result) => {
//         if (!result.ok) {
//             throw new Error("File does not exist");
//         }
//         return result.json();
//     })
//     .then((puzzleArray) => {
//         //let currentImg;
//         let currentCarList = [];
//         let puzzleList = [];
//         puzzleArray.forEach((puzzle) => {
//             for (let i = 0; i < puzzle.vehicles.length; i++) {
//                 //currentImg = $(`<img src=${puzzle.vehicles[i].image} class="cars" width="${puzzle.vehicles[i].width * SQUARE_SIZE}" height="${puzzle.vehicles[i].height * SQUARE_SIZE}" alt="Blue Car">`);
//                 currentCarList.push(new Vehicle(puzzle.vehicles[i].image, puzzle.vehicles[i].width, puzzle.vehicles[i].height, puzzle.vehicles[i].alignment, puzzle.vehicles[i].squares));
//             }
//             puzzleList.push(new Puzzle(puzzle.difficulty, puzzle.level, puzzle.cardImage, currentCarList));
//             currentCarList = [];
//         });
//         puzzleList[2].setUpBoard();
//         // let currentCars = $('.cars');
//         // currentCars.draggable({
//         //     axis: "y"
//         // });
//         //console.log(puzzleList);

//     })
//     .catch(e => console.error(e));

console.log(puzzleList);


setUpBoard();