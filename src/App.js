import React, { useState } from 'react';
import Sketch from "react-p5";
import BubbleSort from "./Algorithms/BubbleSort";
import QuickSort from "./Algorithms/QuickSort";
import Button from '@material-ui/core/Button';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
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

	const setup = (p5, canvasParentRef) => {
		p5.createCanvas(width + 1, height).parent(canvasParentRef);
	}
	
	return (
		<div>
			<AppBar>
				<Toolbar
					variant='dense'
				>
					<Typography
						variant='h5'
					>
						Sorting Algorithms
					</Typography>
				</Toolbar>
			</AppBar>
			<Grid container justify="center" styles={{flexGrow: 1}}>
				<Grid item>
					<Grid container>
						<Grid item>
							<Sketch 
								setup={setup}
								draw={algorithm.draw}
								style={{
									marginTop:"45px"
								}}
							>
							</Sketch>
						</Grid>
					</Grid>
					<Grid container>
						<Grid item>
							<Typography
								variant="h6"
							>
								Select a sorting algorithm and hit start to sort!
							</Typography>
							<Button variant="outlined" onClick={setBubbleSort}>BubbleSort</Button>
							<Button variant="outlined" onClick={setQuickSort}>QuickSort</Button>
						</Grid>
					</Grid>
					<Grid container justify="center">
						<Grid item>
							<Button variant="outlined" onClick={algorithm.sort}>Start</Button>
						</Grid>
					</Grid>
				</Grid>
			</Grid>
		</div>
	);
}

export default App;
