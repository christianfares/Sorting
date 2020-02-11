import React, { useState } from 'react';
import Sketch from "react-p5";
import BubbleSort from "./Algorithms/BubbleSort";
import QuickSort from "./Algorithms/QuickSort";
import InsertionSort from './Algorithms/InsertionSort';
import SelectionSort from './Algorithms/SelectionSort';

import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
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
	let width = 1000
	let height = 620

	const [algorithm, setAlgorithm] = useState(new BubbleSort(width, height, shuffle(array)));

	const setQuickSort = () => {
		setAlgorithm(new QuickSort(width, height, shuffle(array)));
	}

	const setBubbleSort = () => {
		setAlgorithm(new BubbleSort(width, height, shuffle(array)));
	}

	const setInsertionSort = () => {
		setAlgorithm(new InsertionSort(width, height, shuffle(array)));
	}

	const setSelectionSort = () => {
		setAlgorithm(new SelectionSort(width, height, shuffle(array)));
	}

	const setup = (p5, canvasParentRef) => {
		p5.createCanvas(width + 1, height).parent(canvasParentRef);
	}
	
	return (
		<div>
			
			<Grid container justify="center">
				<Grid item>
					<Grid container justify="center">
						<Grid item>
							<Typography
								variant='h4'
								style={{
									alignSelf:"center",
									position:"relative",
									alignContent:"center"
								}}
							>
								Sorting Algorithms
							</Typography>
							<br/>
						</Grid>
					</Grid>
					<Grid container>
						<Grid item>
							<Sketch 
								setup={setup}
								draw={algorithm.draw}
							>
							</Sketch>
						</Grid>
					</Grid>
					<Grid container justify="center">
						<Grid item>
							<Typography
								variant="h6"
							>
								Select a sorting algorithm and hit start to sort!
							</Typography>
						</Grid>
					</Grid>
					<Grid container justify="space-around" alignContent="space-around" spacing={1} style={{flexGrow: 1}} >
						<Grid item align="center" xs={5} md="auto">
							<Button variant="outlined" onClick={setBubbleSort}>Bubble Sort</Button>
						</Grid>
						<Grid item align="center" xs={5} md="auto">
							<Button variant="outlined" onClick={setInsertionSort}>Insertion Sort</Button>
						</Grid>
						<Grid item align="center" xs={5} md="auto">
							<Button variant="outlined" onClick={setQuickSort}>Quick Sort</Button>
						</Grid>
						<Grid item align="center" xs={5} md="auto">
							<Button variant="outlined" onClick={setSelectionSort}>Selection Sort</Button>
						</Grid>
					</Grid>
					<br/>
					<Grid container justify="center">
						<Grid item>
							<Button variant="outlined" color="primary" onClick={algorithm.start}>Start</Button>
							<Button variant="outlined" color="primary" onClick={algorithm.stop}>Stop</Button>
						</Grid>
					</Grid>
				</Grid>
			</Grid>
		</div>
	);
}

export default App;
