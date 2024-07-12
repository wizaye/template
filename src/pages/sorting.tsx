import { useState, useEffect } from "react";
import { title } from "@/components/primitives";
import DefaultLayout from "@/layouts/default";
import { Button, Slider } from "@nextui-org/react";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem
} from "@nextui-org/dropdown";

// Dropdown Menu for Sorting Algorithms
const sortingAlgorithms = [
  { key: "bubble", label: "Bubble Sort" },
  { key: "merge", label: "Merge Sort" },
  { key: "quick", label: "Quick Sort" },
  { key: "insertion", label: "Insertion Sort" },
  { key: "selection", label: "Selection Sort" },
  { key: "heap", label: "Heap Sort" },
];

interface AlgorithmDropdownProps {
  selectedAlgorithm: string;
  onAlgorithmChange: (key: string) => void;
}

function AlgorithmDropdown({
  selectedAlgorithm,
  onAlgorithmChange,
}: AlgorithmDropdownProps) {
  return (
    <Dropdown>
      <DropdownTrigger>
        <Button variant="bordered">
          {sortingAlgorithms.find(alg => alg.key === selectedAlgorithm)?.label || 'Select Algorithm'}
        </Button>
      </DropdownTrigger>
      <DropdownMenu
        aria-label="Sorting Algorithms"
        selectionMode="single"
        selectedKeys={new Set([selectedAlgorithm])}
        onSelectionChange={(keys) => {
          const key = Array.from(keys)[0] as string;
          onAlgorithmChange(key);
        }}
      >
        {sortingAlgorithms.map((algorithm) => (
          <DropdownItem key={algorithm.key}>
            {algorithm.label}
          </DropdownItem>
        ))}
      </DropdownMenu>
    </Dropdown>
  );
}

interface ArraySizeSliderProps {
  arraySize: number;
  onArraySizeChange: (value: number) => void;
}

function ArraySizeSlider({ arraySize, onArraySizeChange }: ArraySizeSliderProps) {
  return (
    <Slider
      value={arraySize}
      minValue={10}
      maxValue={100}
      step={1}
      onChange={(value) => onArraySizeChange(value as number)}
    />
  );
}

interface RandomizeButtonProps {
  onRandomize: () => void;
}

function RandomizeButton({ onRandomize }: RandomizeButtonProps) {
  return <Button onClick={onRandomize}>Randomize Array</Button>;
}

interface MuteButtonProps {
  isMuted: boolean;
  onToggleMute: () => void;
}

function MuteButton({ isMuted, onToggleMute }: MuteButtonProps) {
  return <Button onClick={onToggleMute}>{isMuted ? "Unmute" : "Mute"}</Button>;
}

interface SortButtonProps {
  onSort: () => void;
}

function SortButton({ onSort }: SortButtonProps) {
  return <Button onClick={onSort}>Sort and Visualize</Button>;
}

