(function () {

    /*global $ */

    "use strict";

    const gameboard = $('#gameboard');
    const topBoard = $('#topBoard');
    const levelDiv = $('#level');
    const cardImg = $('#cardImg');

    let SQUARE_SIZE = topBoard.width() / 6;
    let cars = [];
    let currentCar;

    const road = $(`<img src="images/road.png" class="road" id="road" width="${SQUARE_SIZE * 2}" height="${SQUARE_SIZE}" alt="road">`);


    function resizeboard() {
        SQUARE_SIZE = topBoard.width() / 6;
        cars.forEach((car) => {
            if (car.squares.length > 2) {
                switch (car.alignemnt) {
                    case 'vertical':
                        car.image.css({ width: SQUARE_SIZE * 3, height: SQUARE_SIZE });
                        break;
                    case 'horizontal':
                        car.image.css({ width: SQUARE_SIZE, height: SQUARE_SIZE * 3 });
                        break;
                }
            } else {
                switch (car.alignemnt) {
                    case 'vertical':
                        car.image.css({ width: SQUARE_SIZE * 2, height: SQUARE_SIZE });
                        break;
                    case 'horizontal':
                        car.image.css({ width: SQUARE_SIZE, height: SQUARE_SIZE * 2 });
                        break;
                }
            }
            drawBoard(car);
            road.css({ width: SQUARE_SIZE * 2, height: SQUARE_SIZE, top: 2 * SQUARE_SIZE, left: 6 * SQUARE_SIZE });
        });
    }
    window.addEventListener('resize', resizeboard);
    resizeboard();

    fetch("cards.json")
        .then((result) => {
            if (!result.ok) {
                throw new Error("File does not exist");
            }
            return result.json();
        })
        .then((puzzleArray) => {
            let currentImg;
            let currentCarList = [];
            let puzzleList = [];
            puzzleArray.forEach((puzzle) => {
                currentCarList = [];
                for (let i = 0; i < puzzle.vehicles.length; i++) {
                    currentImg = $(`<img src=${puzzle.vehicles[i].image} class="cars" width="${puzzle.vehicles[i].width * SQUARE_SIZE}" height="${puzzle.vehicles[i].height * SQUARE_SIZE}" alt="Blue Car">`);
                    currentCarList.push(new Vehicle(currentImg, puzzle.vehicles[i].alignment, puzzle.vehicles[i].squares));
                }
                puzzleList.push(new Puzzle(puzzle.difficulty, puzzle.level, puzzle.cardImage, currentCarList));
            });
            puzzleList[2].setUpBoard();
            // let currentCars = $('.cars');
            // currentCars.draggable({
            //     axis: "y"
            // });

        })
        .catch(e => console.error(e));

    class Puzzle {
        constructor(difficulty, level, cardImage, carsList) {
            this.difficulty = difficulty;
            this.level = level;
            this.cardImage = cardImage;
            this.carsList = carsList;
        }

        setUpBoard() {
            cardImg.attr('src', this.cardImage);
            levelDiv.text("Level " + this.level);
            this.carsList.forEach((car) => {
                addVehicle(car);
            });

        }
    }

    class Vehicle {
        constructor(image, alignment, squares) {
            this.image = image;
            this.alignemnt = alignment;
            this.squares = squares;
        }

        moveVehicle(direction) {
            let frontSquare = this.squares.length - 1;
            let spotTaken = false;
            if (currentCar === this) {
                switch (direction) {
                    case 'ArrowLeft':
                        if (this.squares[0].col > 0 && this.alignemnt === 'vertical') {
                            spotTaken = checkForCars(this.squares[0].row, this.squares[0].col - 1);
                            if (!spotTaken) {
                                this.squares.forEach((square) => {
                                    square.col--;
                                });
                            }
                        }
                        break;
                    case 'ArrowRight':

                        if ((this.squares[frontSquare].col < 5 || this.squares[frontSquare].row === 2) && this.alignemnt === 'vertical') {
                            spotTaken = checkForCars(this.squares[frontSquare].row, this.squares[frontSquare].col + 1);
                            if (!spotTaken) {
                                this.squares.forEach((square) => {
                                    square.col++;
                                });
                            }
                        }
                        break;
                    case 'ArrowUp':
                        if (this.squares[0].row > 0 && this.alignemnt === 'horizontal') {
                            spotTaken = checkForCars(this.squares[0].row - 1, this.squares[0].col);
                            if (!spotTaken) {
                                this.squares.forEach((square) => {
                                    square.row--;
                                });
                            }
                        }
                        break;
                    case 'ArrowDown':
                        if (this.squares[frontSquare].row < 5 && this.alignemnt === 'horizontal') {
                            spotTaken = checkForCars(this.squares[frontSquare].row + 1, this.squares[frontSquare].col);
                            if (!spotTaken) {
                                this.squares.forEach((square) => {
                                    square.row++;
                                });
                            }
                        }
                        break;
                }
                drawBoard(this);
                setBorder();
            }
        }
    }


    function setUpBoard() {
        for (let i = 0; i < 6; i++) {
            for (let j = 0; j < 6; j++) {
                gameboard.append(`<div class="boardSquare"></div>`);
            }
        }
        topBoard.append(road);
        road.css({ top: 2 * SQUARE_SIZE, left: 6 * SQUARE_SIZE });
    }

    function checkForCars(row, col) {
        let returnVal = false;
        cars.forEach((car) => {
            car.squares.forEach((square) => {
                if (square.row === row && square.col === col) {
                    returnVal = true;
                }
            });
        });
        return returnVal;
    }

    function setBorder() {
        cars.forEach((car) => {
            console.log(car);
            car.image.css({ border: "none" });
        });
        currentCar.image.css({ border: '4px solid rgb(60, 168, 168)' });
    }

    function drawBoard(car) {
        car.image.css({ top: car.squares[0].row * SQUARE_SIZE, left: car.squares[0].col * SQUARE_SIZE });

    }

    function addVehicle(car) {
        cars.push(car);
        topBoard.append(car.image);
        drawBoard(car);
        car.image.click(() => {
            currentCar = car;
            setBorder();
        });
    }

    function moveSelected() {
        for (let i = 0; i < cars.length; i++) {
            if (cars[i] === currentCar) {
                if (i < cars.length - 1) {
                    currentCar = cars[i + 1];
                } else {
                    currentCar = cars[0];
                }
                break;

            }

        }
        setBorder();
    }

    document.addEventListener('keydown', e => {
        if (currentCar) {
            switch (e.key) {
                case 'ArrowLeft':
                case 'ArrowRight':
                case 'ArrowUp':
                case 'ArrowDown':
                    currentCar.moveVehicle(e.key);
                    break;
                case ' ':
                    moveSelected();
            }
        }
    });



    setUpBoard();

}());