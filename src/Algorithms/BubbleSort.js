
export default class BubbleSort {
	constructor (width, height, array) {
		this.height = height
		this.width = width
		this.array = array.slice()
		this.sorted = false;
		this.stopped = true;
		this.comp1 = 0
		this.comp2 = 1
		this.sort()
	}

	start = () => {
		this.stopped = false
	}

	stop = () => {
		this.stopped = true
	}

	swap = (array, i, j) => {
		let temp = array[i]
		array[i] = array[j]
		array[j] = temp
		return array
	}

	sleep = (ms) => {
		return new Promise(resolve => setTimeout(resolve, ms));
	}

	waitTilStart = async () => {
		while (this.stopped) {
			await this.sleep(100)
		}
	}

	sort = async () => {
		if (!this.sorted) {
			let swapped = true
			for (let i = 0; i < this.array.length; i++) {
				swapped = false
				for (let j = 0; j < this.array.length; j++) {
					await this.waitTilStart()
					this.comp1 = j
					this.comp2 = j + 1
					await this.sleep(10);
					if (this.array[j] > this.array[j + 1]) {
						this.array = this.swap(this.array, j, j+1)
						swapped = true
						await this.sleep(10)
					}
				}
				if (!swapped) {
					break;
				}
			}
			this.sorted = true;
		}
	}

	draw = (p5) => {
		p5.background('#141d28');

		this.array.forEach((element, index) => {
			if (this.sorted === true) {
				p5.fill('green');
			}
			else if (index === this.comp1 || index === this.comp2) {
				p5.fill('red');
			}
			p5.rect(index * 10, this.height - ((element + 1) * 6), 10, ((element + 1) * 6))
			p5.fill('white')
		})
	}
}