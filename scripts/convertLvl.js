function decompressLevel(data) {

  const dict = data[0];

  
}

class LevelCompressor {
  constructor(data) {
    this.data = data;
    this.dict = [];
  }

  compress() {
    let newData = "";
    for (const i in this.data) {
      newData += this.compressBlock(this.data[i]);
    }

    console.log("compression finished!");
    return [this.dict, newData];
  }

  addDict(string) {
    if (this.dict.includes(string)) {
      return this.dict.indexOf(string);
    } else {
      this.dict.push(string);
      return this.dict.length - 1;
    }
  }

  compressNumber(num) {
    return Math.abs(num).toString(36) + (Math.sign(num) === 1 ? ":" : ";");
  }

  compressBlock(block) {
    let compressedBlock = this.compressNumber(block[0]) + this.compressNumber(block[1]);
    compressedBlock += this.addDict(block[2]) + ":";
    compressedBlock += this.compressNumber(block[3]) + this.compressNumber(block[4]);

    return compressedBlock;
  }
}

class LevelDecompressor {
  constructor(data) {
    this.dict = data[0];
    this.data = data[1];
    this.pos = 0;
  }

  decompress() {
    this.pos = 0;

    const data = [];
    for (this.pos; this.pos < this.data.length;) {

      data.push(this.getNextBlock());

      // If finished
      if (this.pos >= this.data.length - 1) {
        console.log("decompression finished!");
        return data;
      }
    }

    console.log("error! Couldn't decompress");
    alert("An error occured while decompressing the level! \nIn decompress() Array Overflow at start: " + start);
  }

  getNextBlock() {
    const block = [];

    for(let i = 0; i < 5; i++) {
      block[i] = this.getNextValue();
    }

    block[2] = this.dict[block[2]];

    return block;
  }

  getNextValue() {
    let value = "";

    for (this.pos; this.pos < this.data.length; this.pos++) {
      if (this.data[this.pos] === ";" || this.data[this.pos] === ":") {
        return parseInt(value, 36) * (this.data[this.pos++] === ":" ? 1: -1);
      } else {
        value += this.data[this.pos];
      }
    }
    console.log("error! Couldn't get next value");
    alert("An error occured while decompressing the level! \nIn getNextValue() Array Overflow at start: " + start);
  }
}


/*

Format:

data is a string with a separator char. make sure it doesn't show up in text

[xPos, yPos, "type", xLength, yLength, tags, texture]

 |
\_/

jf:1g:1:5:5:1,2:1

KEY

Negative number uses ; instead of :

1: Compressed xPos
2: Compressed yPos
3: type is cached as a unique identifier at the end
4: Compressed xLength
5: Compressed yLength
6: identifiers separated with ,
7: if included also an identifier


Dictionary Format:

[
"identifier 11!"
]

*/