// Main Sorting Page Component
export default function SortingPage() {
  const [selectedAlgorithm, setSelectedAlgorithm] = useState<string>("bubble");
  const [arraySize, setArraySize] = useState<number>(50);
  const [array, setArray] = useState<number[]>([]);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [sortedArray, setSortedArray] = useState<number[]>([]);

  useEffect(() => {
    handleRandomize();
  }, [arraySize]);

  // Sorting Algorithms
  const bubbleSort = async (array: number[], visualizeSort: (sortedArray: number[]) => Promise<void>) => {
    let arr = [...array];
    let n = arr.length;
    for (let i = 0; i < n - 1; i++) {
      for (let j = 0; j < n - i - 1; j++) {
        if (arr[j] > arr[j + 1]) {
          [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
          await visualizeSort(arr);
        }
      }
    }
    return arr;
  };

  const mergeSort = async (array: number[], visualizeSort: (sortedArray: number[]) => Promise<void>) => {
    const merge = async (left: number[], right: number[]) => {
      let result: number[] = [];
      let i = 0, j = 0;

      while (i < left.length && j < right.length) {
        if (left[i] < right[j]) {
          result.push(left[i++]);
        } else {
          result.push(right[j++]);
        }
      }

      return result.concat(left.slice(i)).concat(right.slice(j));
    };

    const sort = async (arr: number[]) => {
      if (arr.length <= 1) return arr;

      const mid = Math.floor(arr.length / 2);
      const left = arr.slice(0, mid);
      const right = arr.slice(mid);

      const sortedLeft = await sort(left);
      const sortedRight = await sort(right);

      const merged = await merge(sortedLeft, sortedRight);
      await visualizeSort(merged);
      return merged;
    };

    return await sort(array);
  };

  const quickSort = async (array: number[], visualizeSort: (sortedArray: number[]) => Promise<void>) => {
    const sort = async (arr: number[], low: number, high: number) => {
      if (low < high) {
        const pi = await partition(arr, low, high);
        await sort(arr, low, pi - 1);
        await sort(arr, pi + 1, high);
      }
    };

    const partition = async (arr: number[], low: number, high: number) => {
      const pivot = arr[high];
      let i = low - 1;
      for (let j = low; j < high; j++) {
        if (arr[j] < pivot) {
          [arr[++i], arr[j]] = [arr[j], arr[i]];
        }
      }
      [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
      await visualizeSort(arr);
      return i + 1;
    };

    await sort(array, 0, array.length - 1);
    return array;
  };

  const insertionSort = async (array: number[], visualizeSort: (sortedArray: number[]) => Promise<void>) => {
    let arr = [...array];
    for (let i = 1; i < arr.length; i++) {
      let key = arr[i];
      let j = i - 1;
      while (j >= 0 && arr[j] > key) {
        arr[j + 1] = arr[j];
        j--;
      }
      arr[j + 1] = key;
      await visualizeSort(arr);
    }
    return arr;
  };

  const selectionSort = async (array: number[], visualizeSort: (sortedArray: number[]) => Promise<void>) => {
    let arr = [...array];
    for (let i = 0; i < arr.length - 1; i++) {
      let minIndex = i;
      for (let j = i + 1; j < arr.length; j++) {
        if (arr[j] < arr[minIndex]) {
          minIndex = j;
        }
      }
      [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]];
      await visualizeSort(arr);
    }
    return arr;
  };

  const heapSort = async (array: number[], visualizeSort: (sortedArray: number[]) => Promise<void>) => {
    let arr = [...array];

    const heapify = (n: number, i: number) => {
      let largest = i;
      const left = 2 * i + 1;
      const right = 2 * i + 2;

      if (left < n && arr[left] > arr[largest]) {
        largest = left;
      }
      if (right < n && arr[right] > arr[largest]) {
        largest = right;
      }
      if (largest !== i) {
        [arr[i], arr[largest]] = [arr[largest], arr[i]];
        heapify(n, largest);
      }
    };

    const buildHeap = (n: number) => {
      for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
        heapify(n, i);
      }
    };

    const sort = async () => {
      buildHeap(arr.length);
      for (let i = arr.length - 1; i >= 0; i--) {
        [arr[0], arr[i]] = [arr[i], arr[0]];
        heapify(i, 0);
        await visualizeSort(arr);
      }
    };

    await sort();
    return arr;
  };

  const sortingFunctions = {
    bubble: bubbleSort,
    merge: mergeSort,
    quick: quickSort,
    insertion: insertionSort,
    selection: selectionSort,
    heap: heapSort,
  };

  const handleAlgorithmChange = (key: string) => {
    setSelectedAlgorithm(key);
  };

  const handleArraySizeChange = (value: number) => {
    setArraySize(value);
  };

  const handleRandomize = () => {
    const newArray = Array.from({ length: arraySize }, () =>
      Math.floor(Math.random() * 100)
    );
    setArray(newArray);
    setSortedArray([]);
  };

  const handleToggleMute = () => {
    setIsMuted(!isMuted);
  };

  const handleSort = async () => {
    const sorted = await sortingFunctions[selectedAlgorithm](array, visualizeSort);
    setSortedArray(sorted);
  };

  const visualizeSort = (sortedArray: number[]) => {
    return new Promise<void>((resolve) => {
      const animationDelay = 100; // Adjust as needed for visual effect

      const animateSort = async () => {
        for (let i = 0; i < sortedArray.length; i++) {
          await new Promise((r) => setTimeout(r, animationDelay));
          setArray([...sortedArray.slice(0, i + 1), ...array.slice(i + 1)]);
        }
        resolve();
      };

      animateSort();
    });
  };

  return (
    <DefaultLayout>
      <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
        <div className="inline-block max-w-lg text-center justify-center">
          <h1 className={title()}>Sorting</h1>
        </div>
        <AlgorithmDropdown
          selectedAlgorithm={selectedAlgorithm}
          onAlgorithmChange={handleAlgorithmChange}
        />
        <ArraySizeSlider
          arraySize={arraySize}
          onArraySizeChange={handleArraySizeChange}
        />
        <RandomizeButton onRandomize={handleRandomize} />
        <MuteButton isMuted={isMuted} onToggleMute={handleToggleMute} />
        <SortButton onSort={handleSort} />
        <div style={{ marginTop: "20px" }}>
          <h2>Array:</h2>
          <div style={{ display: "flex", alignItems: "flex-end", height: "200px" }}>
            {array.map((value, index) => (
              <div
                key={index}
                style={{
                  width: "20px",
                  height: `${value * 2}px`,
                  backgroundColor: sortedArray.includes(value) ? "#6EE7B7" : "#F76C6C",
                  margin: "0 1px",
                }}
              />
            ))}
          </div>
        </div>
      </section>
    </DefaultLayout>
  );
}
