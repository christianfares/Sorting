import React, {useState, useEffect} from 'react';
import Sketch from "react-p5";
import './App.css';

function getWindowDimensions() {
	const { innerWidth: width, innerHeight: height } = window;
	return {
		width,
		height
	};
}

function shuffle(a) {
	let currentIndex, temp, randomIndex;
	for (currentIndex = a.length - 1; currentIndex > 0; currentIndex--) {
		randomIndex = Math.floor(Math.random() * (currentIndex + 1));
		temp = a[currentIndex];
		a[currentIndex] = a[randomIndex];
		a[randomIndex] = temp;
	}
	return a
}

function swap(array, i, j) {
	let temp = array[i]
	array[i] = array[j]
	array[j] = temp
	return array
}

function sleep(ms) {
	return new Promise(resolve => setTimeout(resolve, ms));
}

function App() {
	let array = [...Array(100).keys()]
	array = shuffle(array)

	let width = 1000
	let height = 620

	let comp1 = 0
	let comp2 = 1

	async function bubbleSort (array) {
		let swapped = true
		for (let i = 0; i < array.length; i++) {
			swapped = false
			for (let j = 0; j < array.length; j++) {
				comp1 = j
				comp2 = j + 1
				await sleep(20);
				if (array[j] > array[j + 1]) {
					array = swap(array, j, j+1)
					swapped = true
					await sleep(20)
				}
			}
			if (!swapped) {
				break;
			}
		}
	}

	const setup = (p5, canvasParentRef) => {
		p5.createCanvas(width + 1, height).parent(canvasParentRef);
		//p5.noLoop()
	}

	const draw = p5 => {
		p5.background('#141d28');

		array.forEach((element, index) => {
			if (index === comp1 || index === comp2) {
				p5.fill('red');
			}
			p5.rect(index * 10, height - ((element + 1) * 6), 10, ((element + 1) * 6))
			p5.fill('white')
		})
	}

	bubbleSort(array)

	return (
		<Sketch 
			setup={setup}
			draw={draw}
		>
		</Sketch>
	);
}

export default App;
