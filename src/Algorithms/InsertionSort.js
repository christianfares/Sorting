
export default class InsertionSort {
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
			let i = 1;
			while (i < this.array.length) {
				await this.waitTilStart()
				await this.sleep(10)
				this.comp1 = i
				let x = this.array[i]
				let j = i - 1
				console.log(i)
				while (j >= 0 && this.array[j] > x) {
					this.comp2 = j
					await this.sleep(10)
					this.array[j+1] = this.array[j]
					j = j - 1
				}
				this.array[j + 1] = x
				i = i + 1
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