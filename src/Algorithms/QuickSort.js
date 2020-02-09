
export default class QuickSort {
	constructor (width, height, array) {
		this.height = height
		this.width = width
		this.array = array.slice()
	}

	comp1 = 0
	comp2 = 1
	pivot = -1;
	sorted = false

	swap = (array, i, j) => {
		let temp = array[i]
		array[i] = array[j]
		array[j] = temp
		return array
	}

	sleep = (ms) => {
		return new Promise(resolve => setTimeout(resolve, ms));
	}

	partition = async (array, low, high) => {
		this.pivot = high;
		let i = low;
		for (let j = low; j < high; j++) {
			this.comp1 = i
			this.comp2 = j
			await this.sleep(50);
			if (array[j] < array[this.pivot]) {
				array = this.swap(array, i, j);
				await this.sleep(50);
				i++;
			}
		}
		array = this.swap(array, i, high)
		await this.sleep(50);
		return i
	}

	sort = () => {
		if (!this.sorted) {
			this.quickSort(this.array, 0, this.array.length - 1)
		}
	}
	
	quickSort = async (array, low, high) => {
		if (low < high) {
			let mid = Math.floor((low + high)/2)
			if (array[mid] < array[low]) {
				array = this.swap(array, low, mid)
			}
			if (array[high] < array[low]) {
				array = this.swap(array, low, high)
			}
			if (array[mid] < array[high]) {
				array = this.swap(array, high, mid)
			}

			let part = await this.partition(array, low, high)
			await this.quickSort(array, low, part-1)
			await this.quickSort(array, part+1, high)
		}
		let sorted = true
		for (let i = 0; i < array.length-1; i++) {
			if (array[i] > array[i+1]) {
				sorted = false
				break
			}
		}
		this.sorted = sorted
	}

	draw = (p5) => {
		p5.background('#141d28');

		this.array.forEach((element, index) => {
			if (this.sorted) {
				p5.fill('green');
			} 
			else if (index === this.pivot) {
				p5.fill('yellow')
			}
			else if (index === this.comp1 || index === this.comp2) {
				p5.fill('red');
			}
			p5.rect(index * 10, this.height - ((element + 1) * 6), 10, ((element + 1) * 6))
			p5.fill('white')
		})
	}
}