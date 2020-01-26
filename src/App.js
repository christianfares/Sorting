import React from 'react';
import Sketch from "react-p5";
import BubbleSort from "./Algorithms/BubbleSort";
import QuickSort from "./Algorithms/QuickSort";
import './App.css';

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

function App() {
	let array = [...Array(100).keys()]
	array = shuffle(array)

	let width = 1000
	let height = 620

	let bs = new BubbleSort(width, height, array)
	let qs = new QuickSort(width, height, array)

	const setup = (p5, canvasParentRef) => {
		p5.createCanvas(width + 1, height).parent(canvasParentRef);
	}

	bs.bubbleSort()
	qs.quickSort(qs.array, 0, qs.array.length - 1)
	
	return (
		<Sketch 
			setup={setup}
			draw={qs.draw}
		>
		</Sketch>
	);
}

export default App;
